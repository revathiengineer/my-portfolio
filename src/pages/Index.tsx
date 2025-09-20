import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import { LoadingSpinner, ErrorState } from '@/components/portfolio/LoadingSpinner';

const PortfolioContent: React.FC = () => {
  const { data, loading, error } = usePortfolioData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorState error={error} />;
  if (!data) return <ErrorState error="No portfolio data available" />;

  const heroData = {
    ...data.personal,
    social: data.social,
  };

  const aboutData = {
    personal: data.personal,
    education: data.education,
    certifications: data.certifications,
  };

  const contactData = {
    ...data.personal,
    social: data.social,
  };

  const footerData = {
    ...data.personal,
    social: data.social,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <Hero data={heroData} />
        <About data={aboutData} />
        <Skills data={data.skills} />
        <Projects data={data.projects} />
        <Experience data={data.experience} />
        <Contact data={contactData} />
      </main>
      <Footer data={footerData} />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default Index;
