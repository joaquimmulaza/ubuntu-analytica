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
import CareersPage from './pages/CareersPage';
import ServicesPage from './pages/ServicesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import SinglePost from './components/SinglePost';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { usePageTracking } from './hooks/useAnalytics';

import AdminPanel from './pages/AdminPanel';


// App Component
function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

// Componente interno que usa o hook de rastreamento
function AppContent() {
  // Rastreia automaticamente todas as mudanças de página
  usePageTracking();

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--color-midnight-black)', color: 'var(--color-white)' }}>
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
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
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/candidaturas" element={<CareersPage />} />
          <Route path="/servicos" element={<ServicesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

