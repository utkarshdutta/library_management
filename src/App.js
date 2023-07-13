import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { auth } from './firebase';

import BookDetail from './components/BookDetail';
import BooksList from './components/BooksList';
import Login from './components/Login';
import SearchBar from './components/SearchBar';
import SignUp from './components/SignUp';

function App() {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#101010',
    padding: '20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    width: '100%',
  };

  const titleStyle = {
    color: '#FFFFFF',
    fontSize: '32px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    fontFamily: 'Arial, sans-serif',
    textShadow: '1px 2px #008000',
    
  };

  const buttonStyle = {
    padding: '12px 24px',
    background: '#008000', 
    color: '#F8F8F8',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    background: '#4CAF50',
  };

  const booksContainerStyle = {
    maxHeight: '600px',
    overflowY: 'scroll',
    width: '100%',
    background: '#3A3A3A',
    borderRadius: '8px',
    padding: '20px',
  };

  const footerStyle = {
    marginTop: '30px',
    padding: '20px',
    color: '#F8F8F8',
    textAlign: 'center',
    fontSize: '14px',
  };

  const [logoutHover, setLogoutHover] = useState(false);

  return (
    <div style={{ backgroundColor: '#1F1F1F' }}>
      <Router>
        {user ? (
          <div style={containerStyle}>
            <header style={headerStyle}>
              <h1 style={titleStyle}>My Bookshelf</h1>
              <button 
                style={logoutHover ? buttonHoverStyle : buttonStyle} 
                onClick={handleLogout} 
                onMouseEnter={() => setLogoutHover(true)} 
                onMouseLeave={() => setLogoutHover(false)}
              >
                Logout
              </button>
            </header>
            <SearchBar setBooks={setBooks} books={books} />
            <div style={booksContainerStyle}>
              <BooksList books={books} />
            </div>
            <footer style={footerStyle}>
              © 2023 My Bookshelf. All rights reserved.
            </footer>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route exact path="/book/:id" component={BookDetail} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
