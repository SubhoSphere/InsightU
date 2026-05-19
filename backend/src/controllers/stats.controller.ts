import { Request, Response, NextFunction } from 'express';
import statsService from '../services/stats.service';

class StatsController {
  /**
   * Controller to return verified overview stats for the user's specific college sector.
   */
  public async handleGetOverviewStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const collegeId = (req as any).user?.collegeId;

      if (!userId || !collegeId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const stats = await statsService.getOverviewStats(userId, collegeId);
      res.status(200).json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }
}

export default new StatsController();
