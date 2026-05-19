import { Router } from 'express';
import intelController from '../controllers/intel.controller';
import verificationController from '../controllers/verification.controller';

const router = Router();

// Map POST /intel to handleCreatePost
router.post('/intel', intelController.handleCreatePost.bind(intelController));

// Map GET /intel to handleGetFeed
router.get('/intel', intelController.handleGetFeed.bind(intelController));

// Map POST /verify to handleVote
router.post('/verify', verificationController.handleVote.bind(verificationController));

export default router;
