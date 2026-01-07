import React, { useState, useRef, DragEvent } from 'react';
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

interface ImageUploaderProps {
    onImagesUploaded: (imageIds: string[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesUploaded }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadingFiles, setUploadingFiles] = useState<string[]>([]); // To track files currently uploading by name
    const fileInputRef = useRef<HTMLInputElement>(null);

    const generateUploadUrl = useMutation(api.storage.generateUploadUrl);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(Array.from(e.target.files));
        }
        // Reset inputs so same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const processFiles = async (files: File[]) => {
        const validFiles = files.filter(file => file.type.startsWith('image/'));

        if (validFiles.length === 0) return;

        // Add to uploading visual state
        const newUploadingNames = validFiles.map(f => f.name);
        setUploadingFiles(prev => [...prev, ...newUploadingNames]);

        const uploadedIds: string[] = [];

        // Parallel uploads allowed
        await Promise.all(validFiles.map(async (file) => {
            try {
                const uploadUrl = await generateUploadUrl();

                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file,
                });

                if (result.ok) {
                    const { storageId } = await result.json();
                    uploadedIds.push(storageId);
                } else {
                    console.error(`Falha no upload de ${file.name}`);
                }
            } catch (error) {
                console.error(`Erro no upload de ${file.name}:`, error);
            } finally {
                // Remove from uploading state
                setUploadingFiles(prev => prev.filter(name => name !== file.name));
            }
        }));

        if (uploadedIds.length > 0) {
            onImagesUploaded(uploadedIds);
        }
    };

    return (
        <div className="w-full">
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
            relative overflow-hidden group cursor-pointer
            flex flex-col items-center justify-center
            p-8 md:p-12
            border-2 border-dashed rounded-xl transition-all duration-300
            bg-midnight-black/40 backdrop-blur-sm
            ${isDragging
                        ? 'border-electric-blue bg-electric-blue/10 scale-[1.01] shadow-glow-soft'
                        : 'border-gray-700 hover:border-electric-blue/50 hover:bg-white/5'
                    }
        `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                />

                {/* Upload Animation Background Layer */}
                {uploadingFiles.length > 0 && (
                    <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-4 border-t-electric-blue border-r-transparent border-b-cyber-purple border-l-transparent animate-spin mb-4"></div>
                        <p className="text-electric-blue font-mono text-sm animate-pulse">ENVIANDO {uploadingFiles.length} ARQUIVO(S)...</p>
                        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-electric-blue to-neon-coral w-full animate-progress-indeterminate"></div>
                    </div>
                )}

                {/* Idle Content */}
                <div className={`transition-all duration-300 transform group-hover:scale-105 flex flex-col items-center pointer-events-none ${uploadingFiles.length > 0 ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                    <div className={`
                w-16 h-16 mb-4 rounded-full flex items-center justify-center
                bg-gradient-to-br from-gray-800 to-black border border-white/10
                group-hover:border-electric-blue/50 group-hover:shadow-glow-soft
                transition-all duration-500
            `}>
                        <svg className="w-8 h-8 text-gray-400 group-hover:text-electric-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    <h3 className="text-white font-heading font-semibold text-lg mb-1">
                        Upload de Imagens
                    </h3>
                    <p className="text-gray-400 text-sm text-center max-w-xs">
                        Arraste e solte seus arquivos aqui ou <span className="text-electric-blue font-bold group-hover:underline">busque no computador</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
