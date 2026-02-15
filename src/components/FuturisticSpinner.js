import React from 'react';
import { motion } from 'framer-motion';

const FuturisticSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
            {/* Main Rotating Container */}
            <div className="relative w-24 h-24">

                {/* Outer Ring - Electric Blue */}
                <motion.div
                    className="absolute inset-0 rounded-full border-t-4 border-l-2 border-electric-blue opacity-80"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />

                {/* Middle Ring - Neon Coral */}
                <motion.div
                    className="absolute inset-2 rounded-full border-r-4 border-b-2 border-neon-coral opacity-70"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner Ring - Cyber Purple */}
                <motion.div
                    className="absolute inset-4 rounded-full border-t-4 border-r-2 border-cyber-purple opacity-90"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />

                {/* Core Pulsing Dot */}
                <motion.div
                    className="absolute inset-0 m-auto w-4 h-4 bg-white rounded-full shadow-glow-strong"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Loading Text with Glitch Effect */}
            <motion.div
                className="mt-8 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-xl font-heading font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-cyber-purple to-neon-coral animate-pulse">
                    
                </span>
                {/* Decorative underline */}
                <motion.div
                    className="h-0.5 bg-gradient-to-r from-transparent via-electric-blue to-transparent mt-2 w-full"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </div>
    );
};

export default FuturisticSpinner;
