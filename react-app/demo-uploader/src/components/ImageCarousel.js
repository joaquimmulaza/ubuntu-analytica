import React, { useState } from 'react';
import './ImageCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (!images || images.length === 0) {
    return <div className="carousel-container">Nenhuma imagem disponível</div>;
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="left-arrow" onClick={goToPrevious}>
          ❮
        </button>
        <div className="carousel-content-wrapper">
          <div className="carousel-content">
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
          </div>
        </div>
        <button className="right-arrow" onClick={goToNext}>
          ❯
        </button>
      </div>
      <div className="carousel-dots">
        {images.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`carousel-dot ${slideIndex === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(slideIndex)}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;