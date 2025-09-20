import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  ExternalLink 
} from 'lucide-react';
import type { PortfolioData } from '@/hooks/usePortfolioData';

interface ContactProps {
  data: PortfolioData['personal'] & { social: PortfolioData['social'] };
}

const Contact: React.FC<ContactProps> = ({ data }) => {

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: data.email,
      href: `mailto:${data.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data.phone,
      href: `tel:${data.phone}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data.location,
      href: null,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: data.social.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: data.social.linkedin,
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: data.social.twitter,
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on your next project? Let's discuss how we can 
            bring your ideas to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8 fade-in-up">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gradient">
                Contact Information
              </h3>
              
              {contactMethods.map((method) => {
                const IconComponent = method.icon;
                const content = (
                  <div className="flex items-center space-x-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {method.label}
                      </div>
                      <div className="text-muted-foreground">
                        {method.value}
                      </div>
                    </div>
                  </div>
                );

                return method.href ? (
                  <a
                    key={method.label}
                    href={method.href}
                    className="block hover:scale-105 transition-smooth"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={method.label}>
                    {content}
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                Follow Me
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-lg border border-border hover:border-primary transition-smooth hover:shadow-elegant"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground group-hover:text-primary transition-smooth">
                          {social.label}
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-smooth" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Available for Work
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Currently accepting new projects and collaborations. 
                    Let's discuss your ideas!
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;