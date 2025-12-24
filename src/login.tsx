
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './common';
import { auth } from './firebaseConfig';

export const LoginPage = ({ navigateTo }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Navigation handled by auth listener, but we can trigger valid dashboard route immediately
      navigateTo('dashboard');
    } catch (err) {
      console.error(err);
      let errorMessage = 'Failed to log in.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please log in to continue your journey.</p>
        <form className="login-form" onSubmit={handleLogin}>
          {error && <div style={{color: 'red', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</div>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <div className="login-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('forgotPassword'); }}>Forgot Password?</a>
          <span aria-hidden="true">|</span>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('signup'); }}>Sign Up</a>
        </div>
      </div>
    </div>
  );
};
