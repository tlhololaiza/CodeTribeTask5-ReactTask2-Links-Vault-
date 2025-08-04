import React from 'react';
import { Link } from '../../types';
import './LinkCard.css';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <h3 className="card-title">{link.title}</h3>
          <div className="card-actions">
            <button
              onClick={() => onEdit(link)}
              className="action-btn edit-btn"
              title="Edit link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button
              onClick={() => onDelete(link.id)}
              className="action-btn delete-btn"
              title="Delete link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6"/>
                <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="card-body">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-url"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span className="url-text">{link.url}</span>
          </a>

          {link.description && (
            <div className="card-description">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <p className="description-text">{link.description}</p>
            </div>
          )}

          {link.tags.length > 0 && (
            <div className="card-tags">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <div className="tags-container">
                {link.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="card-footer">
            Added {new Date(link.createdAt).toLocaleDateString()}
            {link.updatedAt !== link.createdAt && (
              <span> • Updated {new Date(link.updatedAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;