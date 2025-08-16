import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

const ImagePreview = ({ storageId, onRemove, index, isEditing }) => {
  const imageUrl = useQuery(api.demos.getImageUrl, { storageId });

  return (
    <div className={`thumbnail-item ${isEditing ? 'editing' : ''}`}>
      {imageUrl ? (
        <img src={imageUrl} alt={`Preview ${index + 1}`} />
      ) : (
        <div className="thumbnail-loading">Loading...</div>
      )}
      {isEditing && (
        <button className="remove-image-btn" onClick={() => onRemove(index)}>
          &times;
        </button>
      )}
    </div>
  );
};

export default ImagePreview;
