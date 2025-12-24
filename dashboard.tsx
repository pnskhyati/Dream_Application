
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { BookIcon, PencilIcon, PlusIcon, DocumentIcon, LaptopIcon, HeartIconSolid } from './common';
import { auth } from './firebaseConfig';
import { signOut } from "firebase/auth";

export const Dashboard = ({ navigateTo }) => {
  const handleSignOut = async () => {
      try {
          await signOut(auth);
          navigateTo('landing'); // Or let auth listener handle it
      } catch (error) {
          console.error("Error signing out:", error);
      }
  };

  return (
    <div className="dashboard-container">
      <div className="content-wrapper">
        <header className="header">
          {/* Hidden spacer to balance the header if back button is removed, or keep back button functionality if needed */}
           <div style={{width: '80px'}}></div> 
          
          <h1 className="header-title">Dream</h1>
          
          <button
            onClick={handleSignOut}
            className="back-button"
            aria-label="Sign Out"
            style={{ textAlign: 'right', color: '#6A5ACD' }}
          >
            Sign Out
          </button>
        </header>

        <main className="main-content">
          <section className="welcome-section">
            <h2>Welcome! What would you like to do?</h2>
            <p>Choose a tool below to start your career journey.</p>
          </section>

          <div className="main-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div className="tool-card large-card">
              <div className="card-header">
                <div className="card-icon-wrapper"><BookIcon /></div>
                <h3>Explore Courses</h3>
              </div>
              <p className="card-description">
                Dive deep into various courses, compare them, and find the perfect fit for you.
              </p>
              <button className="button primary" onClick={() => navigateTo('filter')}>Explore Now</button>
            </div>
            <div className="tool-card large-card">
              <div className="card-header">
                <div className="card-icon-wrapper"><PencilIcon /></div>
                <h3>Take a Quiz</h3>
              </div>
              <p className="card-description">
                Answer a few questions to find career paths that match your personality and skills.
              </p>
              <button className="button primary" onClick={() => navigateTo('quiz')}>Take Quiz</button>
            </div>
            <div className="tool-card large-card">
                <div className="card-header">
                    <div className="card-icon-wrapper" style={{ color: '#e0245e' }}><HeartIconSolid /></div>
                    <h3>My Wishlist</h3>
                </div>
                <p className="card-description">
                    View and manage your saved courses and career paths.
                </p>
                <button className="button primary" onClick={() => navigateTo('wishlist')}>View Wishlist</button>
            </div>
          </div>

          <section className="ai-tools-section">
            <h2>AI-Powered Tools</h2>
            <div className="ai-cards-grid">
              <div className="tool-card">
                <div className="card-header">
                  <div className="card-icon-wrapper"><PlusIcon /></div>
                  <h3>AI Career Advisor</h3>
                </div>
                <p className="card-description">Get personalized career advice and analyze your fit for specific job roles.</p>
                <button className="button primary" onClick={() => navigateTo('strengths')}>Start Advising</button>
              </div>
              <div className="tool-card">
                <div className="card-header">
                  <div className="card-icon-wrapper"><DocumentIcon /></div>
                  <h3>AI Resume Analyzer</h3>
                </div>
                <p className="card-description">Get your resume analyzed for a target job and receive an improved version from AI.</p>
                <button className="button primary" onClick={() => navigateTo('resumeAnalyzer')}>Analyze Resume</button>
              </div>
              <div className="tool-card">
                <div className="card-header">
                  <div className="card-icon-wrapper"><LaptopIcon /></div>
                  <h3>AI Prep Hub</h3>
                </div>
                <p className="card-description">Practice mock interviews, test your skills, and get ready for your dream job.</p>
                <button className="button primary" onClick={() => navigateTo('aiPrepHub')}>Start Prepping</button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className="fab-container">
        <div className="fab" role="button" aria-label="Open AI Assistant">
          <svg xmlns="http://www.w3.org/2000/svg" className="fab-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,3C16.42,3 20,4.34 20,6C20,7.66 16.42,9 12,9C7.58,9 4,7.66 4,6C4,4.34 7.58,3 12,3M13,9.5V12.5H15.65C15.22,13.34 14.5,14 12,14C8.45,14 6.5,12.5 6.5,12.5V10.5C6.5,10.5 8.45,9 12,9C12.35,9 12.68,9.04 13,9.1V9.5M17.5,10.5C17.5,10.5 19.55,12 19.55,14C19.55,16 17.5,17.5 17.5,17.5C17.5,17.5 15.45,16 15.45,14C15.45,12 17.5,10.5 17.5,10.5M10.35,14.5H13.65C13.8,15.22 14.25,15.82 14.88,16.25L13,18V21H11V18L9.12,16.25C9.75,15.82 10.2,15.22 10.35,14.5Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
