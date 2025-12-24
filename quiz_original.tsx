/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { Type } from "@google/genai";
import { ai } from './common';

// --- QUIZ QUESTIONS DATA ---

const personalityQuizQuestions = [
    { question: "Are you more energized by spending time with a large group of people or a small group of close friends?", options: ["A large, bustling group", "A small group of close friends", "A mix of both is ideal", "I'm most energized by time alone"] },
    { question: "When making a decision, do you rely more on logic and facts or on your gut feeling and the impact on others?", options: ["Logic and objective facts", "Gut feeling and impact on people", "A balance of both", "It depends entirely on the situation"] },
    { question: "Do you prefer to have a clear, predictable schedule or do you like to keep your options open and be spontaneous?", options: ["A predictable, organized schedule", "A spontaneous and flexible approach", "A plan that has room for change", "I strongly dislike strict schedules"] },
    { question: "Are you more interested in the big picture and future possibilities or the practical details of the here and now?", options: ["The big picture and future ideas", "Practical details of the present", "A bit of both, connecting ideas to reality", "I focus on what's real and tangible"] },
    { question: "In a team project, are you more likely to be the one organizing tasks and deadlines or the one brainstorming new ideas?", options: ["Organizing the tasks and timeline", "Brainstorming creative new ideas", "I can do both depending on the need", "I prefer to work on my own part"] },
    { question: "How do you typically handle conflict?", options: ["Address it directly and logically", "Find a harmonious solution for everyone", "Avoid it if possible", "Mediate and understand all sides"] },
    { question: "Which statement describes you better?", options: ["\"I like to finish things.\"", "\"I like to start new things.\"", "\"I enjoy the entire process, start to finish.\"", "\"I'm most motivated by the final deadline.\""] },
    { question: "You're given a complex task. What's your first step?", options: ["Break it into a step-by-step plan", "Experiment with different approaches", "Collaborate with others to find a solution", "Research it thoroughly before starting"] },
    { question: "Which sounds more rewarding to you?", options: ["Achieving a difficult, measurable goal", "Creating something beautiful and unique", "Helping a team member or friend succeed", "Discovering a new piece of information"] },
    { question: "At work, you value:", options: ["Efficiency and clear results", "Harmony and positive teamwork", "Innovation and creative freedom", "Knowledge and deep understanding"] }
];

const academicsQuizQuestions = [
    { question: "Which of these subject groups do you enjoy the most?", options: ["STEM (Science, Tech, Engineering, Math)", "Humanities (History, Literature, Philosophy)", "Arts (Music, Drama, Visual Arts)", "Business & Commerce (Economics, Accounting)"] },
    { question: "How do you prefer to learn new things?", options: ["Through hands-on experiments and building things", "By reading books and dense articles", "Through group discussions and debates", "By listening to lectures from experts"] },
    { question: "What kind of homework assignment do you find most engaging?", options: ["Solving complex math or logic problems", "Writing a research paper or a persuasive essay", "Creating a presentation or a piece of art", "Conducting a lab experiment and writing a report"] },
    { question: "When you study, are you more interested in:", options: ["The underlying theories and abstract concepts", "The practical applications and real-world uses", "The historical context and story behind it", "The creative interpretation and self-expression"] },
    { question: "Which activity would you choose for an extracurricular?", options: ["Robotics or coding club", "Debate team or school newspaper", "School band or drama club", "Science Olympiad or mathletes"] },
    { question: "You have to do a major project. You would prefer to:", options: ["Work alone on a technical challenge", "Lead a group to organize and complete the project", "Collaborate on a creative group concept", "Conduct in-depth independent research"] },
    { question: "Which statement best describes your academic strengths?", options: ["\"I'm good with numbers and logical systems.\"", "\"I'm a strong writer and communicator.\"", "\"I have a great imagination and artistic skill.\"", "\"I'm naturally curious and a good researcher.\""] },
    { question: "The most important part of a class for you is:", options: ["Learning practical skills I can use in a job", "Understanding complex, challenging theories", "Having a chance to express my own ideas", "Gaining new knowledge about how the world works"] },
    { question: "Which topic would you be most excited to read a book about?", options: ["The latest breakthroughs in artificial intelligence", "A biography of a famous historical leader", "A collection of poetry by an award-winning author", "A scientific study on animal behavior"] },
    { question: "My ideal job would be like my favorite class, which was:", options: ["Structured and logical, like Math or Physics", "Expressive and open-ended, like English or Art", "Fact-based and analytical, like History or Biology", "People-oriented and collaborative, like Psychology or Sociology"] }
];

