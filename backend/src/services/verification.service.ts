import prisma from '../lib/prisma';
import { VoteType, Status, Role, Prisma } from '@prisma/client';

export class VerificationService {
  /**
   * Processes a vote on an intelligence post within an atomic transaction.
   * If a user clicks the same vote twice, it toggles it off (deletes).
   * If a user clicks the opposite vote, it swaps it (updates).
   * 
   * @param voterId The ID of the user casting the vote.
   * @param postId The ID of the IntelPost being voted on.
   * @param voteType The type of vote ('VALID' or 'INVALID').
   * @returns A summary object containing the vote action and trust metric updates.
   */
  public async processVote(voterId: string, postId: string, voteType: 'VALID' | 'INVALID') {
    try {
      // Enforce an atomic database transaction
      return await prisma.$transaction(async (tx) => {
        // Query the 'User' collection to find the voter's identity and determine their 'role'
        const voter = await tx.user.findUnique({
          where: { id: voterId },
          select: { role: true, reliabilityScore: true },
        });

        if (!voter) {
          throw new Error(`Voter with ID ${voterId} not found.`);
        }

        // Retrieve the 'IntelPost' to find the author's identity ('authorId')
        const post = await tx.intelPost.findUnique({
          where: { id: postId },
          select: { authorId: true },
        });

        if (!post) {
          throw new Error(`IntelPost with ID ${postId} not found.`);
        }

        // Verify if this user has already voted on this specific 'IntelPost'
        const existingVote = await tx.verificationVote.findUnique({
          where: {
            postId_voterId: {
              postId,
              voterId,
            },
          },
        });

        let action: 'create' | 'delete' | 'update' = 'create';
        let reliabilityChange = 0;

        // Dynamic Trust Multiplier: scales vote impact based on voter's own reliability score
        // Bounded between 0.1 (low-trust voter) and 3.0 (elite-trust voter) for mathematical stability
        const dynamicMultiplier = Math.max(0.1, Math.min(3.0, 1 + (voter.reliabilityScore / 100)));
        const baseWeight = voter.role === Role.VERIFIED_SENIOR ? 2.0 : 1.0;

        if (existingVote) {
          if (existingVote.voteType === voteType) {
            // Undo vote (Delete)
            action = 'delete';
            if (existingVote.voteType === 'VALID') {
              reliabilityChange = Math.round(-5 * baseWeight * dynamicMultiplier);
            } else {
              reliabilityChange = Math.round(10 * baseWeight * dynamicMultiplier);
            }
            await tx.verificationVote.delete({
              where: {
                postId_voterId: {
                  postId,
                  voterId,
                },
              },
            });
          } else {
            // Swap vote (Update)
            action = 'update';
            if (existingVote.voteType === 'VALID' && voteType === 'INVALID') {
              reliabilityChange = Math.round(-15 * baseWeight * dynamicMultiplier);
            } else {
              reliabilityChange = Math.round(15 * baseWeight * dynamicMultiplier);
            }
            await tx.verificationVote.update({
              where: {
                postId_voterId: {
                  postId,
                  voterId,
                },
              },
              data: {
                voteType: voteType as VoteType,
              },
            });
          }
        } else {
          // First time vote (Create)
          action = 'create';
          if (voteType === 'VALID') {
            reliabilityChange = Math.round(5 * baseWeight * dynamicMultiplier);
          } else {
            reliabilityChange = Math.round(-10 * baseWeight * dynamicMultiplier);
          }
          await tx.verificationVote.create({
            data: {
              postId,
              voterId,
              voteType: voteType as VoteType,
            },
          });
        }

        // Update the author's global 'reliabilityScore'
        const updatedAuthor = await tx.user.update({
          where: { id: post.authorId },
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
              select: { role: true, reliabilityScore: true },
            },
          },
        });

        let postNetScore = 0;
        for (const v of allVotes) {
          const vBase = v.voter.role === Role.VERIFIED_SENIOR ? 2.0 : 1.0;
          const vMultiplier = Math.max(0.1, Math.min(3.0, 1 + (v.voter.reliabilityScore / 100)));
          if (v.voteType === 'VALID') {
            postNetScore += Math.round(5 * vBase * vMultiplier);
          } else {
            postNetScore += Math.round(-10 * vBase * vMultiplier);
          }
        }

        let currentStatus: Status = Status.ACTIVE;

        // If the total net score drops below a threshold of -5, automatically flag it
        if (postNetScore <= -5) {
          currentStatus = Status.FLAGGED;
        }

        await tx.intelPost.update({
          where: { id: postId },
          data: {
            status: currentStatus,
          },
        });

        return {
          action,
          voterId,
          postId,
          postNetScore,
          postVisibilityStatus: currentStatus,
          reliabilityChangeApplied: reliabilityChange,
          newGlobalReliabilityScore: updatedAuthor.reliabilityScore,
        };
      });
    } catch (error) {
      console.error(`[VerificationService] processVote Error:`, error);
      throw error;
    }
  }
}

export default new VerificationService();
