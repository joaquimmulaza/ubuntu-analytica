import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    return isHomePage ? (
      <ScrollLink to={to} smooth={true} duration={500} className="hover:text-gray-300 cursor-pointer">
        {children}
      </ScrollLink>
    ) : (
      <RouterLink to={`/#${to}`} className="hover:text-gray-300">
        {children}
      </RouterLink>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#010314]/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <RouterLink to="/">
            <img src="/img/logo_branco.png" alt="Ubuntu Analytica Logo" className="h-12 mr-4" />
          </RouterLink>
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-light text-sm text-white">
          <NavLink to="home">Home</NavLink>
          <NavLink to="processos">Processos</NavLink>
          <NavLink to="demos">Demos</NavLink>
          <NavLink to="quem-somos">Quem Somos</NavLink>
          <NavLink to="artigos">Artigos</NavLink>
          <NavLink to="contactos">Contactos</NavLink>
        </nav>
        <div className="hidden md:flex items-center">
          {/* Language Selector Placeholder - based on screenshot */}
          {/* <div className="text-sm mr-4">inglês | português</div> */}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full bg-[#010314] md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <nav className="flex flex-col items-center space-y-4 p-4 text-white">
          <NavLink to="home">Home</NavLink>
          <NavLink to="processos">Processos</NavLink>
          <RouterLink to="/demos" className="hover:text-gray-300">Demos</RouterLink>
          <NavLink to="quem-somos">Quem Somos</NavLink>
          <NavLink to="artigos">Artigos</NavLink>
          <NavLink to="contactos">Contactos</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
