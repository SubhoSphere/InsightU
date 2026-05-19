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
  public async getFilteredPosts(filters: PostFilterInput): Promise<IntelPost[]> {
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
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default new IntelService();
