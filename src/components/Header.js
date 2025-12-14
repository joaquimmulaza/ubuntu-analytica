import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const NavLink = ({ to, children }) => {
    const isActive = activeSection === to;

    return isHomePage ? (
      <ScrollLink
        to={to}
        smooth={true}
        duration={500}
        spy={true}
        onSetActive={() => setActiveSection(to)}
        onClick={() => setIsMenuOpen(false)}
        className="relative cursor-pointer transition-all duration-300 font-body font-semibold group"
      >
        <span className={`transition-colors duration-300 ${theme === 'light'
          ? 'text-[#FFFFFF]'
          : (isActive ? 'text-electric-blue' : 'text-white hover:text-electric-blue')
          }`}>
          {children}
        </span>
        <span
          className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
            }`}
          style={{ bottom: '-4px' }}
        />
      </ScrollLink>
    ) : (
      <RouterLink
        to={`/#${to}`}
        onClick={() => setIsMenuOpen(false)}
        className="relative transition-all duration-300 font-body font-semibold group"
      >
        <span className={`transition-colors duration-300 ${theme === 'light' ? 'text-[#FFFFFF]' : 'text-white hover:text-electric-blue'
          }`}>
          {children}
        </span>
        <span
          className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple w-0 group-hover:w-full transition-all duration-300 ease-out"
          style={{ bottom: '-4px' }}
        />
      </RouterLink>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${theme === 'light'
        ? 'bg-ubuntu-blue shadow-glow-soft'
        : (scrolled ? 'bg-midnight-black/90 backdrop-blur-neon shadow-glow-soft border-b border-soft-neon-glow/20' : 'bg-transparent')
        }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <RouterLink to="/">
            <img src="/img/logo_branco.png" alt="Ubuntu Analytica Logo" className="h-12" />
          </RouterLink>
        </div>

        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-light text-sm text-white flex-1 justify-center">
          <NavLink to="home">Home</NavLink>
          <RouterLink
            to="/servicos"
            className={`relative transition-all duration-300 font-body font-semibold group ${theme === 'light'
              ? 'text-[#FFFFFF]'
              : (location.pathname === '/servicos' ? 'text-electric-blue' : 'text-white hover:text-electric-blue')
              }`}
          >
            <span>Serviços</span>
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple transition-all duration-300 ease-out ${location.pathname === '/servicos' ? 'w-full' : 'w-0 group-hover:w-full'}`}
              style={{ bottom: '-4px' }}
            />
          </RouterLink>
          <NavLink to="processos">Processos</NavLink>
          <NavLink to="quem-somos">Sobre Nós</NavLink>
          {/* <NavLink to="artigos">Artigos</NavLink> */}
          <RouterLink
            to="/candidaturas"
            className={`relative transition-all duration-300 font-body font-semibold group ${theme === 'light'
              ? 'text-[#FFFFFF]'
              : (location.pathname === '/candidaturas' ? 'text-electric-blue' : 'text-white hover:text-electric-blue')
              }`}
          >
            <span>Candidaturas</span>
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple transition-all duration-300 ease-out ${location.pathname === '/candidaturas' ? 'w-full' : 'w-0 group-hover:w-full'}`}
              style={{ bottom: '-4px' }}
            />
          </RouterLink>
          {/* <NavLink to="contactos">Contactos</NavLink> */}
        </nav>

        {/* Theme Toggle */}
        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#FFFFFF] focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div ref={menuRef} className={`absolute top-full left-0 w-full backdrop-blur-neon md:hidden transition-all duration-300 ease-in-out border-b border-soft-neon-glow/20 ${theme === 'light' ? 'bg-ubuntu-blue' : 'bg-midnight-black/95'
        } ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="flex flex-col items-center space-y-4 p-6 text-white">
          <NavLink to="home">Home</NavLink>
          <RouterLink
            to="/servicos"
            onClick={() => setIsMenuOpen(false)}
            className={`relative transition-all duration-300 font-body font-semibold group ${theme === 'light'
              ? 'text-[#FFFFFF]'
              : (location.pathname === '/servicos' ? 'text-electric-blue' : 'text-white hover:text-electric-blue')
              }`}
          >
            <span>Serviços</span>
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple transition-all duration-300 ease-out ${location.pathname === '/servicos' ? 'w-full' : 'w-0 group-hover:w-full'}`}
              style={{ bottom: '-4px' }}
            />
          </RouterLink>
          <NavLink to="processos">Processos</NavLink>
          {/* <NavLink to="demos">Demos</NavLink> */}
          <NavLink to="quem-somos">Sobre Nós</NavLink>
          {/* <NavLink to="artigos">Artigos</NavLink> */}
          <RouterLink
            to="/candidaturas"
            onClick={() => setIsMenuOpen(false)}
            className={`relative transition-all duration-300 font-body font-semibold group ${theme === 'light'
              ? 'text-[#FFFFFF]'
              : (location.pathname === '/candidaturas' ? 'text-electric-blue' : 'text-white hover:text-electric-blue')
              }`}
          >
            <span>Candidaturas</span>
          </RouterLink>
          {/* <NavLink to="contactos">Contactos</NavLink> */}



          {/* Theme Toggle - Mobile */}
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
