import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin-only Miro board URL endpoint
router.get('/board-url', protect, authorize('admin'), (req, res) => {
  res.json({
    boardUrl: process.env.MIRO_BOARD_URL || ''
  });
});

export default router;
