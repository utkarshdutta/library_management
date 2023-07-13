import React, { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        navigate('/');
      } catch (error) {
        alert(error);
      }
    },
    [navigate]
  );

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
          width: '40%',
          maxWidth: '500px',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Log in</h1><br></br>
        <form onSubmit={handleLogin}>
          <label>
            <h3>Email</h3>
            <input 
              name="email" 
              type="email" 
              placeholder="Email" 
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
          </label>
          <label>
            <h3>Password</h3>
            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
            />
          </label>
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
            Log in
          </button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          <Link 
            to="/signup" 
            style={{ color: '#fff', textDecoration: 'none' }}
            onMouseEnter={event => event.target.style.color = '#00CED1'}
            onMouseLeave={event => event.target.style.color = '#fff'}
          >
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
