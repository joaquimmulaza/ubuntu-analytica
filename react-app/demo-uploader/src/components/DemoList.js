import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import './DemoList.css';
import ImageUploader from './ImageUploader';

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
            <div key={index} className={`thumbnail-item ${selectedImage === url ? 'active' : ''}`}>
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

const DemoList = () => {
  const demos = useQuery(api.demos.list) || [];
  const updateDemo = useMutation(api.demos.update);
  const removeDemo = useMutation(api.demos.remove);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    link: '',
    imageUrls: [], // Stores storageIds during edit
  });
  const [editImageUrls, setEditImageUrls] = useState([]); // Stores resolved URLs for gallery preview during edit

  const startEditing = (demo) => {
    setEditingId(demo._id);
    setEditForm({
      title: demo.title,
      description: demo.description,
      link: demo.link,
      imageUrls: demo.imageStorageIds, // Use original storage IDs
    });
    // Use the already-resolved URLs from the list query for the preview
    setEditImageUrls(demo.imageUrls);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '', link: '', imageUrls: [] });
    setEditImageUrls([]);
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const saveChanges = async () => {
    if (!editingId) return;
    try {
      await updateDemo({
        id: editingId,
        title: editForm.title,
        description: editForm.description,
        link: editForm.link,
        imageUrls: editForm.imageUrls, // Send storageIds
      });
      cancelEditing();
      alert('Demonstração atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar demonstração:', error);
      alert('Erro ao atualizar demonstração.');
    }
  };

  const deleteDemoItem = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta demonstração?')) {
      try {
        await removeDemo({ id });
        alert('Demonstração excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir demonstração:', error);
        alert('Erro ao excluir demonstração.');
      }
    }
  };

  const handleImagesUploaded = (newImageIds) => {
    const newImageStorageIds = [...editForm.imageUrls, ...newImageIds];
    setEditForm(prev => ({ ...prev, imageUrls: newImageStorageIds }));
    // This is tricky, we don't have the new URLs yet.
    // For now, we can't show the new images in the preview until we save and refetch.
    // Or, we can create a new query to resolve them.
    // Let's just accept this limitation for now to fix the crash.
    // The user can upload and save. The images will appear after the list re-fetches.
    alert("Imagens prontas para upload. Salve as alterações para vê-las.");
  };

  const handleRemoveImage = (indexToRemove) => {
    const newImageUrls = editForm.imageUrls.filter((_, index) => index !== indexToRemove);
    setEditForm(prev => ({ ...prev, imageUrls: newImageUrls }));
    
    const newResolvedUrls = editImageUrls.filter((_, index) => index !== indexToRemove);
    setEditImageUrls(newResolvedUrls);
  };

  if (!demos.length) {
    return <div className="demo-list-empty">Nenhuma demonstração disponível.</div>;
  }

  return (
    <div className="demo-list-container">
      <h2>Gerenciamento de Demonstrações</h2>
      <div className="demo-cards-grid">
        {demos.map((demo) => (
          <div key={demo._id} className="demo-card">
            {editingId === demo._id ? (
              // Edit Mode
              <div className="demo-card-content editing">
                <ImageGallery imageUrls={editImageUrls} onRemoveImage={handleRemoveImage} isEditing={true} />
                <div className="edit-form">
                  <label>Título:</label>
                  <input
                    type="text"
                    value={editForm.title || ''}
                    onChange={(e) => handleEditFormChange('title', e.target.value)}
                  />
                  <label>Descrição:</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => handleEditFormChange('description', e.target.value)}
                  />
                  <label>Link:</label>
                  <input
                    type="url"
                    value={editForm.link}
                    onChange={(e) => handleEditFormChange('link', e.target.value)}
                  />
                  <div className="image-upload-section">
                    <h4>Adicionar novas imagens:</h4>
                    <ImageUploader onImagesUploaded={handleImagesUploaded} />
                  </div>
                </div>
                <div className="action-buttons">
                  <button className="save-btn" onClick={saveChanges}>Salvar</button>
                  <button className="cancel-btn" onClick={cancelEditing}>Cancelar</button>
                </div>
              </div>
            ) : (
              // View Mode
              <div className="demo-card-content">
                <ImageGallery imageUrls={demo.imageUrls} isEditing={false} />
                <div className="demo-details">
                  <h3>{demo.title}</h3>
                  <p>{demo.description}</p>
                  <a href={demo.link} target="_blank" rel="noopener noreferrer">
                    Ver demonstração
                  </a>
                </div>
                <div className="action-buttons">
                  <button className="edit-btn" onClick={() => startEditing(demo)}>Editar</button>
                  <button className="delete-btn" onClick={() => deleteDemoItem(demo._id)}>Excluir</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoList;
