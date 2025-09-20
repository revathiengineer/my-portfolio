import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import type { PortfolioData } from '@/hooks/usePortfolioData';
import profileAvatar from '@/assets/profile-avatar.jpg';

interface HeroProps {
  data: PortfolioData['personal'] & { social: PortfolioData['social'] };
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    // In a real app, this would download an actual resume file
    console.log('Downloading resume...');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 fade-in-left">
            <div className="space-y-4">
              <p className="text-primary font-semibold text-lg">Hello, I'm</p>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {data.name}
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-gradient">
                {data.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-lg">
                {data.subtitle}
              </p>
              <p className="text-lg text-foreground/80 max-w-lg leading-relaxed">
                {data.bio}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToContact}
                variant="cta"
                size="lg"
                className="group"
              >
                Get in touch
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button
                onClick={downloadResume}
                variant="outline"
                size="lg"
                className="group"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-smooth" />
                Download Resume
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a
                href={data.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href={data.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href={`mailto:${data.email}`}
                className="text-muted-foreground hover:text-primary transition-smooth hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end fade-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-hero-gradient rounded-full blur-2xl opacity-30 scale-110 animate-pulse" />
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 hover:border-primary/40 transition-smooth shadow-elegant">
                <img
                  src={profileAvatar}
                  alt={`${data.name} - ${data.title}`}
                  className="w-full h-full object-cover transition-smooth hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;