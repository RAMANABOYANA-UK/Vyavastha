import express from 'express';
import { asyncHandler } from '../middleware/error.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import Notification from '../models/Notification.model.js';

const router = express.Router();

// @desc    Get all notifications for logged-in user
// @route   GET /api/notifications
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json({
    success: true,
    count: notifications.length,
    data: notifications
  });
}));

// @desc    Get unread notifications count
// @route   GET /api/notifications/unread/count
// @access  Private
router.get('/unread/count', protect, asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({
    user: req.user._id,
    isRead: false
  });

  res.json({
    success: true,
    unreadCount: count
  });
}));

// @desc    Mark notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Private
router.patch('/:id/read', protect, asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    {
      isRead: true,
      readAt: new Date()
    },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({
    success: true,
    data: notification
  });
}));

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Private
router.patch('/read-all', protect, asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { user: req.user._id, isRead: false },
    { isRead: true, readAt: new Date() }
  );

  res.json({
    success: true,
    message: 'All notifications marked as read'
  });
}));

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
router.delete('/:id', protect, asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json({
    success: true,
    message: 'Notification deleted'
  });
}));

export default router;
