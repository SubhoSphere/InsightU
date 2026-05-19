import prisma from '../lib/prisma';
import { Category, Urgency, Status, Prisma, IntelPost } from '@prisma/client';

export interface FileAttachmentInput {
  fileKey: string;
  fileUrl: string;
}

export interface CreatePostInput {
  authorId: string;
  title: string;
  description: string;
  category: Category;
  branchTag: string;
  urgency: Urgency;
  collegeId: string;
  file?: FileAttachmentInput;
}

export interface PostFilterInput {
  collegeId?: string;
  branchTag?: string;
  urgency?: Urgency;
  category?: Category;
  search?: string;
}

export class IntelService {
  /**
   * Creates a new intelligence post.
   * Validates required string fields and sets status to ACTIVE by default.
   * 
   * @param data The input data for the new post.
   * @returns The newly created IntelPost.
   */
  public async createPost(data: CreatePostInput): Promise<IntelPost> {
    // Validate that all required string fields are non-empty
    if (!data.authorId || data.authorId.trim() === '') {
      throw new Error('authorId is required and cannot be empty.');
    }
    if (!data.title || data.title.trim() === '') {
      throw new Error('title is required and cannot be empty.');
    }
    if (!data.description || data.description.trim() === '') {
      throw new Error('description is required and cannot be empty.');
    }
    if (!data.branchTag || data.branchTag.trim() === '') {
      throw new Error('branchTag is required and cannot be empty.');
    }
    if (!data.collegeId || data.collegeId.trim() === '') {
      throw new Error('collegeId is required and cannot be empty.');
    }

    return await prisma.intelPost.create({
      data: {
        authorId: data.authorId,
        title: data.title,
        description: data.description,
        category: data.category,
        branchTag: data.branchTag,
        urgency: data.urgency,
        collegeId: data.collegeId,
        status: Status.ACTIVE,
        file: data.file ? {
          fileKey: data.file.fileKey,
          fileUrl: data.file.fileUrl,
        } : undefined,
      },
    });
  }

  /**
   * Retrieves a filtered list of active intelligence posts.
   * Applies exact-match filters for collegeId, branchTag, urgency, and category.
   * Applies a case-insensitive search across title and description.
   * Sorts the final results by createdAt in descending order.
   * 
   * @param filters The dynamic query parameters.
   * @returns An array of filtered IntelPosts.
   */
  public async getFilteredPosts(filters: PostFilterInput): Promise<any[]> {
    const whereClause: Prisma.IntelPostWhereInput = {
      status: Status.ACTIVE,
    };

    if (filters.collegeId) {
      whereClause.collegeId = filters.collegeId;
    }

    if (filters.branchTag) {
      whereClause.branchTag = filters.branchTag;
    }

    if (filters.urgency) {
      whereClause.urgency = filters.urgency;
    }

    if (filters.category) {
      whereClause.category = filters.category;
    }

    if (filters.search && filters.search.trim() !== '') {
      whereClause.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return await prisma.intelPost.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
            reliabilityScore: true,
          },
        },
        votes: {
          select: {
            voterId: true,
            voteType: true,
            voter: {
              select: {
                role: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /**
   * Retrieves all posts authored by a specific user.
   */
  public async getUserPosts(authorId: string): Promise<any[]> {
    return await prisma.intelPost.findMany({
      where: { authorId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            role: true,
            reliabilityScore: true,
          },
        },
        votes: {
          select: {
            voterId: true,
            voteType: true,
            voter: {
              select: {
                role: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Updates an existing intelligence post.
   */
  public async updatePost(postId: string, authorId: string, data: { title?: string; description?: string; category?: Category; branchTag?: string; urgency?: Urgency; file?: FileAttachmentInput }): Promise<IntelPost> {
    const post = await prisma.intelPost.findUnique({ where: { id: postId } });
    if (!post) throw new Error('Post not found.');
    if (post.authorId !== authorId) throw new Error('Unauthorized to update this post.');

    return await prisma.intelPost.update({
      where: { id: postId },
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        branchTag: data.branchTag,
        urgency: data.urgency,
        file: data.file ? {
          fileKey: data.file.fileKey,
          fileUrl: data.file.fileUrl,
        } : undefined,
      },
    });
  }

  /**
   * Deletes an existing intelligence post.
   */
  public async deletePost(postId: string, authorId: string): Promise<IntelPost> {
    const post = await prisma.intelPost.findUnique({ where: { id: postId } });
    if (!post) throw new Error('Post not found.');
    if (post.authorId !== authorId) throw new Error('Unauthorized to delete this post.');

    return await prisma.intelPost.delete({
      where: { id: postId },
    });
  }
}

export default new IntelService();
