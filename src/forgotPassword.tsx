
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { auth } from './firebaseConfig';

export const ForgotPasswordPage = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (err) {
      console.error(err);
      let errorMessage = 'Failed to send reset email.';
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Reset Password</h1>
        <p className="login-subtitle">Enter your email to receive a password reset link.</p>
        <form className="login-form" onSubmit={handleReset}>
          {error && <div style={{color: 'red', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</div>}
          {message && <div style={{color: 'green', marginBottom: '1rem', fontSize: '0.9rem'}}>{message}</div>}
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
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="login-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('login'); }}>Back to Log In</a>
        </div>
      </div>
    </div>
  );
};
