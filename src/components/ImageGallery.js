import React, { useState, useEffect } from 'react';
import './ImageGallery.css';

// Gallery component for displaying images
const ImageGallery = ({ imageUrls, onRemoveImage, isEditing }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (imageUrls && imageUrls.length > 0) {
      setSelectedImage(imageUrls[0]);
    } else {
      setSelectedImage(null);
    }
  }, [imageUrls]);

  if (!imageUrls || imageUrls.length === 0) {
    return <div className="no-images">Nenhuma imagem disponível</div>;
  }

  return (
    <div className="image-gallery">
      <div className="main-image-container">
        {selectedImage ? (
          <img src={selectedImage} alt="Selected demo" className="main-image" />
        ) : (
          <div className="no-images">Nenhuma imagem selecionada</div>
        )}
      </div>
      {imageUrls.length > 1 && (
        <div className="thumbnail-list">
          {imageUrls.map((url, index) => (
            <div key={index} className={`thumbnail-item ${selectedImage === url ? 'active' : ''} ${isEditing ? 'editing' : ''}`}>
              <img
                src={url}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setSelectedImage(url)}
              />
              {isEditing && (
                <button className="remove-image-btn" onClick={() => onRemoveImage(index)}>
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
