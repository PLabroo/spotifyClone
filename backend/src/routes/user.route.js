import { Router } from 'express';

const router = Router();

import { getAllUsers } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

router.get('/', protectRoute, getAllUsers);

export default router;
