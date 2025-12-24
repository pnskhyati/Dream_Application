/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';

const BACKEND_BASE_URL = 'https://quiz-backend-225573582209.asia-southeast1.run.app';

/* ===========================
   Question Banks
   =========================== */

// Aptitude Test (100 items). Keep 4 options each.
const aptitudeBank100 = [
  { question: "Find the next number: 3, 8, 15, 24, 35, ...", options: ["48", "49", "50", "52"] },
  { question: "Which is the odd one out?", options: ["Triangle", "Square", "Pentagon", "Sphere"] },
  { question: "If A=1, B=2, ... Z=26, then CAT equals:", options: ["27", "24", "46", "43"] },
  { question: "A train 200m long crosses a pole in 10s. Speed is:", options: ["54 km/h", "60 km/h", "72 km/h", "36 km/h"] },
  { question: "Doctor : Hospital :: Chef : ?", options: ["Kitchen", "Restaurant", "Menu", "Recipe"] },
  { question: "Sequence: 2, 6, 12, 20, 30, ...", options: ["40", "42", "44", "46"] },
  { question: "All roses are flowers. Some flowers fade quickly. Therefore some roses may fade quickly.", options: ["True", "False", "Cannot say", "Always true"] },
  { question: "15% of 240 =", options: ["24", "30", "32", "36"] },
  { question: "Which option best completes the pattern?", options: ["A", "B", "C", "D"] },
  { question: "A can finish in 12 days, B in 8 days. Together they need:", options: ["4.8 days", "5 days", "6 days", "20 days"] },
  { question: "Simplify: (48 ÷ 6) × (5 + 1) =", options: ["48", "36", "60", "54"] },
  { question: "Odd one out:", options: ["Paris", "London", "Rome", "July"] },
  { question: "Number series: 1, 4, 9, 16, 25, ...", options: ["30", "32", "36", "49"] },
  { question: "If some A are B, and all B are C, then:", options: ["Some A are C", "All A are C", "No A are C", "Cannot say"] },
  { question: "Ratio: If A:B = 2:3 and B:C = 4:5, then A:C =", options: ["8:15", "2:5", "3:5", "4:9"] },
  { question: "Time-Speed: If 60 km in 1.5 h, speed is:", options: ["30 km/h", "40 km/h", "45 km/h", "50 km/h"] },
  { question: "Work: If A is twice as fast as B. Together finish in 12 days. A alone in:", options: ["18", "24", "20", "16"] },
  { question: "Calendar: If Jan 1 is Friday, Jan 8 is:", options: ["Friday", "Saturday", "Sunday", "Thursday"] },
  { question: "Direction: Turn right, right, left from North. Final direction:", options: ["East", "West", "South", "North"] },
  { question: "Permutation: Number of ways to arrange ABCD =", options: ["12", "24", "6", "8"] },
  { question: "Combination: Choose 2 from 5 distinct items:", options: ["10", "20", "5", "8"] },
  { question: "Probability: Fair die, P(even) =", options: ["1/2", "1/3", "2/3", "1/6"] },
  { question: "Simplify: 3/4 of 2/3 =", options: ["1/2", "1/4", "2/3", "3/8"] },
  { question: "Series: 5, 10, 20, 40, ...", options: ["60", "70", "80", "100"] },
  { question: "Analogy: Finger : Hand :: Leaf : ?", options: ["Tree", "Branch", "Root", "Flower"] },
  { question: "LCM of 8 and 12 =", options: ["12", "16", "24", "48"] },
  { question: "HCF of 18 and 24 =", options: ["3", "6", "12", "9"] },
  { question: "Simple interest on 1000 at 10% for 2 years:", options: ["100", "150", "200", "250"] },
  { question: "Train problem: Relative speed addition applies for:", options: ["Same direction", "Opposite direction", "Stationary", "Perpendicular"] },
  { question: "Odd one out:", options: ["Copper", "Iron", "Plastic", "Aluminum"] },
  { question: "Coding: If CAT → DBU, then MAT →", options: ["NBU", "NAT", "NBT", "LBU"] },
  { question: "Blood relation: Father's sister is:", options: ["Aunt", "Niece", "Cousin", "Grandmother"] },
  { question: "Venn: Animals, Mammals, Dogs. Dogs subset of:", options: ["Mammals", "Animals", "Both", "Neither"] },
  { question: "Series: 11, 13, 17, 19, ...", options: ["21", "23", "25", "27"] },
  { question: "Statement: No cats are dogs. Some dogs are pets. Then:", options: ["Some pets are cats", "No pets are cats", "Cannot say", "All pets are cats"] },
  { question: "Average of 4, 8, 10, 12 =", options: ["8", "9", "10", "11"] },
  { question: "Mixture: 2L water added to 8L juice; water % =", options: ["20%", "25%", "30%", "40%"] },
  { question: "Clock: Angle at 3:00 between hands:", options: ["0°", "90°", "180°", "270°"] },
  { question: "Counting: How many 90° angles in a rectangle:", options: ["1", "2", "3", "4"] },
  { question: "Cube faces count:", options: ["4", "5", "6", "8"] },
  { question: "If 7x = 63 then x =", options: ["7", "8", "9", "6"] },
  { question: "Simplify: 2^3 × 2^4 =", options: ["2^7", "2^12", "2^1", "16"] },
  { question: "Sequence: 1, 1, 2, 3, 5, 8, ...", options: ["8", "13", "21", "34"] },
  { question: "Percentage change: 80 → 100 is:", options: ["20%", "25%", "30%", "40%"] },
  { question: "Distance=Speed×Time. If D fixed, speed up implies time:", options: ["Up", "Down", "Same", "None"] },
  { question: "Area of rectangle 5×6:", options: ["11", "25", "30", "60"] },
  { question: "Median of [1,2,9,10,11]:", options: ["2", "9", "10", "11"] },
  { question: "Mode of [2,3,3,4]:", options: ["2", "3", "4", "None"] },
  { question: "Mean of [2,3,3,4]:", options: ["2.5", "3", "3.5", "4"] },
  { question: "If 20% of x is 30, x =", options: ["100", "120", "130", "150"] },
  { question: "Speed units: 36 km/h equals m/s:", options: ["10", "9", "8", "12"] },
  { question: "Work: If 3 workers = 6 days, 6 workers need:", options: ["2", "3", "4", "5"] },
  { question: "Series: 4, 7, 12, 19, 28, ...", options: ["37", "38", "39", "40"] },
  { question: "Odd one out:", options: ["Mercury", "Venus", "Mars", "Sirius"] },
  { question: "Analogy: Book : Reading :: Knife : ?", options: ["Cutting", "Eating", "Cooking", "Writing"] },
  { question: "Syllogism: All squares are rectangles. Some rectangles are red. Then:", options: ["Some squares may be red", "All squares are red", "No square is red", "Cannot say"] },
  { question: "Profit: CP=80, SP=100. Profit % =", options: ["20%", "25%", "30%", "40%"] },
  { question: "Discount: Marked 200, 10% discount. Price =", options: ["160", "170", "180", "190"] },
  { question: "Angles in triangle sum to:", options: ["90°", "120°", "180°", "360°"] },
  { question: "If x=5, value of x^2+2x+1:", options: ["25", "36", "49", "16"] },
  { question: "If 3x-4=11 then x =", options: ["5", "6", "7", "8"] },
  { question: "Prime test: 29 is:", options: ["Prime", "Composite", "Neither", "Even"] },
  { question: "LCM(6,9) =", options: ["9", "12", "18", "27"] },
  { question: "HCF(14,21) =", options: ["3", "7", "14", "21"] },
  { question: "Sequence: 10, 13, 18, 25, 34, ...", options: ["43", "44", "45", "46"] },
  { question: "Mean of first five natural numbers:", options: ["3", "3.5", "2.5", "4"] },
  { question: "Probability: coin toss P(heads) =", options: ["1", "1/2", "1/3", "1/4"] },
  { question: "Odd one out:", options: ["Hydrogen", "Oxygen", "Nitrogen", "Water"] },
  { question: "Which is larger?", options: ["0.5", "1/3", "0.25", "0.2"] },
  { question: "Square of 15:", options: ["215", "220", "225", "230"] },
  { question: "Cube of 3:", options: ["9", "18", "27", "36"] },
  { question: "Sequence: 2, 3, 5, 7, 11, ...", options: ["12", "13", "14", "15"] },
  { question: "Angles: Complementary sum:", options: ["45°", "60°", "90°", "180°"] },
  { question: "Angles: Supplementary sum:", options: ["90°", "120°,", "180°", "270°"] },
  { question: "If 25% of y is 10, y =", options: ["20", "30", "40", "50"] },
  { question: "If perimeter of square is 40, side =", options: ["4", "8", "10", "12"] },
  { question: "Area of circle with r=7 (use 22/7):", options: ["77", "132", "154", "308"] },
  { question: "Time zone: If IST is UTC+5:30, UTC noon is IST:", options: ["5:30 pm", "5:30 am", "11:30 am", "12:30 pm"] },
  { question: "Series: 1, 2, 4, 8, 16, ...", options: ["20", "24", "30", "32"] },
  { question: "Odd one out:", options: ["Dog", "Cat", "Cow", "Sparrow"] },
  { question: "Analogy: Ear : Hear :: Eye :", options: ["See", "Watch", "Look", "View"] },
  { question: "If x:y=3:5 and y=20, x =", options: ["10", "12", "15", "18"] },
  { question: "If SP=120 and profit 20%, CP =", options: ["80", "90", "95", "100"] },
  { question: "Speed: 90 km in 2 h, speed =", options: ["40", "45", "50", "60"] },
  { question: "Mixture: 3 parts A to 2 parts B. % of A =", options: ["40%", "50%", "60%", "70%"] },
  { question: "Syllogism: No pens are pencils. All pencils are tools. Then:", options: ["No pens are tools", "Some tools are pens", "No conclusion", "All tools are pens"] },
  { question: "Series: 6, 11, 18, 27, ...", options: ["36", "37", "38", "39"] },
  { question: "Average of 12 and 18:", options: ["12", "14", "15", "16"] },
  { question: "If 2x+3=11 then x =", options: ["3", "4", "5", "6"] },
  { question: "Which fraction is largest?", options: ["1/2", "2/3", "3/5", "4/9"] },
  { question: "Square root of 81:", options: ["7", "8", "9", "10"] },
  { question: "90% of 200 =", options: ["160", "170", "180", "190"] },
  { question: "Opposite of 'ascend':", options: ["Rise", "Grow", "Climb", "Descend"] },
  { question: "Synonym of 'rapid':", options: ["Fast", "Slow", "Calm", "Weak"] },
  { question: "Antonym of 'transparent':", options: ["Clear", "Opaque", "Lucid", "Crystal"] },
  { question: "Series: 9, 7, 8, 6, 7, 5, ...", options: ["4", "5", "6", "7"] },
  { question: "Work: If 4 men do it in 12 days, 6 men need:", options: ["6", "7", "8", "9"] },
  { question: "If 0.2 × x = 10, x =", options: ["20", "30", "40", "50"] },
  { question: "If perimeter of rectangle 2(l+w)=30 and l=10, w =", options: ["3", "4", "5", "6"] },
  { question: "Which is a prime?", options: ["21", "27", "31", "33"] },
];

