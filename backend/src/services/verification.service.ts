import prisma from '../lib/prisma';
import { VoteType, Status, Role, Prisma } from '@prisma/client';

export class VerificationService {
  /**
   * Processes a vote on an intelligence post within an atomic transaction.
   * 
   * @param voterId The ID of the user casting the vote.
   * @param postId The ID of the IntelPost being voted on.
   * @param voteType The type of vote ('VALID' or 'INVALID').
   * @returns A summary object containing the vote and trust metric updates.
   */
  public async processVote(voterId: string, postId: string, voteType: 'VALID' | 'INVALID') {
    try {
      // 1. Enforce an atomic database transaction
      return await prisma.$transaction(async (tx) => {
        // Query the 'User' collection to find the voter's identity and determine their 'role'
        const voter = await tx.user.findUnique({
          where: { id: voterId },
          select: { role: true },
        });

        if (!voter) {
          throw new Error(`Voter with ID ${voterId} not found.`);
        }

        // 2. Verify if this user has already voted on this specific 'IntelPost'
        const existingVote = await tx.verificationVote.findUnique({
          where: {
            postId_voterId: {
              postId,
              voterId,
            },
          },
        });

        if (existingVote) {
          throw new Error(`User ${voterId} has already voted on post ${postId}. Duplicate voting is strictly prohibited.`);
        }

        // 3. Insert the new 'VerificationVote' record into MongoDB
        const newVote = await tx.verificationVote.create({
          data: {
            postId,
            voterId,
            voteType: voteType as VoteType,
          },
        });

        // 4. Retrieve the 'IntelPost' to find the author's identity ('authorId')
        const post = await tx.intelPost.findUnique({
          where: { id: postId },
          select: { authorId: true },
        });

        if (!post) {
          throw new Error(`IntelPost with ID ${postId} not found.`);
        }

        // Execute calculateTrustMetrics inside the same tracking lifecycle
        const metrics = await this.calculateTrustMetrics(
          post.authorId,
          postId,
          voter.role,
          voteType,
          tx
        );

        return {
          vote: newVote,
          metrics,
        };
      });
    } catch (error) {
      console.error(`[VerificationService] processVote Error:`, error);
      throw error;
    }
  }

  /**
   * Calculates and updates trust metrics for the author and the post.
   * 
   * @param authorId The ID of the post's author.
   * @param postId The ID of the post being voted on.
   * @param voterRole The role of the user who cast the vote.
   * @param voteType The type of the vote.
   * @param tx Optional Prisma transaction client to maintain atomicity.
   * @returns The updated vote execution summary object.
   */
  public async calculateTrustMetrics(
    authorId: string,
    postId: string,
    voterRole: string,
    voteType: 'VALID' | 'INVALID',
    tx: Prisma.TransactionClient = prisma
  ) {
    try {
      let reliabilityChange = 0;

      // Update the author's global 'reliabilityScore'
      if (voteType === 'VALID') {
        reliabilityChange = voterRole === Role.VERIFIED_SENIOR ? 10 : 5;
      } else if (voteType === 'INVALID') {
        reliabilityChange = voterRole === Role.VERIFIED_SENIOR ? -20 : -10;
      }

      const updatedAuthor = await tx.user.update({
        where: { id: authorId },
        data: {
          reliabilityScore: {
            increment: reliabilityChange,
          },
        },
      });

      // Compute the aggregate net score of the post itself
      const allVotes = await tx.verificationVote.findMany({
        where: { postId },
        include: {
          voter: {
            select: { role: true },
          },
        },
      });

      let postNetScore = 0;
      for (const v of allVotes) {
        if (v.voteType === 'VALID') {
          postNetScore += v.voter.role === Role.VERIFIED_SENIOR ? 10 : 5;
        } else {
          postNetScore += v.voter.role === Role.VERIFIED_SENIOR ? -20 : -10;
        }
      }

      let currentStatus: Status = Status.ACTIVE;

      // If the total net score drops below a threshold of -5, automatically flag it
      if (postNetScore <= -5) {
        currentStatus = Status.FLAGGED;
        await tx.intelPost.update({
          where: { id: postId },
          data: {
            status: currentStatus,
          },
        });
      }

      // Return the updated vote execution summary object
      return {
        authorId,
        reliabilityChangeApplied: reliabilityChange,
        newGlobalReliabilityScore: updatedAuthor.reliabilityScore,
        postNetScore,
        postVisibilityStatus: currentStatus,
      };
    } catch (error) {
      console.error(`[VerificationService] calculateTrustMetrics Error:`, error);
      throw error;
    }
  }
}

export default new VerificationService();
