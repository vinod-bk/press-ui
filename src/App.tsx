import React, { useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import Content from './components/Content';
import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import './App.css';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogin = (userId: string, password: string) => {
    if (userId === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      navigate('/dashboard'); // Navigate to the default route after login
    } else {
      alert('Invalid user ID or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <div className="app-container">
              <Header toggleNav={toggleNav}>
                <Profile onLogout={handleLogout} />
              </Header>
              <div className="main-content">
                <SideNav isOpen={isNavOpen} toggleNav={toggleNav} />
                <Content />
              </div>
              <Footer />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;