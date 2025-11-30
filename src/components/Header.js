import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
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

  const NavLink = ({ to, children }) => {
    const isActive = activeSection === to;

    return isHomePage ? (
      <ScrollLink
        to={to}
        smooth={true}
        duration={500}
        spy={true}
        onSetActive={() => setActiveSection(to)}
        className="relative cursor-pointer transition-all duration-300 font-body font-semibold group"
      >
        <span className={`transition-colors duration-300 ${isActive ? 'text-electric-blue' : 'text-white hover:text-electric-blue'}`}>
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
        className="relative transition-all duration-300 font-body font-semibold group"
      >
        <span className="text-white hover:text-electric-blue transition-colors duration-300">
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-midnight-black/90 backdrop-blur-neon shadow-glow-soft border-b border-soft-neon-glow/20' : 'bg-transparent'
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
          <NavLink to="processos">Processos</NavLink>
          <NavLink to="demos">Demos</NavLink>
          <NavLink to="quem-somos">Quem Somos</NavLink>
          <NavLink to="artigos">Artigos</NavLink>
          <RouterLink
            to="/candidaturas"
            className={`relative transition-all duration-300 font-body font-semibold group ${location.pathname === '/candidaturas' ? 'text-electric-blue' : 'text-white hover:text-electric-blue'}`}
          >
            <span>Candidaturas</span>
            <span
              className={`absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-electric-blue to-neon-purple transition-all duration-300 ease-out ${location.pathname === '/candidaturas' ? 'w-full' : 'w-0 group-hover:w-full'}`}
              style={{ bottom: '-4px' }}
            />
          </RouterLink>
          <NavLink to="contactos">Contactos</NavLink>
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center">
          {isHomePage ? (
            <ScrollLink
              to="contactos"
              smooth={true}
              duration={500}
              className="bg-gradient-primary hover:shadow-glow-medium text-white font-body font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-glow-soft cursor-pointer text-sm"
            >
              Começar
            </ScrollLink>
          ) : (
            <RouterLink
              to="/#contactos"
              className="bg-gradient-primary hover:shadow-glow-medium text-white font-body font-semibold py-2.5 px-6 rounded-full transition-all duration-300 shadow-glow-soft text-sm"
            >
              Começar
            </RouterLink>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full bg-midnight-black/95 backdrop-blur-neon md:hidden transition-all duration-300 ease-in-out border-b border-soft-neon-glow/20 ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="flex flex-col items-center space-y-4 p-6 text-white">
          <NavLink to="home">Home</NavLink>
          <NavLink to="processos">Processos</NavLink>
          <NavLink to="demos">Demos</NavLink>
          <NavLink to="quem-somos">Quem Somos</NavLink>
          <NavLink to="artigos">Artigos</NavLink>
          <RouterLink
            to="/candidaturas"
            onClick={() => setIsMenuOpen(false)}
            className={`relative transition-all duration-300 font-body font-semibold group ${location.pathname === '/candidaturas' ? 'text-electric-blue' : 'text-white hover:text-electric-blue'}`}
          >
            <span>Candidaturas</span>
          </RouterLink>
          <NavLink to="contactos">Contactos</NavLink>

          {/* CTA Button - Mobile */}
          {isHomePage ? (
            <ScrollLink
              to="contactos"
              smooth={true}
              duration={500}
              onClick={() => setIsMenuOpen(false)}
              className="bg-gradient-primary hover:shadow-glow-medium text-white font-body font-semibold py-2.5 px-8 rounded-full transition-all duration-300 shadow-glow-soft cursor-pointer text-sm mt-2"
            >
              Começar
            </ScrollLink>
          ) : (
            <RouterLink
              to="/#contactos"
              onClick={() => setIsMenuOpen(false)}
              className="bg-gradient-primary hover:shadow-glow-medium text-white font-body font-semibold py-2.5 px-8 rounded-full transition-all duration-300 shadow-glow-soft text-sm mt-2"
            >
              Começar
            </RouterLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
