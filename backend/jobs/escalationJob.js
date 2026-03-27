import cron from 'node-cron';
import { checkAndEscalateComplaints } from '../services/escalationService.js';

/**
 * Start the escalation job
 * Runs every day at midnight (00:00)
 * Also runs once immediately on startup for testing
 */
export const startEscalationJob = async () => {
  console.log('[Escalation Job] Initializing...');

  // Run once immediately on startup for testing/initialization
  try {
    console.log(`[Escalation Job] Running initial check at startup - ${new Date().toISOString()}`);
    const result = await checkAndEscalateComplaints();
    console.log(`[Escalation Job] Initial check completed - Escalated: ${result.escalated}, Errors: ${result.errors}`);
  } catch (error) {
    console.error('[Escalation Job] Error in initial check:', error.message);
  }

  // Schedule for every day at midnight (00:00)
  const cronTask = cron.schedule('0 0 * * *', async () => {
    console.log(`\n[Escalation Job] Starting daily check at ${new Date().toISOString()}`);
    
    try {
      const result = await checkAndEscalateComplaints();
      console.log(`[Escalation Job] Finished daily check at ${new Date().toISOString()}`);
      console.log(`[Escalation Job] Summary - Escalated: ${result.escalated}, Errors: ${result.errors}`);
    } catch (error) {
      console.error('[Escalation Job] Error during daily check:', error.message);
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
  });

  console.log('[Escalation Job] Scheduled successfully - Will run daily at 00:00 (Asia/Kolkata timezone)');
  console.log('[Escalation Job] Next scheduled run:', cronTask.nextDate().toString());

  return cronTask;
};

/**
 * Stop the escalation job
 */
export const stopEscalationJob = (cronTask) => {
  if (cronTask) {
    cronTask.stop();
    console.log('[Escalation Job] Stopped');
  }
};
