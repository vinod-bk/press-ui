import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideNav from './components/SideNav';
import Content from './components/Content';
import './App.css';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <Header toggleNav={toggleNav} />
        <div className="main-content">
          <SideNav isOpen={isNavOpen} toggleNav={toggleNav} />
          <Content />
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;