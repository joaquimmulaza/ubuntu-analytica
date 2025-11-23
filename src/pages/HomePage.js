import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ServicesSection from '../components/sections/ServicesSection';
import ContactSection from '../components/sections/ContactSection';
import DemosSection from '../components/sections/DemosSection';
import ArticlesSection from '../components/sections/ArticlesSection';
import { Element } from 'react-scroll';

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      <Element name="home">
        <HeroSection />
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
