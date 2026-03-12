import { Request, Response, Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// A public route
router.get('/public', (req: Request, res: Response) => {
  res.json({ message: 'This is a public route.' });
});

// A protected route that requires the user to be authenticated
router.get('/protected', requireAuth, (req: Request, res: Response) => {
  // We can access req.user here because requireAuth attached it
  res.json({ 
    message: 'This is a protected route.',
    user: req.user
  });
});

export default router;
