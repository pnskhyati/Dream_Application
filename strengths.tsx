import React, { useState } from 'react';
import { ai } from './common';
import { Type } from "@google/genai";


// ====== PROFILE QUESTIONS ======
const profileQuestions = [
  "What is your current situation? (e.g., student, working professional, job seeker)",
  "What is your educational background? (degrees, majors, certifications)",
  "What kind of work experience do you have? (internships, projects, roles, industry)",
  "What are your main interests or passions? (things you enjoy learning or doing)",
  "Which career fields or roles are you most curious about?",
  "What is your primary career goal? (find a job, upskill, career switch, pursue higher studies)"
];

// ====== RESULT COMPONENTS ======
const SkillGapResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#7c4dff" }}>Skill Gap Analysis</h2>
    <ul>
      {(data?.missingSkills || []).map((s, i) => (
        <li key={i}><b>{s.name}:</b> {s.description}</li>
      ))}
    </ul>
    <h4>Improvement Roadmap</h4>
    <ul>
      {(data?.improvementRoadmap || []).map((s, i) => (
        <li key={i}><b>{s.name}</b> — {s.description}</li>
      ))}
    </ul>
  </div>
);

const InternshipGuideResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#2962ff" }}>Internship Guide</h2>
    <ul>
      {(data?.availableInternRoles || []).map((r, i) => (
        <li key={i}><b>{r.name}:</b> {r.description}</li>
      ))}
    </ul>
    <h4>Preparation Roadmap</h4>
    <ul>
      {(data?.preparationRoadmap || []).map((r, i) => (
        <li key={i}><b>{r.title}</b> — {r.description}</li>
      ))}
    </ul>
  </div>
);

const CareerTransitionResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#0288d1" }}>Career Transition</h2>
    <h4>Potential New Fields</h4>
    <ul>
      {(data?.newFields || []).map((f, i) => (
        <li key={i}><b>{f.name}</b>: {f.description}</li>
      ))}
    </ul>
    <h4>Transferable Skills</h4>
    <ul>
      {(data?.transferableSkills || []).map((s, i) => (
        <li key={i}><b>{s.name}:</b> {s.description}</li>
      ))}
    </ul>
    <h4>Recommended Learning Paths</h4>
    <ul>
      {(data?.recommendedLearningPaths || []).map((l, i) => (
        <li key={i}><b>{l.name}</b>: {l.description}</li>
      ))}
    </ul>
    <h4>Transition Roles</h4>
    <ul>
      {(data?.transitionRoles || []).map((tr, i) => (
        <li key={i}><b>{tr.name}</b>: {tr.description}</li>
      ))}
    </ul>
    <h4>Certifications</h4>
    <ul>
      {(data?.certifications || []).map((c, i) => (
        <li key={i}><b>{c.name}</b>: {c.description}</li>
      ))}
    </ul>
  </div>
);

const CertificateRecommenderResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#00838f" }}>Certificate Recommendations</h2>
    <ul>
      {(data?.recommendedCourses || []).map((c, i) => (
        <li key={i}><b>{c.name}</b> ({c.provider}): {c.description}</li>
      ))}
    </ul>
    <h4>Course Links</h4>
    <ul>
      {(data?.courseLinks || []).map((c, i) => (
        <li key={i}><a href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a></li>
      ))}
    </ul>
    <h4>Key Skills</h4>
    <ul>
      {(data?.keySkills || []).map((ks, i) => (
        <li key={i}><b>{ks.skill}:</b> from {ks.course}</li>
      ))}
    </ul>
    <h4>Provider Summary</h4>
    <ul>
      {(data?.providerSummary || []).map((p, i) => (
        <li key={i}><b>{p.provider}:</b> {p.summary}</li>
      ))}
    </ul>
  </div>
);

const CompetitionResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#6a1b9a" }}>Competitions & Hackathons</h2>
    <ul>
      {(data?.upcomingHackathonsAndCompetitions || []).map((c, i) => (
        <li key={i}>
          <b>{c.name}</b>: {c.description} {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer">[Link]</a>}
        </li>
      ))}
    </ul>
    <h4>Other Competitions</h4>
    <ul>
      {(data?.otherCompetitions || []).map((c, i) => (
        <li key={i}><b>{c.name}</b>: {c.description}</li>
      ))}
    </ul>
    <h4>Preparation Tips</h4>
    <ul>
      {(data?.preparationTips || []).map((t, i) => (
        <li key={i}><b>{t.name || t.tip}</b>{t.description && `: ${t.description}`}</li>
      ))}
    </ul>
  </div>
);

const GraduateAdvisorResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#43a047" }}>Graduate Programs & Scholarships</h2>
    <ul>
      {(data?.graduatePrograms || []).map((p, i) => (
        <li key={i}><b>{p.name}</b>: {p.description}</li>
      ))}
    </ul>
    <h4>Scholarships</h4>
    <ul>
      {(data?.scholarships || []).map((s, i) => (
        <li key={i}><b>{s.name}</b>: {s.description}</li>
      ))}
    </ul>
    <h4>Eligibility</h4>
    <ul>
      {(data?.eligibility || []).map((e, i) => (
        <li key={i}><b>{e.criteria}</b>: {e.details}</li>
      ))}
    </ul>
    <h4>Application Tips</h4>
    <ul>
      {(data?.applicationTips || []).map((t, i) => (
        <li key={i}><b>{t.tip}</b>: {t.reason}</li>
      ))}
    </ul>
    <h4>Deadlines</h4>
    <ul>
      {(data?.deadlines || []).map((d, i) => (
        <li key={i}><b>{d.programOrScholarship}</b>: {d.date}</li>
      ))}
    </ul>
    <h4>Industry Growth</h4>
    <ul>
      {(data?.industryGrowth || []).map((ig, i) => (
        <li key={i}><b>{ig.trend}</b>: {ig.description}</li>
      ))}
    </ul>
    <h4>Future Trends</h4>
    <ul>
      {(data?.futureTrends || []).map((ft, i) => (
        <li key={i}><b>{ft.trend}</b>: {ft.description}</li>
      ))}
    </ul>
  </div>
);

const HiringInsightsResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#fb8c00" }}>Hiring Insights</h2>
    <ul>
      {(data?.hiringCompanies || []).map((c, i) => (
        <li key={i}><b>{c.name}:</b> {c.description}</li>
      ))}
    </ul>
    <h4>Hiring Domains</h4>
    <ul>
      {(data?.hiringDomains || []).map((d, i) => (
        <li key={i}><b>{d.name}</b>: {d.description}</li>
      ))}
    </ul>
    <h4>Typical Roles</h4>
    <ul>
      {(data?.typicalRoles || []).map((r, i) => (
        <li key={i}><b>{r.name}</b>: {r.description}</li>
      ))}
    </ul>
    <h4>Emerging Roles</h4>
    <ul>
      {(data?.emergingRoles || []).map((e, i) => (
        <li key={i}><b>{e.name}</b>: {e.description}</li>
      ))}
    </ul>
  </div>
);

const JobFitResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#d81b60" }}>Recommended Job Roles</h2>
    <ul>
      {(data?.recommendedJobRoles || []).map((r, i) => (
        <li key={i}><b>{r.name}:</b> {r.description}</li>
      ))}
    </ul>
    <h4>Suitable Industries</h4>
    <ul>
      {(data?.suitableIndustries || []).map((ind, i) => (
        <li key={i}><b>{ind.name}</b>: {ind.description}</li>
      ))}
    </ul>
    <h4>Alignment Summary</h4>
    <ul>
      {(data?.alignmentSummary || []).map((a, i) => (
        <li key={i}>{a}</li>
      ))}
    </ul>
    <h4>Improvement Suggestions</h4>
    <ul>
      {(data?.improvementSuggestions || []).map((s, i) => (
        <li key={i}><b>{s.name || s.suggestion}</b>: {s.description}</li>
      ))}
    </ul>
    <h4>Industry Growth</h4>
    <ul>
      {(data?.industryGrowth || []).map((ig, i) => (
        <li key={i}><b>{ig.trend}</b>: {ig.description}</li>
      ))}
    </ul>
    <h4>Future Trends</h4>
    <ul>
      {(data?.futureTrends || []).map((ft, i) => (
        <li key={i}><b>{ft.trend}</b>: {ft.description}</li>
      ))}
    </ul>
  </div>
);

