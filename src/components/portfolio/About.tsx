import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  GraduationCap, 
  Award, 
  Calendar,
  MapPin
} from 'lucide-react';
import type { PortfolioData } from '@/hooks/usePortfolioData';

interface AboutProps {
  data: {
    personal: PortfolioData['personal'];
    education: PortfolioData['education'];
    certifications: PortfolioData['certifications'];
  };
}

const About: React.FC<AboutProps> = ({ data }) => {
  const { personal, education, certifications } = data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  return (
    <section id="about" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about creating digital experiences that make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card className="card-elegant p-8 fade-in-left">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-gradient">
                  My Story
                </h3>
              </div>
              
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  {personal.bio}
                </p>
                <p>
                  My journey in technology began during my university years, where I discovered 
                  my passion for problem-solving through code. Since then, I've had the privilege 
                  of working with diverse teams and clients, building everything from startup MVPs 
                  to enterprise-scale applications.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to 
                  open-source projects, or mentoring aspiring developers. I believe in the power 
                  of continuous learning and enjoy staying up-to-date with the latest industry trends.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{personal.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">5+ Years</span>
                </div>
              </div>
            </Card>

            {/* Education */}
            {education.length > 0 && (
              <Card className="card-elegant p-8 fade-in-left" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gradient">
                    Education
                  </h3>
                </div>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-6 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-2 top-1" />
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-foreground">
                          {edu.degree}
                        </h4>
                        <p className="text-primary font-medium">
                          {edu.school}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{edu.location}</span>
                          </div>
                        </div>
                        
                        {edu.gpa && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">GPA:</span>
                            <span className="font-medium ml-2">{edu.gpa}</span>
                          </p>
                        )}
                        
                        {edu.honors && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {edu.honors.map((honor) => (
                              <Badge key={honor} variant="outline" className="text-xs">
                                {honor}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Certifications */}
            {certifications.length > 0 && (
              <Card className="card-elegant p-6 fade-in-right">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gradient">
                    Certifications
                  </h3>
                </div>

                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-smooth">
                      <h4 className="font-semibold text-foreground mb-1">
                        {cert.name}
                      </h4>
                      <p className="text-primary text-sm font-medium mb-2">
                        {cert.issuer}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{formatDate(cert.date)}</span>
                        <span>ID: {cert.credentialId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;