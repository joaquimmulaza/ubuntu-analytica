import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
        // Default to dark mode
        return 'dark';
    });

    useEffect(() => {
        // Apply theme to document
        console.log('🎨 Theme changed to:', theme);
        document.documentElement.setAttribute('data-theme', theme);
        console.log('✅ data-theme attribute set on <html>:', document.documentElement.getAttribute('data-theme'));
        // Save to localStorage
        localStorage.setItem('theme', theme);
        console.log('💾 Theme saved to localStorage');
    }, [theme]);

    const toggleTheme = () => {
        console.log('🔄 Toggle theme clicked');
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            console.log('Switching from', prevTheme, 'to', newTheme);
            return newTheme;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
