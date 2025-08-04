import React from 'react';
import './Header.css';

interface HeaderProps {
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-info">
            <div className="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div>
              <h1 className="header-title">My Links Vault</h1>
              <p className="header-subtitle">Your personal bookmark manager</p>
            </div>
          </div>
          <button onClick={onAddClick} className="add-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;