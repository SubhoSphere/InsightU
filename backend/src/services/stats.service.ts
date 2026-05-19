import prisma from '../lib/prisma';
import { Role, Status } from '@prisma/client';

export class StatsService {
  /**
   * Retrieves comprehensive metrics and logs customized to the user's specific college.
   */
  public async getOverviewStats(userId: string, collegeId: string) {
    // 1. Fetch current user to get their live reliability score
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { reliabilityScore: true },
    });

    // 2. Count active posts in college
    const totalIntel = await prisma.intelPost.count({
      where: {
        collegeId,
        status: Status.ACTIVE,
      },
    });

    // 3. Count verified seniors in college
    const activeSeniors = await prisma.user.count({
      where: {
        collegeId,
        role: Role.VERIFIED_SENIOR,
      },
    });

    // 4. Count flagged posts in college
    const pendingReviews = await prisma.intelPost.count({
      where: {
        collegeId,
        status: Status.FLAGGED,
      },
    });

    // 5. Query daily post counts for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const postsLast7Days = await prisma.intelPost.findMany({
      where: {
        collegeId,
        status: Status.ACTIVE,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Aggregate contributions by day of the week
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const pulseMap: Record<string, number> = {};
    
    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = daysOfWeek[d.getDay()];
      pulseMap[dayName] = 0;
    }

    postsLast7Days.forEach((post) => {
      const dayName = daysOfWeek[new Date(post.createdAt).getDay()];
      if (pulseMap[dayName] !== undefined) {
        pulseMap[dayName]++;
      }
    });

    const pulseData = Object.entries(pulseMap).map(([day, contributions]) => ({
      day,
      contributions,
    }));

    // 6. Query category distribution in college
    const categoryGroup = await prisma.intelPost.groupBy({
      by: ['category'],
      where: {
        collegeId,
        status: Status.ACTIVE,
      },
      _count: {
        id: true,
      },
    });

    const categoryMapping: Record<string, string> = {
      FACULTY_PREFERENCE: 'Faculty Pref',
      SCHOLARSHIP_DEADLINE: 'Scholarships',
      RECRUITMENT_PIPELINE: 'Recruitment',
      ACADEMIC_NORM: 'Admin Policies',
    };

    const totalCategoryPosts = categoryGroup.reduce((sum, item) => sum + item._count.id, 0);

    const categoryData = Object.keys(categoryMapping).map((catKey) => {
      const found = categoryGroup.find((g) => g.category === catKey);
      const count = found ? found._count.id : 0;
      const pct = totalCategoryPosts > 0 ? Math.round((count / totalCategoryPosts) * 100) : 0;
      return {
        name: categoryMapping[catKey],
        value: pct,
      };
    });

    // 7. Get last 4 recent activity post nodes in college
    const recentPosts = await prisma.intelPost.findMany({
      where: {
        collegeId,
      },
      include: {
        author: {
          select: {
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
    });

    const recentActivity = recentPosts.map((post) => {
      const diffMs = Date.now() - new Date(post.createdAt).getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      let dateLabel = 'Just now';
      if (diffHrs >= 24) {
        const days = Math.floor(diffHrs / 24);
        dateLabel = `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (diffHrs >= 1) {
        dateLabel = `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
      } else {
        const mins = Math.floor(diffMs / (1000 * 60));
        if (mins >= 1) {
          dateLabel = `${mins} min${mins > 1 ? 's' : ''} ago`;
        }
      }

      return {
        id: post.id,
        author: post.author?.name || 'Anonymous Peer',
        role: post.author?.role || Role.FRESHER,
        category: categoryMapping[post.category] || post.category,
        title: post.title,
        status: post.status === Status.ACTIVE ? 'Verified' : post.status === Status.FLAGGED ? 'Flagged' : 'Pending',
        date: dateLabel,
      };
    });

    return {
      metrics: {
        totalIntel,
        activeSeniors,
        reliabilityScore: user?.reliabilityScore ?? 0,
        pendingReviews,
      },
      pulseData,
      categoryData,
      recentActivity,
    };
  }
}

export default new StatsService();
