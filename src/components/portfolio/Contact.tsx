import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
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
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, create a mailto link as fallback
      const subject = `Contact from ${formData.name}`;
      const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
      const mailtoLink = `mailto:${data.email}?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon!",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="card-elegant p-8 fade-in-left">
            <h3 className="text-2xl font-semibold mb-6 text-gradient">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="transition-smooth focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or just say hello..."
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="transition-smooth focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="cta"
                size="lg"
                disabled={isSubmitting}
                className="w-full group"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8 fade-in-right">
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