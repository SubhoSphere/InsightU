import { Request, Response, NextFunction } from 'express';
import intelService from '../services/intel.service';

class IntelController {
  /**
   * Handles incoming requests to create a new intelligence post.
   */
  public async handleCreatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        authorId,
        title,
        description,
        category,
        branchTag,
        urgency,
        collegeId,
        file
      } = req.body;

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
}

export default new IntelController();
