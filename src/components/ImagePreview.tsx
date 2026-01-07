import React from 'react';
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

interface ImagePreviewProps {
    storageId: string;
    onRemove?: (index: number) => void;
    index: number;
    isEditing?: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ storageId, onRemove, index, isEditing = false }) => {
    const imageUrl = useQuery(api.demos.getImageUrl, { storageId });

    return (
        <div className="relative w-full h-full group">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 animate-pulse">
                    <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}

            {/* Overlay com Gradiente no Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {isEditing && onRemove && (
                <button
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-red-500/80 backdrop-blur-sm text-white rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 transform hover:scale-110 border border-white/20"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRemove(index);
                    }}
                    title="Remover imagem"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ImagePreview;
