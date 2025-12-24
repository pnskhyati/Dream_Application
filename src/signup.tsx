
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './common';
import { auth, db } from './firebaseConfig';

export const SignUpPage = ({ navigateTo }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Add user to Firestore using v8 syntax
      try {
        await db.collection("users").doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          fullName: fullName,
          createdAt: new Date()
        });
      } catch (firestoreError) {
        console.error("Error writing to Firestore:", firestoreError);
        // We don't block the signup flow if firestore write fails, but we log it.
      }

      // Optionally update display name in Auth
      if (fullName && user) {
          await user.updateProfile({ displayName: fullName });
      }
      
      // Navigation is handled by the auth listener in index.tsx, but we can call it to be safe/fast
      navigateTo('dashboard');
    } catch (err) {
      console.error(err);
      let errorMessage = 'Failed to create account.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
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
        <h1 className="login-title">Create Account</h1>
        <p className="login-subtitle">Join us and start your career journey today.</p>
        <form className="login-form" onSubmit={handleSignUp}>
          {error && <div style={{color: 'red', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</div>}
          <div className="input-group">
            <label htmlFor="fullname">Full Name</label>
            <input 
              type="text" 
              id="fullname" 
              placeholder="Your Name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
          </div>
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
           <div className="input-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              id="confirm-password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <div className="login-links">
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('login'); }}>Already have an account? Log In</a>
        </div>
      </div>
    </div>
  );
};