// Personality Test (100 items) Likert 4-point
const personalityBank100 = [
  { question: "I feel energized after social gatherings.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer planning before acting.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy abstract, theoretical discussions.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Deadlines motivate me to perform better.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I make decisions primarily using logic over feelings.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I adapt quickly when plans change unexpectedly.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I notice small details others often miss.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I am comfortable taking the lead in groups.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer hands-on tasks to reading manuals first.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I reflect deeply before sharing my opinion.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // ... include the remaining 90 items from your earlier bank; kept identical structure
];

// General (50)
const generalBank = [
  { question: "When starting a new project, what's your first move?", options: ["Jump right in", "Plan and schedule", "Brainstorm with team", "Research first"] },
  { question: "Which work environment suits you best?", options: ["Dynamic startup", "Organized corporate", "Creative studio", "Quiet research lab"] },
  // ... fill to 50 as in your current set
];

// Academics (50)
const academicsBank = [
  { question: "Favorite subject group?", options: ["STEM", "Humanities", "Arts", "Business"] },
  { question: "Study preference:", options: ["Hands-on", "Reading", "Group discussion", "Lectures"] },
  // ... fill to 50 as in your current set
];

/* ===========================
   Utilities
   =========================== */

function sampleQuestions(bank, k) {
  const arr = bank.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, k);
}

