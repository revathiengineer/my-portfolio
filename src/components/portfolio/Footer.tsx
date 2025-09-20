import React from 'react';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PortfolioData } from '@/hooks/usePortfolioData';

interface FooterProps {
  data: PortfolioData['personal'] & { social: PortfolioData['social'] };
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: data.social.github, label: 'GitHub' },
    { icon: Linkedin, href: data.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: data.social.twitter, label: 'Twitter' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-gradient mb-2">
                {data.name}
              </h3>
              <p className="text-lg text-primary font-semibold mb-3">
                {data.title}
              </p>
              <p className="text-muted-foreground max-w-md leading-relaxed">
                {data.subtitle}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>📍 {data.location}</p>
              <p>✉️ {data.email}</p>
              <p>📱 {data.phone}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Connect */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth text-sm group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-smooth" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Back to Top */}
            <div className="mt-6">
              <Button
                onClick={scrollToTop}
                variant="outline"
                size="sm"
                className="group"
              >
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-smooth" />
                Back to Top
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} {data.name}.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>using React & Tailwind CSS</span>
            </div>

            {/* Tech Stack */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>Built with:</span>
              <span className="font-medium text-primary">React</span>
              <span>•</span>
              <span className="font-medium text-primary">TypeScript</span>
              <span>•</span>
              <span className="font-medium text-primary">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;