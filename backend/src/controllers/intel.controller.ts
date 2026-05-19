import { Request, Response, NextFunction } from 'express';
import intelService from '../services/intel.service';

class IntelController {
  /**
   * Handles incoming requests to create a new intelligence post.
   */
  public async handleCreatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorId = (req as any).user?.id;
      const collegeId = (req as any).user?.collegeId;
      const {
        title,
        description,
        category,
        branchTag,
        urgency,
        file
      } = req.body;

      if (!authorId || !collegeId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      // Pass fields down to the IntelService
      const newPost = await intelService.createPost({
        authorId,
        title,
        description,
        category,
        branchTag,
        urgency,
        collegeId,
        file
      });

      // Return a 201 Created status containing the success object
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      // Forward errors to the Express error handler
      next(error);
    }
  }

  /**
   * Handles incoming requests to fetch filtered feeds of intelligence posts.
   */
  public async handleGetFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Extract filter parameters from query
      const filters = {
        collegeId: req.query.collegeId as string | undefined,
        branchTag: req.query.branchTag as string | undefined,
        urgency: req.query.urgency as any,
        category: req.query.category as any,
        search: req.query.search as string | undefined,
      };

      // Pass to service layer
      const posts = await intelService.getFilteredPosts(filters);

      // Send back a 200 OK status containing the array
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Fetch all posts authored by the logged-in user.
   */
  public async handleGetUserPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorId = (req as any).user?.id;
      if (!authorId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const posts = await intelService.getUserPosts(authorId);
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an existing intelligence post.
   */
  public async handleUpdatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorId = (req as any).user?.id;
      const id = req.params.id as string;
      const { title, description, category, branchTag, urgency, file } = req.body;
      if (!authorId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const updatedPost = await intelService.updatePost(id, authorId, {
        title,
        description,
        category,
        branchTag,
        urgency,
        file
      });
      res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes an existing intelligence post.
   */
  public async handleDeletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const authorId = (req as any).user?.id;
      const id = req.params.id as string;
      if (!authorId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      const deletedPost = await intelService.deletePost(id, authorId);
      res.status(200).json({ success: true, data: deletedPost });
    } catch (error) {
      next(error);
    }
  }
}

export default new IntelController();
