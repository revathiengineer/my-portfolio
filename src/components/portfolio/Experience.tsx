import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Briefcase, CheckCircle } from 'lucide-react';
import type { PortfolioData } from '@/hooks/usePortfolioData';

interface ExperienceProps {
  data: PortfolioData['experience'];
}

const Experience: React.FC<ExperienceProps> = ({ data }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const ExperienceCard: React.FC<{ 
    experience: PortfolioData['experience'][0];
    index: number;
  }> = ({ experience, index }) => (
    <div className="relative">
      {/* Timeline Line */}
      {index < data.length - 1 && (
        <div className="absolute left-6 top-20 w-0.5 h-full bg-border -z-10" />
      )}
      
      {/* Timeline Dot */}
      <div className="absolute left-4 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
      
      <Card className={`ml-16 card-elegant fade-in-up`}
            style={{ animationDelay: `${index * 200}ms` }}>
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-semibold text-foreground">
                {experience.position}
              </h3>
              {experience.current && (
                <Badge variant="default" className="ml-2">
                  Current
                </Badge>
              )}
            </div>
            
            <div className="space-y-1 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span className="font-medium text-primary">
                  {experience.company}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-foreground/80 mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Achievements */}
          {experience.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-3 text-foreground">
                Key Achievements:
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80 text-sm leading-relaxed">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          <div>
            <h4 className="font-semibold mb-3 text-foreground">
              Technologies Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <section id="experience" className="py-20 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey through roles that have shaped my expertise and passion for technology.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-8">
          {data.map((experience, index) => (
            <ExperienceCard 
              key={experience.id} 
              experience={experience} 
              index={index}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <div className="text-muted-foreground">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100K+</div>
            <div className="text-muted-foreground">Users Impacted</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;