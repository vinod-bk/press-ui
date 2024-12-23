import React from 'react';

interface HeaderProps {
  toggleNav: () => void;
  children?: React.ReactNode; // Add this line to accept children
}

const Header: React.FC<HeaderProps> = ({ toggleNav, children }) => {
  return (
    <header className="header">
      <button onClick={toggleNav}>☰</button>
      <h1>Press UI</h1>
      <div className="header-right">
        {children} {/* Render children here */}
      </div>
    </header>
  );
};

export default Header;