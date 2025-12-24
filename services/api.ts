const API_BASE_URL = 'https://8080-cs-59305caa-5bb2-4a29-9a24-ac06ee3282bc.cs-asia-southeast1-kelp.cloudshell.dev';

export class APIClient {
  async chat(message: string, userId: string = 'default_user', sessionId: string | null = null) {
    const actualSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, user_id: userId, session_id: actualSessionId }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { text: data.reply, sessionId: data.session_id };
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  }

  async startInterview(jobRole: string, userId: string = 'default_user') {
    const sessionId = `interview_${Date.now()}`;
    try {
      const response = await fetch(`${API_BASE_URL}/start-interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interview_type: jobRole, user_id: userId, session_id: sessionId }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { text: data.reply, sessionId: data.session_id };
    } catch (error) {
      console.error('Interview Start Error:', error);
      throw error;
    }
  }

  async requestSkillTest(topic: string, userId: string = 'default_user') {
    const sessionId = `skill_${Date.now()}`;
    try {
      const response = await fetch(`${API_BASE_URL}/skill-test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, user_id: userId, session_id: sessionId }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { text: data.test };
    } catch (error) {
      console.error('Skill Test Error:', error);
      throw error;
    }
  }

  async analyzeResume(resumeText: string, question: string = "Analyze this resume") {
    try {
      const response = await fetch(`${API_BASE_URL}/resume-analysis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resumeText, question }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { text: data.analysis };
    } catch (error) {
      console.error('Resume Analysis Error:', error);
      throw error;
    }
  }
}

export const apiClient = new APIClient();
