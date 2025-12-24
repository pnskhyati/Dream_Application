/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

export const LandingPage = ({ navigateTo }) => {
    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="landing-title">Dream</h1>
                <h2 className="landing-subtitle">Personalized Career and Skills Advisor</h2>
                <p className="landing-description">
                    Discover your perfect career path with AI-powered insights tailored to your unique
                    skills and passions
                </p>
                <button className="get-started-btn" onClick={() => navigateTo('login')}>
                    Get Started
                </button>
            </div>
            <div className="landing-features">
                <div className="feature-highlight-card">
                    <h3>AI-Powered</h3>
                    <p>Smart recommendations based on your skills and interests</p>
                </div>
                <div className="feature-highlight-card">
                    <h3>Personalized</h3>
                    <p>Tailored career paths that match your unique profile</p>
                </div>
                <div className="feature-highlight-card">
                    <h3>Future-Ready</h3>
                    <p>Stay ahead with insights into emerging career opportunities</p>
                </div>
            </div>
        </div>
    );
};