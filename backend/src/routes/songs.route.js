import { Router } from 'express';
import { getAllSongs } from '../controllers/songs.controller.js';
import { protectRoute, requiredAdmin } from '../middleware/auth.middleware.js';
import {
  getFeaturedSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from '../controllers/songs.controller.js';

const router = Router();

router.get('/', protectRoute, requiredAdmin, getAllSongs);
router.get('/featured', getFeaturedSongs);
router.get('/made-for-you', getMadeForYouSongs);
router.get('/trending', getTrendingSongs);

export default router;