const generalQuizQuestions = [
    { question: "When starting a new project, what's your first move?", options: ["Jump right in and start experimenting.", "Create a detailed plan and schedule.", "Brainstorm creative ideas with a team.", "Research existing solutions and data."] },
    { question: "Which work environment sounds most appealing?", options: ["A fast-paced, dynamic startup.", "A stable, well-organized corporate office.", "A collaborative and creative studio.", "A quiet, independent research lab."] },
    { question: "How do you prefer to solve difficult problems?", options: ["Through trial and error, learning as I go.", "By breaking it down into smaller, logical steps.", "By discussing different perspectives with others.", "By analyzing all available information first."] },
    { question: "You have a free afternoon. What are you most likely to do?", options: ["Build something with my hands or code a small project.", "Organize my closet or plan my week.", "Visit an art gallery or write a story.", "Read a non-fiction book or watch a documentary."] },
    { question: "What role do you naturally take in a group setting?", options: ["The one who gets things done and pushes for action.", "The organizer who keeps everyone on track.", "The idea generator who inspires others.", "The analyst who ensures decisions are well-informed."] },
    { question: "Which of these tasks would you enjoy the most?", options: ["Assembling furniture or fixing a broken gadget.", "Creating a budget or managing a project timeline.", "Designing a logo or brainstorming a marketing campaign.", "Conducting a scientific experiment or analyzing market trends."] },
    { question: "How do you feel about rules and procedures?", options: ["They're useful, but I'm not afraid to bend them.", "They are essential for efficiency and order.", "They can sometimes limit creativity.", "They should be based on evidence and logic."] },
    { question: "What's more important in a job?", options: ["Seeing tangible results from my work.", "Having structure and clear expectations.", "Having the freedom to express my creativity.", "The opportunity to learn and discover new things."] },
    { question: "When faced with a setback, you tend to:", options: ["Quickly try a different approach.", "Analyze what went wrong to prevent it from happening again.", "Look for a creative, unconventional solution.", "Gather more data to understand the root cause."] },
    { question: "Which school subject did you enjoy the most?", options: ["Shop class, computer science, or hands-on labs.", "Math or economics.", "Art, music, or literature.", "Physics, chemistry, or history."] },
    { question: "I am most effective when I can:", options: ["Work with concrete things and see immediate results.", "Follow a clear and structured process.", "Imagine new possibilities and inspire others.", "Deeply analyze complex information."] },
    { question: "A perfect day at work would involve:", options: ["Building, creating, or producing something tangible.", "Organizing systems, data, or people efficiently.", "Collaborating on innovative and original ideas.", "Solving a complex puzzle or conducting research."] },
    { question: "I prefer information to be presented:", options: ["As practical demonstrations or case studies.", "In organized charts, graphs, and outlines.", "As visual stories or metaphors.", "As detailed reports with supporting data."] },
    { question: "What kind of feedback is most valuable to you?", options: ["Feedback on the functionality and efficiency of my work.", "Feedback on my adherence to the plan and process.", "Feedback on the originality and impact of my ideas.", "Feedback on the accuracy and depth of my analysis."] },
    { question: "When learning a new skill, I prefer to:", options: ["Learn by doing and practicing.", "Follow a structured course with clear steps.", "Explore and connect it to other ideas.", "Understand the underlying theory and principles."] },
    { question: "Which movie genre do you prefer?", options: ["Action or Sci-Fi.", "Drama or Historical.", "Fantasy or Comedy.", "Mystery or Documentary."] },
    { question: "I feel most satisfied when I:", options: ["Complete a challenging task successfully.", "Bring order to a chaotic situation.", "Come up with an idea no one else has thought of.", "Finally understand a difficult concept."] },
    { question: "My ideal manager is someone who:", options: ["Gives me goals and gets out of my way.", "Provides clear instructions and expectations.", "Encourages experimentation and new ideas.", "Is an expert in the field and can answer my questions."] },
    { question: "I am drawn to careers that involve:", options: ["Technology, engineering, or skilled trades.", "Management, finance, or administration.", "Arts, communication, or design.", "Science, research, or data analysis."] },
    { question: "Ultimately, I want my work to be:", options: ["Practical and useful.", "Organized and reliable.", "Innovative and inspiring.", "Accurate and insightful."] }
];

