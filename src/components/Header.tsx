import React from 'react';

interface HeaderProps {
  toggleNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleNav }) => (
  <header>
    <button onClick={toggleNav}>☰</button>
    <h1>Press UI</h1>
  </header>
);

export default Header;