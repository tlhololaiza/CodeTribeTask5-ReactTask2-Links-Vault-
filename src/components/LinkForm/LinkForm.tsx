import React, { useState, useEffect } from 'react';
import { Link, LinkFormData } from '../../types';
import './LinkForm.css';

interface LinkFormProps {
  editingLink: Link | null;
  onSubmit: (data: LinkFormData) => void;
  onClose: () => void;
}

const LinkForm: React.FC<LinkFormProps> = ({ editingLink, onSubmit, onClose }) => {
  const [formData, setFormData] = useState<LinkFormData>({
    title: '',
    url: '',
    description: '',
    tags: ''
  });

  useEffect(() => {
    if (editingLink) {
      setFormData({
        title: editingLink.title,
        url: editingLink.url,
        description: editingLink.description,
        tags: editingLink.tags.join(', ')
      });
    }
  }, [editingLink]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSubmit(formData);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {editingLink ? 'Edit Link' : 'Add New Link'}
          </h2>
          <button onClick={onClose} className="close-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="form-container" onKeyDown={handleKeyDown}>
          <div className="form-field">
            <label className="form-label">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="form-input"
              placeholder="Enter link title"
              autoFocus
            />
          </div>

          <div className="form-field">
            <label className="form-label">URL *</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="form-input"
              placeholder="https://example.com"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="form-textarea"
              rows={3}
              placeholder="Brief description of the link"
            />
          </div>

          <div className="form-field">
            <label className="form-label">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="form-input"
              placeholder="Separate tags with commas (e.g., react, tutorial, javascript)"
            />
          </div>

          <div className="form-actions">
            <button onClick={handleSubmit} className="submit-btn">
              {editingLink ? 'Update Link' : 'Add Link'}
            </button>
            <button onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;