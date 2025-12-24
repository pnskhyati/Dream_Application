/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

export const Filter = ({ navigateTo, selectCourseAndNavigate }) => {
  const careerData = [
    { name: 'MBA', sub: 'Master of Business Administration', initial: 'M', color: 'bg-mba' },
    { name: 'B.TECH', sub: 'Bachelor of Technology', initial: 'B', color: 'bg-btech' },
    { name: 'FINE ARTS', sub: 'Creative Arts & Design', initial: 'F', color: 'bg-fine-arts' },
    { name: 'DESIGNING', sub: 'UI/UX & Graphic Design', initial: 'D', color: 'bg-designing' },
    { name: 'B.Arch', sub: 'Bachelor of Architecture', initial: 'B', color: 'bg-barch' },
    { name: 'B.Com', sub: 'Bachelor of Commerce', initial: 'B', color: 'bg-bcom' },
  ];

  const courseOptions = ["AI/ML", "Data Analytics", "Web Development", "Design", "Management", "Finance", "Marketing", "Engineering", "B.Tech"];

  const handleCourseSelect = (event) => {
    const courseName = event.target.value;
    if (courseName && courseName !== "Select a course") {
      selectCourseAndNavigate({ name: courseName });
    }
  };

  return (
    <div className="filter-container">
      <header className="header filter-header">
        <button onClick={() => navigateTo('dashboard')} className="back-button" aria-label="Go back">
          ← Back
        </button>
        <h1 className="header-title-filter">Dream</h1>
        <div style={{ width: '80px' }}></div>
      </header>
      <main>
        <section className="filters-section">
          <div className="filter-group">
            <label className="filter-label courses-label">Courses:</label>
            <div className="select-wrapper">
              <select className="course-select" onChange={handleCourseSelect}>
                <option>Select a course</option>
                {courseOptions.map(course => <option key={course} value={course}>{course}</option>)}
              </select>
            </div>
          </div>
          <div className="filter-group">
            <label className="filter-label good-at-label">I'm Good at:</label>
            <button className="strength-button" onClick={() => navigateTo('strengths')}>Explore My Strengths</button>
          </div>
          <div className="filter-group">
            <label className="filter-label quiz-label">Take a Quiz:</label>
            <button className="quiz-button" onClick={() => navigateTo('quiz')}>Start Career Quiz</button>
          </div>
        </section>

        <section className="career-section">
          <h2 className="career-title">Choose a Career</h2>
          <div className="career-grid">
            {careerData.map((career, index) => (
              <div key={index} className="career-card" tabIndex={0} onClick={() => selectCourseAndNavigate(career)}>
                <div className={`career-icon ${career.color}`}>{career.initial}</div>
                <h3 className="career-name">{career.name}</h3>
                <p className="career-sub">{career.sub}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className="fab-container">
        <div className="fab" role="button" aria-label="Open AI Assistant" tabIndex={0}>
          <svg xmlns="http://www.w3.org/2000/svg" className="fab-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,3C16.42,3 20,4.34 20,6C20,7.66 16.42,9 12,9C7.58,9 4,7.66 4,6C4,4.34 7.58,3 12,3M13,9.5V12.5H15.65C15.22,13.34 14.5,14 12,14C8.45,14 6.5,12.5 6.5,12.5V10.5C6.5,10.5 8.45,9 12,9C12.35,9 12.68,9.04 13,9.1V9.5M17.5,10.5C17.5,10.5 19.55,12 19.55,14C19.55,16 17.5,17.5 17.5,17.5C17.5,17.5 15.45,16 15.45,14C15.45,12 17.5,10.5 17.5,10.5M10.35,14.5H13.65C13.8,15.22 14.25,15.82 14.88,16.25L13,18V21H11V18L9.12,16.25C9.75,15.82 10.2,15.22 10.35,14.5Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
