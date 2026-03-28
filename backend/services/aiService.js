import axios from 'axios';

const FEATHERLESS_API_KEY = process.env.FEATHERLESS_API_KEY;
const FEATHERLESS_BASE_URL = 'https://api.featherless.ai/v1';
const MODEL = 'meta-llama/Meta-Llama-3.1-8B-Instruct';

const DEFAULT_CLASSIFICATION = {
  category: 'Other',
  department: 'Municipal Corp',
  severity: 'medium',
  summary: 'Complaint received and forwarded for review.'
};

const VALID_CATEGORIES = ['Road', 'Water', 'Electricity', 'Sanitation', 'Public Safety', 'Other'];
const VALID_DEPARTMENTS = ['PWD', 'Water Board', 'BESCOM', 'BBMP', 'Police', 'Municipal Corp'];
const VALID_SEVERITIES = ['low', 'medium', 'high', 'urgent'];

const extractJSONObject = (text) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Empty AI response');
  }

  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error('Unable to parse JSON response from AI');
  }
};

const normalizeClassification = (parsed, fallbackSummary = '') => {
  const category = VALID_CATEGORIES.includes(parsed?.category) ? parsed.category : DEFAULT_CLASSIFICATION.category;
  const department = VALID_DEPARTMENTS.includes(parsed?.department) ? parsed.department : DEFAULT_CLASSIFICATION.department;
  const severity = VALID_SEVERITIES.includes((parsed?.severity || '').toLowerCase())
    ? parsed.severity.toLowerCase()
    : DEFAULT_CLASSIFICATION.severity;
  const summary = typeof parsed?.summary === 'string' && parsed.summary.trim().length > 0
    ? parsed.summary.trim()
    : (fallbackSummary || DEFAULT_CLASSIFICATION.summary);

  return { category, department, severity, summary };
};

// Helper function to call Featherless AI
const callFeatherlessAI = async (messages, temperature = 0.7) => {
  try {
    if (!FEATHERLESS_API_KEY) {
      throw new Error('FEATHERLESS_API_KEY is not configured');
    }

    const response = await axios.post(
      `${FEATHERLESS_BASE_URL}/chat/completions`,
      {
        model: MODEL,
        messages,
        temperature,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${FEATHERLESS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Featherless AI API Error:', error.response?.data || error.message);
    throw error;
  }
};

// TASK 1: Classify complaint into category, department, severity
export const classifyComplaint = async (text, imageDescription = '') => {
  try {
    const prompt = `You are a civic complaint classifier. Analyze the complaint and return strict JSON only.

Complaint: ${text}
${imageDescription ? `Image Description: ${imageDescription}` : ''}

Respond with ONLY valid JSON (no markdown, no extra text):
{
  "category": one of ["Road", "Water", "Electricity", "Sanitation", "Public Safety", "Other"],
  "department": one of ["PWD", "Water Board", "BESCOM", "BBMP", "Police", "Municipal Corp"],
  "severity": one of ["low", "medium", "high", "urgent"],
  "summary": "one clear sentence describing the issue"
}`;

    const response = await callFeatherlessAI([{ role: 'user', content: prompt }], 0.3);
    const parsed = extractJSONObject(response);
    return normalizeClassification(parsed, text?.slice(0, 140));
  } catch (error) {
    console.error('Error classifying complaint:', error.message);
    return {
      ...DEFAULT_CLASSIFICATION,
      summary: (text || '').slice(0, 140) || DEFAULT_CLASSIFICATION.summary
    };
  }
};

// TASK 2: Generate Action Taken Report (ATR)
export const generateATR = async (complaint, resolutionNote) => {
  try {
    const prompt = `Generate a formal Action Taken Report (ATR) based on the following:

Complaint Title: ${complaint.title}
Complaint Description: ${complaint.description}
Category: ${complaint.category}
Location: ${complaint.location}
Official's Resolution Note: ${resolutionNote}

Format the ATR with these exact headers and clear values:
Issue:
Action Taken:
Department:
Resolution Date:
Status:

Keep it professional and concise (max 300 words).`;

    const atrText = await callFeatherlessAI([{ role: 'user', content: prompt }], 0.5);
    return atrText;
  } catch (error) {
    console.error('Error generating ATR:', error.message);
    const issueText = complaint?.title || complaint?.description || 'Complaint issue';
    const departmentText = complaint?.department || complaint?.category || 'Municipal Corp';
    return [
      `Issue: ${issueText}`,
      `Action Taken: ${resolutionNote || 'Action completed by concerned team.'}`,
      `Department: ${departmentText}`,
      `Resolution Date: ${new Date().toLocaleDateString()}`,
      'Status: Resolved'
    ].join('\n');
  }
};

// TASK 3: Predict resolution time based on category and severity
export const predictResolutionTime = async (category, severity) => {
  try {
    const severityMap = {
      'low': 7,
      'medium': 5,
      'high': 3,
      'urgent': 1
    };

    const categoryDaysMap = {
      'Road': 5,
      'Water': 7,
      'Electricity': 3,
      'Sanitation': 4,
      'Public Safety': 2,
      'Other': 7
    };

    const baseDays = categoryDaysMap[category] || 7;
    const severityModifier = severityMap[severity?.toLowerCase()] || 5;
    const estimatedDays = Math.ceil((baseDays + severityModifier) / 2);

    const prompt = `Given a complaint about "${category}" with severity "${severity}", suggest a helpful message about expected resolution time. Keep it to 1-2 sentences.`;
    const message = await callFeatherlessAI([{ role: 'user', content: prompt }], 0.5);

    return {
      days: estimatedDays,
      message: (message || '').trim() || `Expected resolution within ${estimatedDays} business days.`
    };
  } catch (error) {
    console.error('Error predicting resolution time:', error.message);
    const defaultDays = 7;
    return {
      days: defaultDays,
      message: `Expected resolution within ${defaultDays} business days.`
    };
  }
};

// TASK 4: Chatbot response to user queries about their complaints
export const chatbotResponse = async (userMessage, complaints = []) => {
  try {
    const complaintsSummary = complaints
      .map(c => `- ${c.title || c.complaintId || 'Complaint'} (${c.status || 'submitted'}, ${c.category || 'other'}, ${c.severity || 'medium'})`)
      .join('\n');

    const prompt = `You are a helpful citizen support chatbot for a grievance portal. A user is asking about their complaints.

User Message: "${userMessage}"

Their Complaints:
${complaintsSummary || 'No active complaints'}

Provide a helpful, empathetic response (1-3 sentences). Be conversational and supportive.`;

    const response = await callFeatherlessAI([{ role: 'user', content: prompt }], 0.7);
    return (response || '').trim() || 'Your complaint is under review. Please check the dashboard for updates.';
  } catch (error) {
    console.error('Error generating chatbot response:', error.message);
    // Fallback response
    return 'Thank you for reaching out! We are working on resolving your complaint as quickly as possible. You can track the status on your dashboard.';
  }
};

export default {
  classifyComplaint,
  generateATR,
  predictResolutionTime,
  chatbotResponse
};
