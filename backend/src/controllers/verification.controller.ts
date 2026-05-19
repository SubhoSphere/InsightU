import { Request, Response, NextFunction } from 'express';
import verificationService from '../services/verification.service';

class VerificationController {
  /**
   * Handles incoming requests to vote on a post.
   */
  public async handleVote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Extract parameters from the request body
      const { voterId, postId, voteType } = req.body;

      // Invoke VerificationService to process the vote and dynamically update reliability scores/flag metrics
      const result = await verificationService.processVote(voterId, postId, voteType);

      // Return a 200 OK status containing the updated ledger
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      // Forward errors to the Express error handler
      next(error);
    }
  }
}

export default new VerificationController();
