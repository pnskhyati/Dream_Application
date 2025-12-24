/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import { Chat } from "@google/genai";
import { ai, UsersIcon, CheckCircleIcon, DocumentIcon } from './common';

export const AIPrepHubPage = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState('interview'); // interview, skills, resume
    const [error, setError] = useState('');
    const chatWindowRef = useRef(null);

    // --- Mock Interview State ---
    const [jobRole, setJobRole] = useState('');
    const [interviewHistory, setInterviewHistory] = useState([]);
    const [userResponse, setUserResponse] = useState('');
    const [interviewChat, setInterviewChat] = useState<Chat | null>(null);
    const [isInterviewLoading, setIsInterviewLoading] = useState(false);
    const [interviewStarted, setInterviewStarted] = useState(false);

    // --- Skill Tester State ---
    const [selectedSkill, setSelectedSkill] = useState('JavaScript');
    const [skillQuestion, setSkillQuestion] = useState('');
    const [skillAnswer, setSkillAnswer] = useState('');
    const [skillFeedback, setSkillFeedback] = useState('');
    const [isSkillLoading, setIsSkillLoading] = useState(false);
    const skillOptions = ["JavaScript", "Python", "SQL", "Project Management", "Data Analysis", "UI/UX Principles"];

    // --- Resume Q&A State ---
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeDataUrl, setResumeDataUrl] = useState(null);
    const [resumeQuestion, setResumeQuestion] = useState('');
    const [resumeChatHistory, setResumeChatHistory] = useState([]);
    const [isResumeLoading, setIsResumeLoading] = useState(false);
    
    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [interviewHistory, resumeChatHistory]);
    
    const formatTextToHtml = (text = '') => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br />');
    };

    // --- Mock Interview Handlers ---
    const handleStartInterview = async () => {
        if (!jobRole) {
            setError("Please enter a job role to start the interview.");
            return;
        }
        setIsInterviewLoading(true);
        setError('');
        setInterviewHistory([]);
        
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
              systemInstruction: `You are a professional but friendly interviewer for the role of a "${jobRole}". Your goal is to assess the candidate's suitability for the role. Start by greeting the candidate and asking your first interview question. After the candidate responds, provide brief, constructive feedback on their answer, and then ask the next logical question. Ask only one question at a time. Keep the interview flowing naturally.`,
          },
        });
        setInterviewChat(chat);
        
        const initialResponse = await chat.sendMessage({ message: "Start the interview." });
        setInterviewHistory([{ role: 'ai', text: initialResponse.text }]);
        setInterviewStarted(true);
        setIsInterviewLoading(false);
    };

    const handleSendResponse = async (e) => {
        e.preventDefault();
        if (!userResponse.trim() || !interviewChat) return;

        setIsInterviewLoading(true);
        const currentHistory = [...interviewHistory, { role: 'user', text: userResponse }];
        setInterviewHistory(currentHistory);
        setUserResponse('');

        try {
            const response = await interviewChat.sendMessage({ message: userResponse });
            setInterviewHistory([...currentHistory, { role: 'ai', text: response.text }]);
        } catch (err) {
            console.error("Interview chat failed", err);
            setError("Sorry, an error occurred during the interview. Please try again.");
            setInterviewHistory(currentHistory); // Keep user message on error
        } finally {
            setIsInterviewLoading(false);
        }
    };

    // --- Skill Tester Handlers ---
    const handleGenerateSkillQuestion = async () => {
        setIsSkillLoading(true);
        setError('');
        setSkillQuestion('');
        setSkillAnswer('');
        setSkillFeedback('');
        
        const prompt = `Generate one technical or situational question to test a candidate's proficiency in "${selectedSkill}". The question should be clear and concise.`;
        try {
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setSkillQuestion(response.text);
        } catch (err) {
            console.error("Skill question generation failed", err);
            setError("Failed to generate a question. Please try again.");
        } finally {
            setIsSkillLoading(false);
        }
    };
    
    const handleCheckAnswer = async () => {
        if (!skillAnswer) {
            setError("Please provide an answer to the question.");
            return;
        }
        setIsSkillLoading(true);
        setError('');
        setSkillFeedback('');
        
        const prompt = `A candidate was asked the following question about ${selectedSkill}: "${skillQuestion}". The candidate provided this answer: "${skillAnswer}". Please evaluate the answer for correctness, clarity, and completeness. Provide constructive feedback.`;
        try {
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setSkillFeedback(response.text);
        } catch (err) {
            console.error("Skill answer check failed", err);
            setError("Failed to check the answer. Please try again.");
        } finally {
            setIsSkillLoading(false);
        }
    };

    // --- Resume Q&A Handlers ---
     const handleResumeFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFile(file);
            setResumeChatHistory([]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeDataUrl(reader.result as string);
                setResumeChatHistory([{role: 'ai', text: 'Your resume is loaded. What would you like to know? Feel free to ask me anything about its content or for suggestions to improve it.'}]);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleAskResumeQuestion = async (e) => {
        e.preventDefault();
        if (!resumeQuestion.trim() || !resumeFile) return;
        
        setIsResumeLoading(true);
        const currentHistory = [...resumeChatHistory, {role: 'user', text: resumeQuestion}];
        setResumeChatHistory(currentHistory);
        setResumeQuestion('');
        
        const filePart = { inlineData: { data: resumeDataUrl.split(',')[1], mimeType: resumeFile.type } };
        const textPart = { text: `Based on the provided resume, answer the following question: "${resumeQuestion}"` };
        
        try {
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: { parts: [filePart, textPart] } });
            setResumeChatHistory([...currentHistory, { role: 'ai', text: response.text }]);
        } catch (err) {
             console.error("Resume Q&A failed", err);
             setError("Sorry, I couldn't answer that question. Please try again.");
             setResumeChatHistory(currentHistory);
        } finally {
            setIsResumeLoading(false);
        }
    }


    return (
        <div className="ai-prep-hub-container">
            <header className="header filter-header">
                <button onClick={() => navigateTo('dashboard')} className="back-button" aria-label="Go back">← Back</button>
                <h1 className="header-title-filter">AI Prep Hub</h1>
                <div style={{ width: '80px' }}></div>
            </header>
            <main className="ai-prep-hub-main">
                <div className="tabs-container">
                    <button className={`tab-button ${activeTab === 'interview' ? 'active' : ''}`} onClick={() => setActiveTab('interview')}><UsersIcon /> Mock Interview</button>
                    <button className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}><CheckCircleIcon /> Skill Tester</button>
                    <button className={`tab-button ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => setActiveTab('resume')}><DocumentIcon /> Resume Q&A</button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {activeTab === 'interview' && (
                    <div className="tab-content">
                        <p className="tool-description">Practice a real-time interview with an AI for any job role.</p>
                        {!interviewStarted ? (
                            <div className="input-section">
                                <h4>Enter a Job Role to Begin</h4>
                                <input type="text" className="text-input" placeholder="e.g., Product Manager" value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
                                <button className="action-button" onClick={handleStartInterview} disabled={isInterviewLoading || !jobRole}>
                                    {isInterviewLoading ? 'Starting...' : 'Start Interview'}
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="chat-window" ref={chatWindowRef}>
                                    {interviewHistory.map((msg, index) => (
                                        <div key={index} className={`chat-message ${msg.role}`} dangerouslySetInnerHTML={{ __html: formatTextToHtml(msg.text) }}></div>
                                    ))}
                                    {isInterviewLoading && <div className="loader" style={{alignSelf: 'flex-start'}}></div>}
                                </div>
                                <form className="chat-input-form" onSubmit={handleSendResponse}>
                                    <input type="text" className="text-input" placeholder="Type your answer..." value={userResponse} onChange={(e) => setUserResponse(e.target.value)} disabled={isInterviewLoading} />
                                    <button type="submit" className="action-button" disabled={isInterviewLoading || !userResponse.trim()}>Send</button>
                                </form>
                            </>
                        )}
                    </div>
                )}
                
                {activeTab === 'skills' && (
                    <div className="tab-content">
                         <p className="tool-description">Test your knowledge in a specific skill area with AI-generated questions.</p>
                         <div className="skill-tester-controls">
                             <div className="select-wrapper">
                                 <select className="location-select" value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                                     {skillOptions.map(skill => <option key={skill} value={skill}>{skill}</option>)}
                                 </select>
                             </div>
                             <button className="action-button" onClick={handleGenerateSkillQuestion} disabled={isSkillLoading}>
                                 {isSkillLoading ? '...' : 'New Question'}
                            </button>
                         </div>
                         {isSkillLoading && !skillQuestion && <div className="loader"></div>}
                         {skillQuestion && (
                             <>
                                <div className="skill-question-box">
                                    <h4>Question:</h4>
                                    <p>{skillQuestion}</p>
                                </div>
                                <textarea className="textarea-input" rows={6} placeholder="Your answer..." value={skillAnswer} onChange={(e) => setSkillAnswer(e.target.value)}></textarea>
                                <button className="action-button" onClick={handleCheckAnswer} disabled={isSkillLoading || !skillAnswer}>
                                    {isSkillLoading ? 'Checking...' : 'Check My Answer'}
                                </button>
                             </>
                         )}
                         {isSkillLoading && skillFeedback && <div className="loader"></div>}
                         {skillFeedback && (
                             <div className="result-container">
                                 <div className="skill-feedback-box">
                                     <h4>Feedback:</h4>
                                     <p dangerouslySetInnerHTML={{ __html: formatTextToHtml(skillFeedback) }}></p>
                                 </div>
                             </div>
                         )}
                    </div>
                )}

                {activeTab === 'resume' && (
                     <div className="tab-content">
                        <p className="tool-description">Upload your resume and ask the AI interviewer questions about it.</p>
                        <div className="input-section">
                             <div className="file-upload-wrapper">
                                <input type="file" id="resume-upload-prep" accept=".txt,.pdf,.doc,.docx" onChange={handleResumeFileChange} style={{display: 'none'}} />
                                <label htmlFor="resume-upload-prep" className="file-upload-label">
                                    <DocumentIcon />
                                    <span>{resumeFile ? resumeFile.name : 'Choose a resume file (.txt, .pdf, .docx)'}</span>
                                </label>
                            </div>
                            {resumeFile && <p className="file-success">Resume loaded successfully!</p>}
                        </div>
                        {resumeFile && (
                           <>
                                <div className="chat-window" ref={chatWindowRef}>
                                    {resumeChatHistory.map((msg, index) => (
                                        <div key={index} className={`chat-message ${msg.role}`} dangerouslySetInnerHTML={{ __html: formatTextToHtml(msg.text) }}></div>
                                    ))}
                                    {isResumeLoading && <div className="loader" style={{alignSelf: 'flex-start'}}></div>}
                                </div>
                                <form className="chat-input-form" onSubmit={handleAskResumeQuestion}>
                                    <input type="text" className="text-input" placeholder="Ask about your resume..." value={resumeQuestion} onChange={(e) => setResumeQuestion(e.target.value)} disabled={isResumeLoading} />
                                    <button type="submit" className="action-button" disabled={isResumeLoading || !resumeQuestion.trim()}>Ask</button>
                                </form>
                           </>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