const aptitudeQuizQuestions = [
    { question: "Doctor is to Hospital as Teacher is to...?", options: ["Student", "Book", "School", "Lesson"] },
    { question: "What number comes next in the series: 2, 5, 11, 23, ...?", options: ["47", "46", "34", "51"] },
    { question: "If all cats have fur, and a tiger is a cat, what can you conclude?", options: ["All furry animals are tigers.", "Tigers have fur.", "Tigers are not cats.", "Some cats are tigers."] },
    { question: "Which word does not belong with the others?", options: ["Car", "Bicycle", "Boat", "Shoes"] },
    { question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?", options: ["$0.10", "$0.05", "$1.00", "$0.50"] },
    { question: "A sequence of shapes goes: Circle, Triangle, Square, Circle, Triangle... What comes next?", options: ["Circle", "Triangle", "Square", "Pentagon"] },
    { question: "A farmer has 17 sheep. All but 9 die. How many are left?", options: ["17", "9", "8", "0"] },
    { question: "How many times does the digit '9' appear between 1 and 100?", options: ["10", "11", "19", "20"] },
    { question: "You notice a coworker is struggling to meet a deadline. What is the most appropriate first step?", options: ["Tell your manager they are falling behind.", "Offer to help them with some of their tasks.", "Ignore it, it's not your responsibility.", "Advise them to manage their time better."] },
    { question: "If you rearrange the letters 'CIFAIPC', you would have the name of a(n):", options: ["City", "Animal", "Ocean", "Country"] }
];


export const QuizPage = ({ navigateTo }) => {
    const [quizStage, setQuizStage] = useState('landing'); // 'landing', 'psychometricOptions', 'taking', 'loading', 'results'
    const [activeQuiz, setActiveQuiz] = useState(null); // { type: 'personality', title: 'Personality Quiz' }
    const [activeQuestions, setActiveQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizResults, setQuizResults] = useState(null);
    const [error, setError] = useState('');

    const resetQuizState = () => {
        setQuizStage('landing');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setQuizResults(null);
        setError('');
        setActiveQuiz(null);
        setActiveQuestions([]);
    };

    const handleBack = () => {
        if (quizStage === 'landing') {
            navigateTo('dashboard');
        } else if (quizStage === 'psychometricOptions') {
            setQuizStage('landing');
        } else {
            resetQuizState();
        }
    };

    const startQuiz = (quizType) => {
        let questions;
        let quizTitle;
        switch (quizType) {
            case 'personality':
                questions = personalityQuizQuestions;
                quizTitle = 'Personality Test';
                break;
            case 'academics':
                questions = academicsQuizQuestions;
                quizTitle = 'Academics-Based Quiz';
                break;
            case 'aptitude':
                questions = aptitudeQuizQuestions;
                quizTitle = 'Aptitude Test';
                break;
            default:
                questions = generalQuizQuestions;
                quizTitle = 'General Personalized Quiz';
                break;
        }

        setActiveQuiz({ type: quizType, title: quizTitle });
        setActiveQuestions(questions);
        setQuizStage('taking');
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setQuizResults(null);
        setError('');
    };
    
    const handleAnswerSelect = (answer) => {
        const newAnswers = [...answers, { question: activeQuestions[currentQuestionIndex].question, answer }];
        setAnswers(newAnswers);

        if (currentQuestionIndex < activeQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            getCareerSuggestions(newAnswers);
        }
    };
    
    const getCareerSuggestions = async (finalAnswers) => {
        setQuizStage('loading');
        
        const prompt = `You are an expert career counselor. A user has taken a "${activeQuiz.title}" to get career suggestions. Based on their answers below, suggest 3 to 5 career paths that would be a great fit. For each suggested career, provide a concise, one-paragraph explanation detailing why it aligns with their answers.

        Here are the user's answers:
        ${finalAnswers.map((item, index) => `Q${index + 1}: ${item.question}\nA${index + 1}: ${item.answer}`).join('\n\n')}
        `;

        const schema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    careerName: { type: Type.STRING, description: "The name of the recommended career path." },
                    reason: { type: Type.STRING, description: "A paragraph explaining why this career is a good fit based on the quiz answers." },
                }
            }
        };

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: { responseMimeType: "application/json", responseSchema: schema },
            });
            const results = JSON.parse(response.text);
            setQuizResults(results);
            setQuizStage('results');
        } catch (err) {
            console.error("AI call for quiz results failed", err);
            setError("Sorry, we couldn't generate your career suggestions. Please try the quiz again.");
            setQuizStage('results');
        }
    };
    
    const progress = activeQuestions.length > 0 ? ((currentQuestionIndex + 1) / activeQuestions.length) * 100 : 0;

    return (
        <div className="quiz-page-container">
            <button onClick={handleBack} className="quiz-back-button" aria-label="Go back">← Back</button>
            {quizStage === 'landing' && (
                <div className="quiz-landing-view">
                    <h1 className="quiz-landing-title">Choose a Quiz to Begin</h1>
                    <div className="quiz-options-grid">
                        <div className="quiz-option-card quiz-card-1" onClick={() => setQuizStage('psychometricOptions')}>
                            <h3>Psychometric Test</h3>
                            <p>Assess your core personality traits and cognitive abilities to find careers that match your natural strengths.</p>
                        </div>
                        <div className="quiz-option-card quiz-card-2" onClick={() => startQuiz('general')}>
                            <h3>General Personalized Quiz</h3>
                            <p>Answer tailored questions about your strengths and interests to get career suggestions uniquely aligned with who you are.</p>
                        </div>
                        <div className="quiz-option-card quiz-card-3" onClick={() => startQuiz('academics')}>
                             <h3>Academics-Based Quiz</h3>
                            <p>Get career recommendations based on your favorite subjects and learning style to see which paths fit your academic profile.</p>
                        </div>
                    </div>
                </div>
            )}

            {quizStage === 'psychometricOptions' && (
                <div className="quiz-landing-view">
                     <h1 className="quiz-landing-title">Psychometric Tests</h1>
                     <div className="quiz-sub-options-grid">
                        <div className="quiz-option-card quiz-card-4" onClick={() => startQuiz('aptitude')}>
                             <h3>Aptitude Test</h3>
                             <p>Test your logical reasoning, problem-solving, and critical thinking skills with a series of challenging questions.</p>
                        </div>
                         <div className="quiz-option-card quiz-card-1" onClick={() => startQuiz('personality')}>
                            <h3>Personality Test</h3>
                            <p>Discover your personality type and match your traits to the most suitable career paths for you.</p>
                        </div>
                     </div>
                </div>
            )}
            
            {quizStage === 'taking' && (
                <div className="quiz-taking-view">
                     <div className="quiz-progress-container">
                        <p className="quiz-progress-text">Question {currentQuestionIndex + 1} of {activeQuestions.length}</p>
                        <div className="quiz-progress-bar-background">
                            <div className="quiz-progress-bar-foreground" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <p className="quiz-question-text">{activeQuestions[currentQuestionIndex].question}</p>
                    <div className="quiz-answer-options">
                        {activeQuestions[currentQuestionIndex].options.map((option, index) => (
                            <button key={index} className="quiz-answer-btn" onClick={() => handleAnswerSelect(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {quizStage === 'loading' && <div className="loader"></div>}
            
            {quizStage === 'results' && (
                 <div className="quiz-results-view">
                    <h2 className="quiz-results-title">Here Are Your Results!</h2>
                    <p className="quiz-results-subtitle">Based on your answers from the {activeQuiz.title}, here are a few career paths that might be a great fit for you.</p>
                    {error && <div className="error-message">{error}</div>}
                    {quizResults && (
                        <div className="quiz-results-grid">
                            {quizResults.map((result, index) => (
                                <div key={index} className="quiz-result-card">
                                    <h4>{result.careerName}</h4>
                                    <p>{result.reason}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    <button onClick={() => startQuiz(activeQuiz.type)} className="retake-quiz-btn">Take Quiz Again</button>
                 </div>
            )}

        </div>
    );
};
