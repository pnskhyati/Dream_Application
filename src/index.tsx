
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { LandingPage } from './landing';
import { LoginPage } from './login';
import { SignUpPage } from './signup';
import { ForgotPasswordPage } from './forgotPassword';
import { Dashboard } from './dashboard';
import { Filter } from './filter';
import { AnalysisPage } from './analysis';
import { StrengthsFinderPage } from './strengths';
import { ResumeAnalyzerPage } from './resumeAnalyzer';
import { AIPrepHubPage } from './aiPrepHub';
import { QuizPage } from './quiz';
import { WishlistPage } from './wishlist';
import { auth } from './firebaseConfig';

const App = () => {
  const [page, setPage] = useState('landing');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using Firebase v8 SDK syntax for auth state listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      if (currentUser) {
        // If user is logged in and on an auth page, redirect to dashboard
        if (['login', 'signup', 'forgotPassword'].includes(page)) {
          setPage('dashboard');
        }
      } else {
        // If user is not logged in and on a protected page, redirect to login
        // Landing page is public
        if (!['landing', 'login', 'signup', 'forgotPassword'].includes(page)) {
          setPage('login');
        }
      }
    });

    return () => unsubscribe();
  }, [page]);

  const navigateTo = (targetPage) => {
    setPage(targetPage);
  };

  const selectCourseAndNavigate = (course) => {
    setSelectedCourse(course);
    setPage('analysis');
  }

  if (loading) {
    return <div className="login-container"><div className="loader"></div></div>;
  }

  return (
    <>
      {page === 'landing' && <LandingPage navigateTo={navigateTo} />}
      {page === 'login' && <LoginPage navigateTo={navigateTo} />}
      {page === 'signup' && <SignUpPage navigateTo={navigateTo} />}
      {page === 'forgotPassword' && <ForgotPasswordPage navigateTo={navigateTo} />}
      {page === 'dashboard' && <Dashboard navigateTo={navigateTo} />}
      {page === 'filter' && <Filter navigateTo={navigateTo} selectCourseAndNavigate={selectCourseAndNavigate} />}
      {page === 'analysis' && <AnalysisPage navigateTo={navigateTo} course={selectedCourse} user={user} />}
      {page === 'strengths' && <StrengthsFinderPage navigateTo={navigateTo} />}
      {page === 'resumeAnalyzer' && <ResumeAnalyzerPage navigateTo={navigateTo} />}
      {page === 'aiPrepHub' && <AIPrepHubPage navigateTo={navigateTo} />}
      {page === 'quiz' && <QuizPage navigateTo={navigateTo} />}
      {page === 'wishlist' && <WishlistPage navigateTo={navigateTo} selectCourseAndNavigate={selectCourseAndNavigate} user={user} />}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
