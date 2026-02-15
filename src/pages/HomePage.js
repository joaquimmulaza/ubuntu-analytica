import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ServicesGridSection from '../components/sections/ServicesGridSection';
import ContactSection from '../components/sections/ContactSection';
import DemosSection from '../components/sections/DemosSection';
import ArticlesSection from '../components/sections/ArticlesSection';
import { useLocation } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';

import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { theme } = useTheme();
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      scroller.scrollTo(id, {
        smooth: true,
        duration: 500,
        offset: -70 // Adjust for header height
      });
    }
  }, [location]);

  return (
    <div className={`transition-colors duration-300 ${theme === 'light' ? 'bg-white' : 'bg-midnight-black'}`}>
      <Element name="home">
        <HeroSection />
      </Element>
      <Element name="servicos">
        <ServicesGridSection />
      </Element>
      <Element name="processos">
        <ServicesSection />
      </Element>
      <Element name="demos">
        <DemosSection />
      </Element>
      <Element name="quem-somos">
        <AboutSection />
      </Element>
      <Element name="artigos">
        <ArticlesSection />
      </Element>
      <Element name="contactos">
        <ContactSection />
      </Element>
    </div>
  );
};

export default HomePage;
