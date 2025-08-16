import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Footer = () => {
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
    <footer className="bg-[#010314] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <img src="/img/logo_branco.png" alt="Ubuntu Analytica Logo" className="h-10 mb-4" />
          </div>
          <div className="col-span-1">
            <h3 className="font-bold mb-4">Serviços</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink to="servicos" className="hover:text-gray-300">Consultoria em Business Intelligence</NavLink>
              <NavLink to="servicos" className="hover:text-gray-300">Desenvolvimento de Dashboards e Visualizações Interativas</NavLink>
              <NavLink to="servicos" className="hover:text-gray-300">ETL e Integração de Dados</NavLink>
              <NavLink to="servicos" className="hover:text-gray-300">Big Data e Processamento Massivo</NavLink>
              <NavLink to="servicos" className="hover:text-gray-300">Governança e Qualidade de Dados</NavLink>
              <NavLink to="servicos" className="hover:text-gray-300">Data Warehousing</NavLink>
            </nav>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold mb-4">A Nossa Empresa</h3>
            <nav className="flex flex-col space-y-2">
              
              <NavLink to="quem-somos" className="hover:text-gray-300">Quem somos</NavLink>
              <Link to="" className="hover:text-gray-300">Contactos</Link>
            </nav>
          </div>
          <div className="col-span-1">
            <h3 className="font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/ubuntu-analytica/about/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/ubuntuanalytica?igsh=MXMxY2YxdGdtc2dueg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; 2025 Ubuntu Analytica. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
