import React, { useState } from 'react';
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import ImageUploader from './ImageUploader';
import ImageGallery from './ImageGallery';
import toast from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';

// Types for Demo (adjust based on your actual Convex schema)
interface Demo {
    _id: string;
    title: string;
    description: string;
    link: string;
    imageUrls: string[];
    imageStorageIds: string[];
}

const DemoList = () => {
    const demos = useQuery(api.demos.list) || [];
    const updateDemo = useMutation(api.demos.update);
    const removeDemo = useMutation(api.demos.remove);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{
        title: string;
        description: string;
        link: string;
        imageUrls: string[]; // This stores storageIds
    }>({
        title: '',
        description: '',
        link: '',
        imageUrls: [],
    });
    // Stores resolved URLs for gallery preview during edit
    const [editResolvedUrls, setEditResolvedUrls] = useState<string[]>([]);

    // Delete Modal State
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const startEditing = (demo: any) => {
        setEditingId(demo._id);
        setEditForm({
            title: demo.title,
            description: demo.description,
            link: demo.link,
            imageUrls: demo.imageStorageIds || [], // Use original storage IDs
        });
        setEditResolvedUrls(demo.imageUrls || []);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditForm({ title: '', description: '', link: '', imageUrls: [] });
        setEditResolvedUrls([]);
    };

    const handleEditFormChange = (field: string, value: any) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const saveChanges = async () => {
        if (!editingId) return;
        try {
            await updateDemo({
                id: editingId as any,
                title: editForm.title,
                description: editForm.description,
                link: editForm.link,
                imageUrls: editForm.imageUrls,
            });
            cancelEditing();
            cancelEditing();
            toast.success('Demonstração atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar demonstração:', error);
            toast.error('Erro ao atualizar demonstração.');
        }
    };

    const deleteDemoItem = (id: string) => {
        setDeleteId(id);
        setIsOpen(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            await removeDemo({ id: deleteId as any });
            toast.success('Demonstração excluída com sucesso.');
            setIsOpen(false);
            setDeleteId(null);
        } catch (error) {
            console.error('Erro ao excluir demonstração:', error);
            toast.error('Erro ao excluir demonstração.');
        }
    };

    const handleImagesUploaded = (newImageIds: string[]) => {
        const newImageStorageIds = [...editForm.imageUrls, ...newImageIds];
        setEditForm(prev => ({ ...prev, imageUrls: newImageStorageIds }));
        toast.success("Novas imagens adicionadas! Salve para aplicar.");
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const newStorageIds = editForm.imageUrls.filter((_, index) => index !== indexToRemove);
        setEditForm(prev => ({ ...prev, imageUrls: newStorageIds }));

        // Also remove from local preview if possible (though exact mapping might be tricky if mixed)
        // For simplicity in edit mode, we update resolved urls too if keeping them in sync
        const newResolvedUrls = editResolvedUrls.filter((_, index) => index !== indexToRemove);
        setEditResolvedUrls(newResolvedUrls);
    };

    if (!demos || demos.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl glass-neon border-glow">
                <div className="w-16 h-16 mb-4 rounded-full bg-midnight-black flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhuma demonstração encontrada</h3>
                <p className="text-gray-400">Comece adicionando uma nova demonstração no painel de upload.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white font-heading tracking-wide flex items-center gap-3">
                    <span className="w-2 h-8 bg-gradient-to-b from-electric-blue to-cyber-purple rounded-full"></span>
                    Gerenciar Demonstrações
                </h2>
                <span className="px-3 py-1 text-xs font-semibold text-electric-blue bg-electric-blue/10 rounded-full border border-electric-blue/20">
                    {demos.length} Projetos
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demos.map((demo: any) => (
                    <div
                        key={demo._id}
                        className={`relative group bg-midnight-black/40 rounded-2xl border transition-all duration-300 overflow-hidden
              ${editingId === demo._id
                                ? 'border-electric-blue ring-1 ring-electric-blue shadow-glow-soft scale-[1.02] z-10'
                                : 'border-white/5 hover:border-white/10 hover:bg-midnight-black/60'
                            }`}
                    >
                        {/* Top Gradient Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue via-cyber-purple to-neon-coral opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {editingId === demo._id ? (
                            // EDIT MODE
                            <div className="p-5 space-y-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-bold text-electric-blue uppercase tracking-wider">Editando</h3>
                                    <button onClick={cancelEditing} className="text-gray-400 hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>

                                {/* Image Gallery in Edit Mode */}
                                <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                                    <ImageGallery imageUrls={editResolvedUrls} onRemoveImage={handleRemoveImage} isEditing={true} />
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <p className="text-xs text-gray-400 mb-2">Adicionar mais imagens:</p>
                                        <ImageUploader onImagesUploaded={handleImagesUploaded} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-400">Título</label>
                                        <input
                                            type="text"
                                            value={editForm.title}
                                            onChange={(e) => handleEditFormChange('title', e.target.value)}
                                            className="w-full px-4 py-2 text-sm bg-black/40 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-400">Descrição</label>
                                        <textarea
                                            value={editForm.description}
                                            onChange={(e) => handleEditFormChange('description', e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 text-sm bg-black/40 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all resize-none"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold text-gray-400">Link da Demo</label>
                                        <div className="relative">
                                            <input
                                                type="url"
                                                value={editForm.link}
                                                onChange={(e) => handleEditFormChange('link', e.target.value)}
                                                className="w-full px-4 py-2 pl-9 text-sm bg-black/40 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                            />
                                            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-4 pt-2">
                                    <button
                                        onClick={saveChanges}
                                        className="flex-1 py-2 px-4 bg-gradient-to-r from-electric-blue to-cyber-purple text-white text-sm font-bold rounded-lg hover:shadow-glow-soft transition-all transform hover:scale-[1.02]"
                                    >
                                        Salvar Alterações
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // VIEW MODE
                            <div className="flex flex-col h-full">
                                <div className="relative">
                                    <ImageGallery imageUrls={demo.imageUrls} isEditing={false} onRemoveImage={() => { }} />
                                    {/* Floating Actions */}
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => startEditing(demo)}
                                            className="p-2 bg-midnight-black/80 backdrop-blur-md rounded-lg text-white hover:text-electric-blue border border-white/10 hover:border-electric-blue/50 transition-all shadow-lg"
                                            title="Editar"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => deleteDemoItem(demo._id)}
                                            className="p-2 bg-midnight-black/80 backdrop-blur-md rounded-lg text-white hover:text-red-500 border border-white/10 hover:border-red-500/50 transition-all shadow-lg"
                                            title="Excluir"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-electric-blue transition-colors">
                                        {demo.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                                        {demo.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-xs text-gray-500 font-mono">ID: {demo._id.substring(0, 6)}...</span>

                                        <a
                                            href={demo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs font-bold text-electric-blue hover:text-neon-coral transition-colors uppercase tracking-wider group/link"
                                        >
                                            Ver Demo
                                            <svg className="w-3 h-3 ml-1 transform group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* --- DELETE CONFIRMATION MODAL --- */}
            <Transition appear show={isOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl glass-neon border border-red-500/30 p-8 text-left align-middle shadow-glow-soft transition-all relative">
                                    {/* Abstract Warning Graphic */}
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-full bg-red-500/20 border border-red-500/40 text-red-400">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        </div>
                                        <Dialog.Title as="h3" className="text-xl font-bold font-heading text-white leading-6">
                                            Excluir Demonstração
                                        </Dialog.Title>
                                    </div>

                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500 font-body leading-relaxed">
                                            Tem certeza que deseja excluir esta demonstração permanentemente? Esta ação não pode ser desfeita e removerá todo o conteúdo associado.
                                        </p>
                                    </div>

                                    <div className="mt-8 flex gap-3 justify-end">
                                        <button
                                            type="button"
                                            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="button"
                                            className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-red-500/80 hover:bg-red-600 border border-red-500/50 shadow-glow-soft hover:shadow-glow-medium transition-all transform hover:scale-105"
                                            onClick={confirmDelete}
                                        >
                                            Sim, Excluir
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default DemoList;
