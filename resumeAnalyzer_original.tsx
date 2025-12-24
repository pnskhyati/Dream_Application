/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { ai, PencilIcon, ScaleIcon, DocumentIcon } from './common';

export const ResumeAnalyzerPage = ({ navigateTo }) => {
    const [activeTab, setActiveTab] = useState('enhance'); // 'enhance' or 'bridge'
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeDataUrl, setResumeDataUrl] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [dreamJob, setDreamJob] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setResumeDataUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatText = (text = '') => {
        const html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .split('\n')
            .map(line => line.trim())
            .reduce((acc, line) => {
                if (line.startsWith('### ')) {
                    return acc + `<h4>${line.substring(4)}</h4>`;
                }
                if (line.startsWith('## ')) {
                    return acc + `<h3>${line.substring(3)}</h3>`;
                }
                if (line.startsWith('# ')) {
                    return acc + `<h2>${line.substring(2)}</h2>`;
                }
                if (line.startsWith('* ')) {
                    const item = `<li>${line.substring(2)}</li>`;
                    if (acc.endsWith('</ul>')) {
                        return acc.substring(0, acc.length - 5) + item + '</ul>';
                    } else {
                        return acc + `<ul>${item}</ul>`;
                    }
                } else if (line) { // to avoid empty <p> tags
                    return acc + `<p>${line}</p>`;
                }
                return acc;
            }, '');
        return html;
    };


    const handleEnhance = async () => {
        if (!resumeFile || !dreamJob) {
            setError('Please upload your resume and enter your dream job role.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        const filePart = {
            inlineData: {
                data: resumeDataUrl.split(',')[1],
                mimeType: resumeFile.type,
            },
        };

        const textPart = {
            text: `Please analyze the provided resume. Then, enhance it for the job role of a "${dreamJob}". Rewrite the resume to highlight the most relevant skills and experiences, using strong action verbs and a professional tone. Ensure the output is a complete, well-formatted resume.`
        };

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [filePart, textPart] },
            });
            setResult(response.text);
        } catch (err) {
            console.error("AI call failed", err);
            setError("Failed to enhance the resume. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBridgeGap = async () => {
        if (!resumeFile || !jobDescription) {
            setError('Please upload your resume and provide the job description.');
            return;
        }
        setIsLoading(true);
        setError('');
        setResult('');

        const filePart = {
            inlineData: {
                data: resumeDataUrl.split(',')[1],
                mimeType: resumeFile.type,
            },
        };

        const textPart = {
            text: `First, analyze the provided resume. Then, analyze the following job description:\n\n${jobDescription}\n\nPlease identify the skill gaps between the resume and the job description. Provide a clear list of missing skills and suggest specific changes to the resume to better align it with the job description. Format your response with clear headings for "Skill Gaps" and "Resume Suggestions".`
        };


        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [filePart, textPart] },
            });
            setResult(response.text);
        } catch (err) {
            console.error("AI call failed", err);
            setError("Failed to analyze. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="resume-analyzer-container">
            <header className="header filter-header">
                <button onClick={() => navigateTo('dashboard')} className="back-button" aria-label="Go back">← Back</button>
                <h1 className="header-title-filter">AI Resume Analyzer</h1>
                <div style={{ width: '80px' }}></div>
            </header>
            <main className="resume-analyzer-main">
                <div className="tabs-container">
                    <button className={`tab-button ${activeTab === 'enhance' ? 'active' : ''}`} onClick={() => setActiveTab('enhance')}>
                        <PencilIcon /> Enhance Resume
                    </button>
                    <button className={`tab-button ${activeTab === 'bridge' ? 'active' : ''}`} onClick={() => setActiveTab('bridge')}>
                        <ScaleIcon /> Bridge the Gap
                    </button>
                </div>

                <div className="input-section">
                    <h4>Upload Your Resume</h4>
                    <div className="file-upload-wrapper">
                        <input type="file" id="resume-upload" accept=".txt,.pdf,.doc,.docx" onChange={handleFileChange} style={{display: 'none'}} />
                        <label htmlFor="resume-upload" className="file-upload-label">
                            <DocumentIcon />
                            <span>{resumeFile ? resumeFile.name : 'Choose a file (.txt, .pdf, .docx)'}</span>
                        </label>
                    </div>
                     {resumeFile && <p className="file-success">Resume loaded successfully!</p>}
                </div>

                {activeTab === 'enhance' && (
                    <div className="tab-content">
                        <div className="input-section">
                            <h4>Enter Your Dream Job Role</h4>
                            <input
                                type="text"
                                className="text-input"
                                placeholder="e.g., Senior Software Engineer"
                                value={dreamJob}
                                onChange={(e) => setDreamJob(e.target.value)}
                            />
                        </div>
                        <button className="analyze-button" onClick={handleEnhance} disabled={isLoading || !resumeFile || !dreamJob}>
                            {isLoading ? 'Enhancing...' : 'Enhance My Resume'}
                        </button>
                    </div>
                )}

                {activeTab === 'bridge' && (
                     <div className="tab-content">
                         <div className="input-section">
                            <h4>Paste the Job Description</h4>
                            <textarea
                                className="textarea-input"
                                rows={10}
                                placeholder="Paste the full job description here..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            ></textarea>
                         </div>
                         <button className="analyze-button" onClick={handleBridgeGap} disabled={isLoading || !resumeFile || !jobDescription}>
                            {isLoading ? 'Analyzing...' : 'Bridge the Gap'}
                         </button>
                    </div>
                )}

                {isLoading && <div className="loader"></div>}
                {error && <div className="error-message">{error}</div>}

                {result && !isLoading && (
                    <div className="result-container">
                        <h3>Analysis Result</h3>
                        <div className="result-content" dangerouslySetInnerHTML={{ __html: formatText(result) }}></div>
                    </div>
                )}

            </main>
        </div>
    );
};
