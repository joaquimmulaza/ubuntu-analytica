import React, { useState } from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import './PublicDemoGrid.css';

// Modal Component for showing demo details
const DemoModal = ({ demo, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStart === 0) {
      return;
    }

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 5) {
      goToNext();
    }

    if (diff < -5) {
      goToPrevious();
    }

    setTouchStart(0);
  };

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? demo.imageUrls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLast = currentIndex === demo.imageUrls.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      {isMaximized && (
        <div className="maximized-image-overlay" onClick={() => setIsMaximized(false)}>
          <img src={demo.imageUrls[currentIndex]} alt="Maximized demo" />
          <button className="maximized-close-btn" onClick={() => setIsMaximized(false)}>&times;</button>
        </div>
      )}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
          <div className="modal-body">
            <div className="modal-gallery" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
              <img src={demo.imageUrls[currentIndex]} alt={`Demo ${currentIndex + 1}`} onClick={() => setIsMaximized(true)} />
            {demo.imageUrls.length > 1 && (
              <div className="modal-gallery-nav">
                <button onClick={goToPrevious} className="arrow-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                </button>
                <div className="dots">
                  {demo.imageUrls.map((_, index) => (
                    <span key={index} className={`dot ${currentIndex === index ? 'active' : ''}`} onClick={() => goToSlide(index)}></span>
                  ))}
                </div>
                <button onClick={goToNext} className="arrow-btn">
                  <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"></path></svg>
                </button>
              </div>
            )}
            </div>
            <div className="modal-details">
              <h2>{demo.title}</h2>
              {/* Assuming description is formatted with "Desafio/Problema" and "Solução" sections */}
              <p>{demo.description}</p>
              <div className="modal-actions">
                <a href={demo.link} className="action-btn interactive-btn" target="_blank" rel="noopener noreferrer">Demo Interativa</a>
                {/* Hardcoding contact link for now */}
                <a href="/contactos" className="action-btn contact-btn">Entre em contacto</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


const PublicDemoGrid = () => {
  const demos = useQuery(api.demos.list) || [];
  const [selectedDemo, setSelectedDemo] = useState(null);

  if (!demos.length) {
    return <div className="loading-demos">Carregando demonstrações...</div>;
  }

  return (
    <div className="public-demo-grid-container">
      {selectedDemo && <DemoModal demo={selectedDemo} onClose={() => setSelectedDemo(null)} />}
      <div className="demo-grid">
        {demos.map((demo) => (
          <div key={demo._id} className="demo-card-public" onClick={() => setSelectedDemo(demo)}>
            <img src={demo.imageUrls[0]} alt={demo.title} className="card-background" />
            <div className="card-overlay">
              <h3>{demo.title}</h3>
              <button className="more-info-btn">Mais Infos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicDemoGrid;
