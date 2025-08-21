import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMutation } from "convex/react";
import { useAction } from "convex/react";
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
  const logoutAction = useAction(api.authActions.logout);
  const changePasswordAction = useAction(api.authActions.changePasswordAction);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [imageStorageIds, setImageStorageIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await logoutAction({ token });
        localStorage.removeItem('token');
        window.location.href = '/login';
      } catch (error) {
        console.error('Logout failed:', error);
        // Mesmo que o token seja inválido no backend, remove localmente
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  };

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

const handlePasswordChange = async (e: React.FormEvent) => {
  e.preventDefault();
  setPasswordMessage('');

  if (newPassword !== confirmNewPassword) {
    setPasswordMessage('As novas senhas não correspondem.');
    return;
  }

  try {
    const token = localStorage.getItem('token');
    console.log('🔍 Debug - Token found:', token ? 'Yes' : 'No');
    console.log('🔍 Debug - Token value:', token);
    console.log('🔍 Debug - Token length:', token?.length || 0);
    
    if (!token) {
      setPasswordMessage('Token não encontrado. Faça login primeiro.');
      return;
    }

    console.log('🔍 Debug - Calling changePasswordAction with:', {
      token: token.substring(0, 20) + '...', // Mostra só os primeiros 20 chars por segurança
      currentPassword: '***',
      newPassword: '***',
      confirmNewPassword: '***',
    });

    await changePasswordAction({
      token,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    
    console.log('✅ Password changed successfully');
    setPasswordMessage('Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  } catch (error) {
    console.log('❌ Error details:', error);
    console.log('❌ Error message:', (error as Error).message);
    setPasswordMessage(`Erro ao alterar a senha: ${(error as Error).message}`);
    console.error('Erro ao alterar a senha:', error);
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
        <button 
          className={`tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Alterar Senha
        </button>
        <button 
          className="tab"
          onClick={handleLogout}
        >
          Terminar Sessão
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
      ) : activeTab === 'list' ? (
        <DemoList />
      ) : (
        <div className="upload-container">
          <form onSubmit={handlePasswordChange}>
            <div className="form-group">
              <label>Senha Atual:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Nova Senha:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirmar Nova Senha:</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Alterar Senha</button>
            {passwordMessage && <p>{passwordMessage}</p>}
          </form>
        </div>
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
