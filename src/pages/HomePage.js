import React, { useEffect } from 'react';
import { scroller } from 'react-scroll';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection'; // Now "O Nosso Processo"
import DemosSection from '../components/sections/DemosSection';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
// import TeamSection from '../components/sections/TeamSection'; // Removed as not in plan/screenshots

const HomePage = () => {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      scroller.scrollTo(hash, {
        duration: 500,
        smooth: true,
      });
    }
  }, []);

  return (
    <main id="home">
      <HeroSection />
      <ServicesSection />
      <DemosSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
};

export default HomePage;
