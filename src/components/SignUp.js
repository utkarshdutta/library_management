import React, { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
      navigate('/');
    } catch (error) {
      alert(error);
    }
  }, [navigate]);

  return (
    <div
      style={{
        background: '#333',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#222',
          padding: '4rem',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          width: '40%', // Set the width of the box
          maxWidth: '500px', // Optional: Limit the maximum width of the box
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Sign up</h1><br></br>
        <form onSubmit={handleSignUp}>
          <label>
            <h3>Email</h3>
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} // Set the width of the input field
            />
          </label>
          <label>
            <h3>Password</h3>
            <input
              name="password"
              type="password"
              placeholder="Password"
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }} // Set the width of the input field
            />
          </label><br></br><br></br>
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          <Link 
            to="/login" 
            style={{ color: '#fff', textDecoration: 'none' }}
            onMouseEnter={event => event.target.style.color = 'aqua'}
            onMouseLeave={event => event.target.style.color = '#fff'}
          >
            Already have an account? Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