const MentalHealthResult = ({ data }) => (
  <div>
    <h2 style={{ color: "#6a1b9a" }}>Motivational Messages</h2>
    <ul>
      {(data?.motivationalMessages || []).map((m, i) => (
        <li key={i}><b>{m.message}</b><br /><span>{m.description}</span></li>
      ))}
    </ul>
    <h4>Practical Tips</h4>
    <ul>
      {(data?.practicalTips || []).map((t, i) => (
        <li key={i}><b>{t.tip}</b>: {t.description}</li>
      ))}
    </ul>
    <h4>Career Advice Summary</h4>
    <ul>
      {(data?.careerAdviceSummary || []).map((a, i) => (
        <li key={i}><b>{a.advice}</b>: {a.description}</li>
      ))}
    </ul>
  </div>
);

// ====== FULL SCHEMA FOR GEMINI ======
const fullSchema = {
  type: Type.OBJECT,
  properties: {
    skill_gap_analyzer: { type: Type.OBJECT, nullable: true, description: "Analysis of missing skills for a target role.", properties: {
        missingSkills: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        improvementRoadmap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
    }},
    internship_guide: { type: Type.OBJECT, nullable: true, description: "Internship recommendations and preparation tips.", properties: {
        availableInternRoles: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        preparationRoadmap: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, description: { type: Type.STRING } } } },
    }},
    career_transition: { type: Type.OBJECT, nullable: true, description: "Advice for changing careers.", properties: {
        newFields: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        transferableSkills: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        recommendedLearningPaths: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        transitionRoles: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        certifications: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
    }},
    certificate_recommender: { type: Type.OBJECT, nullable: true, description: "Course and certificate suggestions.", properties: {
        recommendedCourses: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, provider: { type: Type.STRING }, description: { type: Type.STRING } } } },
        courseLinks: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, url: { type: Type.STRING } } } },
        keySkills: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { skill: { type: Type.STRING }, course: { type: Type.STRING } } } },
        providerSummary: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { provider: { type: Type.STRING }, summary: { type: Type.STRING } } } },
    }},
    competition_recommender: { type: Type.OBJECT, nullable: true, description: "Relevant competitions and hackathons.", properties: {
        upcomingHackathonsAndCompetitions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, link: { type: Type.STRING, nullable: true } } } },
        otherCompetitions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        preparationTips: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { tip: { type: Type.STRING }, name: { type: Type.STRING, nullable: true }, description: { type: Type.STRING, nullable: true } } } },
    }},
    graduate_advisor: { type: Type.OBJECT, nullable: true, description: "Advice on higher education and scholarships.", properties: {
        graduatePrograms: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        scholarships: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        eligibility: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { criteria: { type: Type.STRING }, details: { type: Type.STRING } } } },
        applicationTips: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { tip: { type: Type.STRING }, reason: { type: Type.STRING } } } },
        deadlines: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { programOrScholarship: { type: Type.STRING }, date: { type: Type.STRING } } } },
        industryGrowth: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { trend: { type: Type.STRING }, description: { type: Type.STRING } } } },
        futureTrends: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { trend: { type: Type.STRING }, description: { type: Type.STRING } } } },
    }},
    hiring_insights: { type: Type.OBJECT, nullable: true, description: "Information on companies and roles.", properties: {
        hiringCompanies: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        hiringDomains: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        typicalRoles: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        emergingRoles: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
    }},
    job_fit_analyzer: { type: Type.OBJECT, nullable: true, description: "General career recommendations, finding suitable roles/industries.", properties: {
        recommendedJobRoles: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        suitableIndustries: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } } } },
        alignmentSummary: { type: Type.ARRAY, items: { type: Type.STRING } },
        improvementSuggestions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING, nullable: true }, suggestion: { type: Type.STRING, nullable: true }, description: { type: Type.STRING } } } },
        industryGrowth: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { trend: { type: Type.STRING }, description: { type: Type.STRING } } } },
        futureTrends: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { trend: { type: Type.STRING }, description: { type: Type.STRING } } } },
    }},
    mental_health_supporter: { type: Type.OBJECT, nullable: true, description: "Motivational and practical tips for the job search.", properties: {
        motivationalMessages: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { message: { type: Type.STRING }, description: { type: Type.STRING } } } },
        practicalTips: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { tip: { type: Type.STRING }, description: { type: Type.STRING } } } },
        careerAdviceSummary: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { advice: { type: Type.STRING }, description: { type: Type.STRING } } } },
    }},
  }
};


