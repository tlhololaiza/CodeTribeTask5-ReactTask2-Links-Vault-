import React from 'react';
import './EmptyState.css';

interface EmptyStateProps {
  hasSearch: boolean;
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ hasSearch, onAddClick }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      </div>
      <h3 className="empty-title">
        {hasSearch ? 'No links found' : 'No links yet'}
      </h3>
      <p className="empty-description">
        {hasSearch ? 'Try adjusting your search terms' : 'Add your first link to get started'}
      </p>
      {!hasSearch && (
        <button onClick={onAddClick} className="empty-action">
          Add Your First Link
        </button>
      )}
    </div>
  );
};

export default EmptyState;