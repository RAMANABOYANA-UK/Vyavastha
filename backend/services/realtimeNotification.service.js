import { io } from '../server.js';
import Notification from '../models/Notification.model.js';

/**
 * Send real-time notification via Socket.io
 * @param {String} userId - User ID to receive notification
 * @param {Object} notification - Notification object { title, message, type, complaintId, createdAt }
 */
export const sendRealTimeNotification = async (userId, notification) => {
  try {
    if (!io) {
      console.warn('⚠️ Socket.io instance not available');
      return;
    }

    const payload = {
      id: new Date().getTime(),
      title: notification.title,
      message: notification.message,
      type: notification.type || 'info',
      complaintId: notification.complaintId,
      createdAt: notification.createdAt || new Date()
    };

    // Emit to user's personal room
    io.to(`user_${userId}`).emit('new_notification', payload);
    console.log(`📢 Sent real-time notification to user ${userId}`);
  } catch (error) {
    console.error('❌ Error sending real-time notification:', error);
  }
};

/**
 * Send status update notification
 * Saves to MongoDB and emits real-time via Socket.io
 * @param {String} citizenId - Citizen user ID
 * @param {Object} complaint - Complaint object with title, complaintId, department
 * @param {String} newStatus - New complaint status
 */
export const sendStatusUpdateNotification = async (citizenId, complaint, newStatus) => {
  try {
    // Map status to notification details
    const statusNotificationMap = {
      'assigned': {
        type: 'info',
        title: '📌 Complaint Assigned',
        getMessage: (complaint) => {
          const dept = complaint.assignedDepartment || 'appropriate department';
          return `Your complaint "${complaint.complaintId}" has been assigned to ${dept}`;
        }
      },
      'Assigned': {
        type: 'info',
        title: '📌 Complaint Assigned',
        getMessage: (complaint) => {
          const dept = complaint.assignedDepartment || 'appropriate department';
          return `Your complaint "${complaint.complaintId}" has been assigned to ${dept}`;
        }
      },
      'in_progress': {
        type: 'info',
        title: '🔧 Work Started',
        getMessage: (complaint) => `Work has started on your complaint "${complaint.complaintId}"`,
      },
      'In Progress': {
        type: 'info',
        title: '🔧 Work Started',
        getMessage: (complaint) => `Work has started on your complaint "${complaint.complaintId}"`,
      },
      'resolved': {
        type: 'success',
        title: '✅ Complaint Resolved',
        getMessage: (complaint) => `Your complaint "${complaint.complaintId}" has been resolved!`,
      },
      'Resolved': {
        type: 'success',
        title: '✅ Complaint Resolved',
        getMessage: (complaint) => `Your complaint "${complaint.complaintId}" has been resolved!`,
      },
      'rejected': {
        type: 'error',
        title: '❌ Complaint Rejected',
        getMessage: (complaint) => `Your complaint "${complaint.complaintId}" could not be processed. Please check for details.`,
      },
      'Rejected': {
        type: 'error',
        title: '❌ Complaint Rejected',
        getMessage: (complaint) => `Your complaint "${complaint.complaintId}" could not be processed. Please check for details.`,
      }
    };

    const notificationConfig = statusNotificationMap[newStatus];

    if (!notificationConfig) {
      console.log(`⏭️  No notification for status: ${newStatus}`);
      return;
    }

    // Build notification object
    const notificationPayload = {
      title: notificationConfig.title,
      message: notificationConfig.getMessage(complaint),
      type: notificationConfig.type,
      complaintId: complaint._id,
      createdAt: new Date()
    };

    // Save to MongoDB
    const savedNotification = await Notification.create({
      user: citizenId,
      type: 'complaint_update',
      title: notificationPayload.title,
      message: notificationPayload.message,
      data: { complaintId: complaint._id }
    });

    console.log(`💾 Saved notification to DB: ${savedNotification._id}`);

    // Send real-time notification via Socket.io
    await sendRealTimeNotification(citizenId, notificationPayload);
  } catch (error) {
    console.error('❌ Error in sendStatusUpdateNotification:', error);
  }
};
