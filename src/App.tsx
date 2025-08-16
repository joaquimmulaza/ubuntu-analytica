import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMutation } from "convex/react";
import { api } from "./convex/_generated/api";
import './App.css';
import ImageUploader from './components/ImageUploader';
import DemoList from './components/DemoList';
import PublicDemoGrid from './components/PublicDemoGrid';
import ImagePreview from './components/ImagePreview';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';

// Admin Panel Component
const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [imageStorageIds, setImageStorageIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const addDemo = useMutation(api.demos.add);

  const handleImagesUploaded = (ids: string[]) => {
    setImageStorageIds(prev => [...prev, ...ids]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImageStorageIds(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageStorageIds.length === 0) {
      alert('Por favor, faça upload de pelo menos uma imagem.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      await addDemo({
        title,
        description,
        link,
        imageUrls: imageStorageIds,
      });
      
      setTitle('');
      setDescription('');
      setLink('');
      setImageStorageIds([]);
      
      alert('Demonstração adicionada com sucesso!');
      setActiveTab('list');
    } catch (error) {
      console.error('Erro ao adicionar demonstração:', error);
      alert('Erro ao adicionar demonstração. Por favor, tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="App-header">
      <h1>Painel de Demonstrações</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          Upload de Demo
        </button>
        <button 
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          Painel Administrativo
        </button>
      </div>
      
      {activeTab === 'upload' ? (
        <div className="upload-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Imagens da Demo:</label>
              <div className="thumbnail-list">
                {imageStorageIds.map((storageId, index) => (
                  <ImagePreview
                    key={storageId}
                    storageId={storageId}
                    index={index}
                    onRemove={handleRemoveImage}
                    isEditing={true}
                  />
                ))}
              </div>
              <ImageUploader onImagesUploaded={handleImagesUploaded} />
            </div>

            <div className="form-group">
              <label>Título:</label>
              <input 
                type="text"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Descrição:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Link para a Demo Interativa:</label>
              <input 
                type="url" 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                required 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isUploading || imageStorageIds.length === 0}
            >
              {isUploading ? 'Adicionando...' : 'Adicionar Demo'}
            </button>
          </form>
        </div>
      ) : (
        <DemoList />
      )}
    </div>
  );
};


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/demos" element={<PublicDemoGrid />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              } 
            />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
