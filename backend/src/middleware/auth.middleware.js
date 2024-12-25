import { createClerkClient } from '@clerk/express';
import dotenv from 'dotenv';
dotenv.config();

const clerkClient = createClerkClient({
  secretKey: process.env.VITE_CLERK_SECRET_KEY,
});

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

export const requiredAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  } catch (error) {
    next(error);
  }
};
