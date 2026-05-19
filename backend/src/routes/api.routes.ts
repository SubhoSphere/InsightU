import { Router } from 'express';
import intelController from '../controllers/intel.controller';
import verificationController from '../controllers/verification.controller';
import statsController from '../controllers/stats.controller';
import uploadController from '../controllers/upload.controller';
import supportController from '../controllers/support.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Public Support Ticket endpoint
router.post('/support', supportController.handleCreateTicket.bind(supportController));

// File Upload endpoint (Protected)
router.post('/upload', authMiddleware, uploadController.handleUpload.bind(uploadController));

// Securely create intel posts with user id from verified session
router.post('/intel', authMiddleware, intelController.handleCreatePost.bind(intelController));

// Get user's own contributed posts
router.get('/intel/user', authMiddleware, intelController.handleGetUserPosts.bind(intelController));

// Update an existing post
router.put('/intel/:id', authMiddleware, intelController.handleUpdatePost.bind(intelController));

// Delete an existing post
router.delete('/intel/:id', authMiddleware, intelController.handleDeletePost.bind(intelController));

// Map GET /intel to handleGetFeed (Open feed filtering)
router.get('/intel', intelController.handleGetFeed.bind(intelController));

// Map POST /verify to handleVote (Protected)
router.post('/verify', authMiddleware, verificationController.handleVote.bind(verificationController));

// Retrieve dashboard overview statistics (Protected)
router.get('/stats/overview', authMiddleware, statsController.handleGetOverviewStats.bind(statsController));

export default router;
