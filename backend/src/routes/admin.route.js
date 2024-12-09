import { Router } from 'express';
import {
  createSong,
  deleteSong,
  createAlbum,
  deleteAlbum,
  checkAdmin,
} from '../controllers/admin.controller.js';
import { protectRoute, requiredAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// middleware to check authorization and admin
router.use(protectRoute, requiredAdmin);

router.post('/songs', createSong);

router.delete('/song/:id', deleteSong);

router.post('/albums', createAlbum);

router.delete('/album/:id', deleteAlbum);

router.get('/check', checkAdmin);

export default router;
