import React, { useState, useRef } from 'react';
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const ImageUploader = ({ onImagesUploaded }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
      
      // Criar previews das imagens
      const previewsArray = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(previewsArray);
    }
  };

  const handleRemovePreview = (indexToRemove) => {
    const newSelectedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(newSelectedFiles);

    const newPreviews = previews.filter((_, index) => index !== indexToRemove);
    setPreviews(newPreviews);
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) return [];
    
    setUploading(true);
    const imageIds = [];
    
    try {
      // Upload de cada imagem selecionada
      for (const file of selectedFiles) {
        const uploadUrl = await generateUploadUrl();
        
        // Upload da imagem para a URL gerada
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        
        if (result.ok) {
          const { storageId } = await result.json();
          imageIds.push(storageId);
        } else {
          console.error("Falha ao fazer upload da imagem", await result.text());
        }
      }
      
      // Limpar previews e arquivos selecionados após o upload
      previews.forEach(URL.revokeObjectURL);
      setPreviews([]);
      setSelectedFiles([]);
      
      // Chamar o callback com os IDs de armazenamento das imagens
      onImagesUploaded(imageIds);
    } catch (error) {
      console.error("Erro ao fazer upload das imagens:", error);
    } finally {
      setUploading(false);
    }
    
    return imageIds;
  };

  return (
    <div className="image-uploader">
      <div className="file-input-container">
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange} 
          disabled={uploading}
          id="file-input"
          className="file-input"
        />
        <label htmlFor="file-input" className="file-input-label">
          Escolher arquivos
        </label>
        {selectedFiles.length > 0 && (
          <span className="file-count">{selectedFiles.length} arquivos</span>
        )}
      </div>
      
      {previews.length > 0 && (
        <div className="image-previews">
          {previews.map((preview, index) => (
            <div key={index} className="thumbnail-item editing">
              <img 
                src={preview} 
                alt={`Preview ${index + 1}`} 
              />
              <button className="remove-image-btn" onClick={() => handleRemovePreview(index)}>
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={uploadImages} 
        disabled={selectedFiles.length === 0 || uploading}
      >
        {uploading ? 'Enviando...' : 'Enviar Imagens'}
      </button>
    </div>
  );
};

export default ImageUploader;
