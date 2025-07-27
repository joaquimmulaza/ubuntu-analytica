import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMutation } from "convex/react";
import { api } from "./convex/_generated/api";
import './App.css';
import ImageUploader from './components/ImageUploader';
import DemoList from './components/DemoList';
import PublicDemoGrid from './components/PublicDemoGrid';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Panel Component
const AdminPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]); // This will store storageIds
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'list'
  
  const addDemo = useMutation(api.demos.add);

  const handleImagesUploaded = (ids: string[]) => {
    setImageUrls(ids); // Now receiving storageIds
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (imageUrls.length === 0) {
      alert('Por favor, faça upload de pelo menos uma imagem.');
      return;
    }
    
    setIsUploading(true);
    
    try {
      await addDemo({
        title,
        description,
        link,
        imageUrls, // Sending storageIds
      });
      
      setTitle('');
      setDescription('');
      setLink('');
      setImageUrls([]);
      
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
              disabled={isUploading || imageUrls.length === 0}
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
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pt_pt/demos.html" element={<PublicDemoGrid />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
