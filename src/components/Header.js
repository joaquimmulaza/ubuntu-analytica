import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
    <header className="bg-[#010314] text-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <RouterLink to="/">
            <img src="/img/logo_branco.png" alt="Ubuntu Analytica Logo" className="h-10 mr-4" />
          </RouterLink>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="home">Home</NavLink>
          <NavLink to="servicos">Serviços</NavLink>
          <NavLink to="quem-somos">Quem somos</NavLink>
          <RouterLink to="/demos" className="hover:text-gray-300">Demos</RouterLink>
          <NavLink to="contactos">Ajuda</NavLink>
        </nav>
        <div className="hidden md:flex items-center">
          <button className="bg-white btn-meating text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200">
            Solicitar Reunião
          </button>
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
        <nav className="flex flex-col items-center space-y-4 p-4">
          <NavLink to="home">Home</NavLink>
          <NavLink to="servicos">Serviços</NavLink>
          <NavLink to="quem-somos">Quem somos</NavLink>
          <RouterLink to="/demos" className="hover:text-gray-300">Demos</RouterLink>
          <NavLink to="contactos">Ajuda</NavLink>
          <button className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-gray-200 mt-4">
            Solicitar Reunião
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