/* ===========================
   Component
   =========================== */

export const QuizPage = ({ navigateTo }) => {
  const [quizStage, setQuizStage] = useState('landing'); // 'landing', 'psychometricOptions', 'taking', 'loading', 'results'
  const [activeQuiz, setActiveQuiz] = useState(null); // { type, title }
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

  // Start quiz: sample 20 from the right bank
  const startQuiz = (quizType) => {
    let bank;
    let title;
    switch (quizType) {
      case 'aptitude':
        bank = aptitudeBank100;
        title = 'Aptitude Test';
        break;
      case 'personality':
        bank = personalityBank100;
        title = 'Personality Test';
        break;
      case 'general':
        bank = generalBank;
        title = 'General Personalized Quiz';
        break;
      case 'academics':
        bank = academicsBank;
        title = 'Academics-Based Quiz';
        break;
      default:
        bank = generalBank;
        title = 'General Personalized Quiz';
    }
    setActiveQuiz({ type: quizType, title });
    setActiveQuestions(sampleQuestions(bank, 20));
    setQuizStage('taking');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizResults(null);
    setError('');
  };

  const handleAnswerSelect = (answer) => {
    const q = activeQuestions[currentQuestionIndex];
    const newAnswers = [...answers, { question: q.question, answer }];
    setAnswers(newAnswers);
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      getCareerSuggestions(newAnswers);
    }
  };

  // Backend call with resilient parsing
  const getCareerSuggestions = async (finalAnswers) => {
    setQuizStage('loading');
    setError('');
    try {
      const resp = await fetch(`${BACKEND_BASE_URL}/api/quiz/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 'default_user',
          answers: finalAnswers.map((item) => ({
            question: item.question,
            answer: item.answer,
          })),
        }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => '');
        throw new Error(`Backend error ${resp.status}: ${text || resp.statusText}`);
      }

      const data = await resp.json();

      // 1) Direct contract
      if (data && data.success && Array.isArray(data.results)) {
        const safe = data.results
          .filter((r) => r && typeof r === 'object')
          .map((r) => ({
            careerName: String(r.careerName || 'Career'),
            reason: String(r.reason || 'No explanation provided.'),
          }));
        if (safe.length > 0) {
          setQuizResults(safe);
          setQuizStage('results');
          return;
        }
      }

      // 2) Other object shapes
      if (data && typeof data === 'object') {
        const fromRecs = Array.isArray(data.recommendations) ? data.recommendations : [];
        const normalizedFromRecs = fromRecs.map((r) => ({
          careerName: String(r.careerName || r.careerTitle || r.title || 'Career'),
          reason: String(
            r.reason ||
              (Array.isArray(r.matchReasons) ? r.matchReasons.join('; ') : '') ||
              r.explanation ||
              r.details ||
              'No explanation provided.'
          ),
        }));
        if (normalizedFromRecs.length > 0) {
          setQuizResults(normalizedFromRecs);
          setQuizStage('results');
          return;
        }
      }

      // 3) Try embedded array in raw text
      const rawText =
        typeof data?.raw_response === 'string'
          ? data.raw_response
          : typeof data === 'string'
          ? data
          : JSON.stringify(data || {});
      const arrayMatch = rawText.match(/\[\s*\{[\s\S]*?\}\s*\]/);
      if (arrayMatch) {
        try {
          const arr = JSON.parse(arrayMatch[0]);
          if (Array.isArray(arr)) {
            const normalized = arr
              .filter((r) => r && typeof r === 'object')
              .map((r) => ({
                careerName: String(r.careerName || r.careerTitle || r.title || 'Career'),
                reason: String(
                  r.reason ||
                    (Array.isArray(r.matchReasons) ? r.matchReasons.join('; ') : '') ||
                    r.explanation ||
                    r.details ||
                    'No explanation provided.'
                ),
              }));
            if (normalized.length > 0) {
              setQuizResults(normalized);
              setQuizStage('results');
              return;
            }
          }
        } catch {
          // continue
        }
      }

      // 4) Last-chance key-pair scan
      const pairs = [];
      const pairRegex = /\{\s*["']?careerName["']?\s*:\s*["']([^"']+)["']\s*,\s*["']?reason["']?\s*:\s*["']([^"']+)["']/g;
      let m;
      while ((m = pairRegex.exec(rawText)) !== null) {
        pairs.push({ careerName: m[1].trim(), reason: m[2].trim() });
      }
      if (pairs.length > 0) {
        setQuizResults(pairs);
        setQuizStage('results');
        return;
      }

      throw new Error(data?.error || 'Could not parse career suggestions.');
    } catch (err) {
      console.error('Quiz analyze call failed', err);
      setError('Sorry, we could not generate your career suggestions. Please try the quiz again.');
      setQuizResults(null);
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
          <p className="quiz-results-subtitle">Based on your answers from the {activeQuiz?.title}, here are a few career paths that might be a great fit for you.</p>
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
          <button onClick={() => startQuiz(activeQuiz?.type || 'general')} className="retake-quiz-btn">Take Quiz Again</button>
        </div>
      )}
    </div>
  );
};
