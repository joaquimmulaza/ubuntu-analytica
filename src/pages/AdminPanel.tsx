import React, { useState } from 'react';
import { useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import ImageUploader from '../components/ImageUploader';
import ImagePreview from '../components/ImagePreview';
import DemoList from '../components/DemoList';
import toast, { Toaster } from 'react-hot-toast';

const AdminPanel = () => {
    const logoutAction = useAction(api.authActions.logout);
    const changePasswordAction = useAction(api.authActions.changePasswordAction);
    const addDemo = useMutation(api.demos.add);

    const [activeTab, setActiveTab] = useState<'list' | 'upload' | 'password'>('list');

    // Upload State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [imageStorageIds, setImageStorageIds] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    // Password State
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordStatus, setPasswordStatus] = useState<'success' | 'error' | ''>('');

    // --- Actions ---

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await logoutAction({ token });
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }
        localStorage.removeItem('token');
        window.location.href = '/login';
        toast.success('Sessão terminada com sucesso.');
    };

    const handleImagesUploaded = (ids: string[]) => {
        setImageStorageIds(prev => [...prev, ...ids]);
        toast.success(`${ids.length} imagem(ns) carregada(s)!`);
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImageStorageIds(prev => prev.filter((_, index) => index !== indexToRemove));
        toast('Imagem removida.', { icon: '🗑️' });
    };

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (imageStorageIds.length === 0) {
            toast.error('Por favor, faça upload de pelo menos uma imagem.');
            return;
        }

        setIsUploading(true);
        try {
            await addDemo({
                title,
                description,
                link,
                imageUrls: imageStorageIds,
            });

            setTitle('');
            setDescription('');
            setLink('');
            setImageStorageIds([]);
            toast.success('Demonstração publicada com sucesso!');
            setActiveTab('list');
        } catch (error) {
            console.error('Erro ao adicionar demonstração:', error);
            toast.error('Erro ao publicar demonstração. Tente novamente.');
        } finally {
            setIsUploading(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMessage('');
        setPasswordStatus('');

        if (newPassword !== confirmNewPassword) {
            setPasswordMessage('As novas senhas não correspondem.');
            setPasswordStatus('error');
            toast.error('As novas senhas não coincidem.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                const msg = 'Sessão expirada. Faça login novamente.';
                setPasswordMessage(msg);
                setPasswordStatus('error');
                toast.error(msg);
                return;
            }

            await changePasswordAction({
                token,
                currentPassword,
                newPassword,
                confirmNewPassword,
            });

            const successMsg = 'Senha alterada com sucesso!';
            setPasswordMessage(successMsg);
            setPasswordStatus('success');
            toast.success(successMsg);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (error: any) {
            const errorMsg = `Erro: ${error.message || 'Falha ao alterar senha'}`;
            setPasswordMessage(errorMsg);
            setPasswordStatus('error');
            toast.error(errorMsg);
        }
    };

    // --- Components ---

    const TabButton = ({ id, label, icon }: { id: typeof activeTab, label: string, icon: React.ReactNode }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium text-sm
                ${activeTab === id
                    ? 'bg-gradient-to-r from-electric-blue to-cyber-purple text-white shadow-glow-soft transform scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
        >
            {icon}
            {label}
        </button>
    );

    return (
        <div className="relative min-h-screen overflow-hidden bg-midnight-black font-body pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <Toaster position="top-right" toastOptions={{
                style: {
                    background: '#161b22', // Midnight black
                    color: '#fff',
                    border: '1px solid rgba(63, 69, 255, 0.4)', // Electric blue border
                    boxShadow: '0 0 15px rgba(63, 69, 255, 0.3)', // Glow effect
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '0.9rem',
                },
                success: {
                    iconTheme: {
                        primary: '#3F45FF', // Electric Blue
                        secondary: '#fff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                },
            }} />

            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric-blue rounded-full opacity-20 filter blur-[100px] animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyber-purple rounded-full opacity-20 filter blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-neon-coral rounded-full opacity-10 filter blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            {/* Content Wrapper */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in-up">
                    <div>
                        <h1 className="text-4xl font-bold text-white font-heading tracking-wide mb-2 drop-shadow-lg">
                            Painel Administrativo
                        </h1>
                        <p className="text-gray-500">Gerencie demos, conteúdo e configurações da conta.</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="glass-neon px-5 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm font-semibold flex items-center gap-2 border border-red-500/20 hover:border-red-500/40"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sair
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8 animate-fade-in-up animation-delay-2000">
                    <div className="flex flex-wrap gap-2 p-1.5 glass-neon rounded-2xl w-fit">
                        <TabButton
                            id="list"
                            label="Minhas Demos"
                            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                        />
                        <TabButton
                            id="upload"
                            label="Nova Demo"
                            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
                        />
                        <TabButton
                            id="password"
                            label="Segurança"
                            icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>}
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="animate-fade-in-up animation-delay-2000">
                    {activeTab === 'list' && (
                        <DemoList />
                    )}

                    {activeTab === 'upload' && (
                        <div className="max-w-3xl mx-auto glass-neon border-glow rounded-2xl p-8 shadow-xl">
                            <div className="mb-6 pb-6 border-b border-white/10">
                                <h2 className="text-2xl font-bold text-white mb-2">Adicionar Nova Demo</h2>
                                <p className="text-gray-400 text-sm">Preencha os detalhes e adicione imagens para criar um novo card de demonstração.</p>
                            </div>

                            <form onSubmit={handleUploadSubmit} className="space-y-6">
                                {/* Image Upload & Previews */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-gray-300">Imagens do Projeto</label>

                                    {/* Upload Zone */}
                                    <ImageUploader onImagesUploaded={handleImagesUploaded} />

                                    {/* Preview Grid - Only shows if there are images */}
                                    {imageStorageIds.length > 0 && (
                                        <div className="mt-4 animate-fade-in-up">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                    {imageStorageIds.length} Imagem(ns) Carregada(s)
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => setImageStorageIds([])}
                                                    className="text-xs text-red-500 hover:text-red-400 hover:underline"
                                                >
                                                    Remover Todas
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {imageStorageIds.map((storageId, index) => (
                                                    <div key={storageId} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 shadow-lg hover:border-electric-blue transition-all">
                                                        <ImagePreview
                                                            storageId={storageId}
                                                            index={index}
                                                            onRemove={handleRemoveImage}
                                                            isEditing={true}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-300">Título do Projeto</label>
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                            placeholder="Ex: Dashboard Analytics"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-300">Link Externo</label>
                                        <input
                                            type="url"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-300">Descrição</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all resize-none"
                                        placeholder="Descreva as principais funcionalidades deste projeto..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={isUploading || imageStorageIds.length === 0}
                                        className="w-full py-4 px-6 bg-gradient-to-r from-electric-blue to-cyber-purple text-white font-bold rounded-xl hover:shadow-glow-soft transition-all transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isUploading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Processando...
                                            </>
                                        ) : (
                                            'Publicar Demo'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="max-w-md mx-auto glass-neon border-glow rounded-2xl p-8 shadow-xl">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-soft">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-white">Alterar Senha</h2>
                                <p className="text-gray-400 text-sm mt-2">Mantenha sua conta segura atualizando sua senha periodicamente.</p>
                            </div>

                            <form onSubmit={handlePasswordChange} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Senha Atual</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nova Senha</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Confirmar Nova Senha</label>
                                    <input
                                        type="password"
                                        value={confirmNewPassword}
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-black/40 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue transition-all"
                                    />
                                </div>

                                {passwordMessage && (
                                    <div className={`p-4 rounded-xl text-sm flex items-center ${passwordStatus === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                        {passwordStatus === 'success' ? (
                                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        ) : (
                                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        )}
                                        {passwordMessage}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10 hover:border-white/30"
                                >
                                    Atualizar Senha
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