// ====== MAIN COMPONENT ======
export const StrengthsFinderPage = ({ navigateTo }) => {
  const [profile, setProfile] = useState({});
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [userQuery, setUserQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Profile answering + skipping logic
  const handleProfileNext = () => {
    if (!input.trim()) { setError('Please provide a valid answer or use Skip.'); return; }
    setProfile({ ...profile, [profileQuestions[step]]: input.trim() });
    setInput(''); setStep(step + 1); setError('');
  };

  const handleProfileSkip = () => {
    setProfile({ ...profile, [profileQuestions[step]]: "Skipped" });
    setInput(''); setStep(step + 1); setError('');
  };

  // Restart logic
  const handleRestart = () => {
    setProfile({}); setInput(''); setStep(0); setUserQuery(''); setResult(null); setError(''); setLoading(false);
  };

  // Query submission with Gemini API
  const handleSubmitQuery = async () => {
    if (!userQuery.trim()) return setError('Type a question to get personalized results.');
    
    setError('');
    setLoading(true);
    setResult(null);

    const prompt = `
        You are an expert, multi-disciplinary career advisor. A user has provided their profile and a specific query. Your task is to act as a multi-tool agent and respond with the most relevant advice in a structured JSON format.

        **User Profile:**
        ${JSON.stringify(profile, null, 2)}

        **User Query:**
        "${userQuery}"

        **Instructions:**
        1. Analyze the user's profile and query to understand their core need.
        2. Based on their need, select one or more of the most relevant tools from the list below to generate a response.
        3. Populate the corresponding fields in the provided JSON schema.
        4. Only include keys in the final JSON for the tools you use. If a tool is not relevant, omit its key.
        5. Provide high-quality, actionable, and specific advice.

        **Available Tools:**
        -   **job_fit_analyzer**: Use for general career recommendations, finding suitable roles/industries.
        -   **skill_gap_analyzer**: Use when the user wants to compare their skills against a specific job or needs an improvement plan.
        -   **internship_guide**: Use for students or career changers looking for internships.
        -   **career_transition**: Use for professionals looking to switch careers.
        -   **certificate_recommender**: Use when the user asks for courses or certifications.
        -   **competition_recommender**: Use for finding hackathons or competitions.
        -   **graduate_advisor**: Use for advice on higher studies, masters, PhDs, or scholarships.
        -   **hiring_insights**: Use for information on which companies are hiring, market trends, etc.
        -   **mental_health_supporter**: Use for motivational advice or tips on handling job search stress.

        Respond ONLY with the JSON object that conforms to the schema.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema: fullSchema },
        });
        const parsedResult = JSON.parse(response.text);
        if (Object.keys(parsedResult).length === 0) {
          // If Gemini returns an empty object, it means it couldn't find a relevant tool.
          throw new Error("Gemini returned no relevant tools.");
        }
        setResult(parsedResult);
    } catch (err) {
        console.error('Gemini API call failed:', err);
        setError("We couldn't get a personalized response from the AI. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  // UI Rendering
  return (
    <div style={{ padding: "40px", background: "linear-gradient(135deg, #e0f7fa 0%, #d1c4e9 100%)", minHeight: "100vh", position: "relative" }}>
      <button onClick={() => navigateTo('dashboard')} className="back-button" aria-label="Go back" style={{ position: 'absolute', top: '40px', left: '40px' }}>← Back</button>
      <h1 style={{ marginBottom: '0.5em', fontWeight: 700, textAlign: 'center' }}>Skill Recommender Career Advisor</h1>
      {step < profileQuestions.length ? (
        <div style={{
          padding: '40px 38px', background: '#fff', borderRadius: '10px',
          boxShadow: '0 2px 12px #e5e5ec', maxWidth: '800px', margin: 'auto'
        }}>
          <h2>Profile Builder</h2>
          <div style={{ margin: '14px 0', fontSize: '1.12em' }}>
            <strong>Step {step + 1}</strong> of {profileQuestions.length}
          </div>
          <label>{profileQuestions[step]}</label><br />
          <input
            type="text"
            value={input}
            style={{ margin: '12px 0', padding: '8px', width: "320px", borderRadius: "5px", border: "1px solid #b2b2b2" }}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => (e.key === "Enter" ? handleProfileNext() : null)}
            placeholder="Enter your answer here..."
            autoFocus
          />
          <button
            style={{ marginLeft: '14px', padding: '8px 22px', background: 'linear-gradient(90deg, #8A2BE2, #6A5ACD)', color: '#fff', borderRadius: '5px', border: 'none', fontWeight: 500, cursor: 'pointer' }}
            onClick={handleProfileNext}
          >Next</button>
          <button
            style={{ marginLeft: '12px', padding: '8px 18px', background: 'linear-gradient(90deg, #8A2BE2, #6A5ACD)', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            onClick={handleProfileSkip}
          >Skip</button>
          {error && <div style={{ color: 'red', marginTop: '8px' }}>{error}</div>}
        </div>
      ) : (
        <div>
          <div style={{
            padding: "28px 36px", background: "#fafaff", borderRadius: "10px",
            marginBottom: "32px", boxShadow: "0 2px 8px #f1ebeb"
          }}>
            <h2>Profile Summary</h2>
            <ul>
              {profileQuestions.map(q => (
                <li key={q}><b>{q.split('?')[0]}:</b> {profile[q]}</li>
              ))}
            </ul>
          </div>
          <div style={{ marginBottom: "2em" }}>
            <label><b>Ask a career or skill question:</b></label>
            <input
              type="text"
              style={{ marginLeft: '16px', padding: '8px', width: "290px", borderRadius: "5px" }}
              value={userQuery}
              onChange={e => setUserQuery(e.target.value)}
              placeholder="e.g., What are the top hackathons for mechanical engineers?"
              disabled={loading}
            />
            <button
              style={{ marginLeft: '14px', padding: '8px 22px', background: 'linear-gradient(90deg, #8A2BE2, #6A5ACD)', color: '#fff', borderRadius: '5px', border: 'none', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer' }}
              onClick={handleSubmitQuery}
              disabled={loading}
            >{loading ? 'Loading...' : 'Get Recommendations'}</button>
            <button
              style={{
                marginLeft: '14px', padding: '8px 22px', background: 'linear-gradient(90deg, #f87171, #ef4444)',
                color: '#fff', borderRadius: '5px', border: 'none', fontWeight: 500, cursor: 'pointer'
              }}
              onClick={handleRestart}
              disabled={loading}
            >Restart</button>
          </div>
          {error && <div className="error-message" style={{marginBottom: '1em'}}>{error}</div>}
          {loading && <div className="loader"></div>}
          {result && !loading && (
            <div>
              {result['skill_gap_analyzer'] && (
                <div style={{ padding: "24px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #7c4dff", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <SkillGapResult data={result['skill_gap_analyzer']} />
                </div>
              )}
              {result['internship_guide'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #2962ff", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <InternshipGuideResult data={result['internship_guide']} />
                </div>
              )}
              {result['career_transition'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #0288d1", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <CareerTransitionResult data={result['career_transition']} />
                </div>
              )}
              {result['certificate_recommender'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #00838f", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <CertificateRecommenderResult data={result['certificate_recommender']} />
                </div>
              )}
              {result['competition_recommender'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #6a1b9a", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <CompetitionResult data={result['competition_recommender']} />
                </div>
              )}
              {result['graduate_advisor'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #43a047", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <GraduateAdvisorResult data={result['graduate_advisor']} />
                </div>
              )}
              {result['hiring_insights'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #fb8c00", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <HiringInsightsResult data={result['hiring_insights']} />
                </div>
              )}
              {result['job_fit_analyzer'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #d81b60", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <JobFitResult data={result['job_fit_analyzer']} />
                </div>
              )}
              {result['mental_health_supporter'] && (
                <div style={{ padding: "23px", borderRadius: "8px", marginBottom: "30px", background: "#ffffff", borderLeft: "7px solid #6a1b9a", boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                  <MentalHealthResult data={result['mental_health_supporter']} />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};