import React, { useState, useEffect } from 'react';
import { Link, LinkFormData } from './types';
import { saveLinks, loadLinks } from './utils/localStorage';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import LinkForm from './components/LinkForm/LinkForm';
import LinkCard from './components/LinkCard/LinkCard';
import EmptyState from './components/EmptyState/EmptyState';
import Notification from './components/Notification/Notification';
import './App.css';
import Footer from './components/Footer/Footer';

const App: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [notification, setNotification] = useState<string>('');

  // Load links from localStorage on component mount
  useEffect(() => {
    const savedLinks = loadLinks();
    setLinks(savedLinks);
  }, []);

  // Save links to localStorage whenever links change
  useEffect(() => {
    saveLinks(links);
  }, [links]);

  // Show notification
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Handle form submission
  const handleFormSubmit = (formData: LinkFormData) => {
    if (!formData.title.trim() || !formData.url.trim()) {
      showNotification('Title and URL are required!');
      return;
    }

    const linkData: Link = {
      id: editingLink ? editingLink.id : Date.now().toString(),
      title: formData.title.trim(),
      url: formData.url.trim(),
      description: formData.description.trim(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: editingLink ? editingLink.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingLink) {
      setLinks(prev => prev.map(link => link.id === editingLink.id ? linkData : link));
      showNotification('Link updated successfully!');
    } else {
      setLinks(prev => [linkData, ...prev]);
      showNotification('Link added successfully!');
    }

    setShowForm(false);
    setEditingLink(null);
  };

  // Edit link
  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setShowForm(true);
  };

  // Delete link
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      setLinks(prev => prev.filter(link => link.id !== id));
      showNotification('Link deleted successfully!');
    }
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingLink(null);
  };

  // Filter links based on search term
  const filteredLinks = links.filter(link => {
    const searchLower = searchTerm.toLowerCase();
    return (
      link.title.toLowerCase().includes(searchLower) ||
      link.url.toLowerCase().includes(searchLower) ||
      link.description.toLowerCase().includes(searchLower) ||
      link.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="app">
      <Notification message={notification} />
      
      <Header onAddClick={() => setShowForm(true)} />

      <div className="container">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {showForm && (
          <LinkForm
            editingLink={editingLink}
            onSubmit={handleFormSubmit}
            onClose={handleCloseForm}
          />
        )}

        {filteredLinks.length === 0 ? (
          <EmptyState 
            hasSearch={!!searchTerm}
            onAddClick={() => setShowForm(true)}
          />
        ) : (
          <div className="links-grid">
            {filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
};

export default App;