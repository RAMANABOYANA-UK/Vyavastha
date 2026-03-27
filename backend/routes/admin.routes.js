import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { checkAndEscalateComplaints, getEscalationStats } from '../services/escalationService.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin', 'official'));

/**
 * Manually trigger complaint escalation check
 * GET /api/admin/escalate-now
 */
router.get('/escalate-now', async (req, res) => {
  try {
    console.log(`[Admin API] Manual escalation triggered by user ${req.user._id}`);
    
    const result = await checkAndEscalateComplaints();
    
    res.json({
      success: true,
      message: `Successfully escalated ${result.escalated} complaints`,
      escalated: result.escalated,
      errors: result.errors,
      details: result.details,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Admin API] Error in manual escalation:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger escalation',
      message: error.message
    });
  }
});

/**
 * Get escalation statistics
 * GET /api/admin/escalation-stats
 */
router.get('/escalation-stats', async (req, res) => {
  try {
    const stats = await getEscalationStats();
    
    res.json({
      success: true,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[Admin API] Error getting escalation stats:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch escalation statistics',
      message: error.message
    });
  }
});

export default router;
