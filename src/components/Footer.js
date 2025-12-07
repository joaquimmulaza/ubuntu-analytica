import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { theme } = useTheme();

  const NavLink = ({ to, children }) => {
    return isHomePage ? (
      <ScrollLink to={to} smooth={true} duration={500} className="hover:text-[#FFFFFF] cursor-pointer transition-all duration-300 font-body text-sm text-[#FFFFFF]/60">
        {children}
      </ScrollLink>
    ) : (
      <RouterLink to={`/#${to}`} className="hover:text-[#FFFFFF] transition-all duration-300 font-body text-sm text-[#FFFFFF]/60">
        {children}
      </RouterLink>
    );
  };

  return (
    <footer className={`${theme === 'light' ? 'bg-ubuntu-blue' : 'bg-midnight-black'} text-[#FFFFFF] relative transition-colors duration-300`}>
      {/* Laser Separator */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-blue to-transparent opacity-50"></div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <img src="/img/logo_branco.png" alt="Ubuntu Analytica Logo" className="h-12" />
            <p className="text-[#FFFFFF]/60 text-sm font-body leading-relaxed">
              Data Intelligence para a Lusofonia
            </p>
            <a
              href="mailto:contacto@ubuntu-analytica.com"
              className="flex items-center text-[#FFFFFF]/60 hover:text-[#FFFFFF] transition-all duration-300 text-sm font-body group"
            >
              <svg className="w-4 h-4 mr-2 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              contacto@ubuntu-analytica.com
            </a>
          </div>

          {/* Column 2 - Links Principais */}
          <div>
            <h3 className="font-heading font-extrabold mb-6 text-[#FFFFFF] text-sm uppercase tracking-wider">
              Links Principais
            </h3>
            <nav className="flex flex-col space-y-3">
              <NavLink to="home">Home</NavLink>
              <NavLink to="processos">Processos</NavLink>
              <NavLink to="demos">Demos</NavLink>
              <NavLink to="quem-somos">Equipa</NavLink>
              <NavLink to="artigos">Artigos</NavLink>
              <NavLink to="contactos">Contactos</NavLink>
            </nav>
          </div>

          {/* Column 3 - Localizações */}
          <div>
            <h3 className="font-heading font-extrabold mb-6 text-[#FFFFFF] text-sm uppercase tracking-wider">
              Localizações
            </h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start group">
                <svg className="w-4 h-4 mr-3 mt-0.5 text-electric-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-[#FFFFFF]/60 text-sm font-body group-hover:text-[#FFFFFF] transition-colors">Porto, Portugal</span>
              </div>
              <div className="flex items-start group">
                <svg className="w-4 h-4 mr-3 mt-0.5 text-electric-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="text-[#FFFFFF]/60 text-sm font-body group-hover:text-[#FFFFFF] transition-colors">Luanda, Angola</span>
              </div>
            </div>
          </div>

          {/* Column 4 - Conectar-se */}
          <div>
            <h3 className="font-heading font-extrabold mb-6 text-[#FFFFFF] text-sm uppercase tracking-wider">
              Conectar-se
            </h3>
            <div className="space-y-6">
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/company/ubuntu-analytica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFFFFF]/5 p-3 rounded-lg border border-[#FFFFFF]/10 text-[#FFFFFF]/60 hover:text-[#FFFFFF] hover:border-electric-blue transition-all hover:shadow-glow-soft"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ubuntuanalytica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FFFFFF]/5 p-3 rounded-lg border border-[#FFFFFF]/10 text-[#FFFFFF]/60 hover:text-[#FFFFFF] hover:border-electric-blue transition-all hover:shadow-glow-soft"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>

              {/* CTA Button */}
              <ScrollLink
                to="contactos"
                smooth={true}
                duration={500}
                className="w-full bg-gradient-primary hover:shadow-glow-medium text-[#FFFFFF] font-body font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center shadow-glow-soft cursor-pointer text-sm"
              >
                Vamos Começar
              </ScrollLink>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#FFFFFF]/60 text-xs font-body">
              © 2025 Ubuntu Analytica. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-xs font-body">
              <a href="#" className="text-[#FFFFFF]/60 hover:text-[#FFFFFF] transition-all duration-300">
                Política de Privacidade
              </a>
              <a href="#" className="text-[#FFFFFF]/60 hover:text-[#FFFFFF] transition-all duration-300">
                Termos de Serviço
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
