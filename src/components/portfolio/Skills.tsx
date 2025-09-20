import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { 
  Code, 
  Server, 
  Database, 
  Palette, 
  Zap, 
  Layers, 
  Code2, 
  HardDrive, 
  GitBranch, 
  Box, 
  Cloud, 
  Figma 
} from 'lucide-react';
import type { PortfolioData } from '@/hooks/usePortfolioData';

interface SkillsProps {
  data: PortfolioData['skills'];
}

const iconMap: Record<string, any> = {
  react: Code,
  code: Code,
  zap: Zap,
  palette: Palette,
  layers: Layers,
  server: Server,
  code2: Code2,
  database: Database,
  'hard-drive': HardDrive,
  'git-branch': GitBranch,
  box: Box,
  cloud: Cloud,
  figma: Figma,
};

const Skills: React.FC<SkillsProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const SkillCard: React.FC<{ 
    title: string; 
    skills: typeof data.frontend;
    delay: number;
  }> = ({ title, skills, delay }) => (
    <Card className={`card-elegant p-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: `${delay}ms` }}>
      <h3 className="text-xl font-semibold mb-6 text-center text-gradient">
        {title}
      </h3>
      <div className="space-y-4">
        {skills.map((skill, index) => {
          const IconComponent = iconMap[skill.icon] || Code;
          return (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-5 h-5 text-primary" />
                  <span className="font-medium">{skill.name}</span>
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  {skill.level}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`skill-bar h-full rounded-full ${
                    isVisible ? 'animate-[width_1.5s_ease-out_forwards]' : 'w-0'
                  }`}
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    animationDelay: `${delay + index * 200}ms`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit built through years of experience and continuous learning.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <SkillCard 
            title="Frontend Development" 
            skills={data.frontend} 
            delay={200}
          />
          <SkillCard 
            title="Backend Development" 
            skills={data.backend} 
            delay={400}
          />
          <SkillCard 
            title="Tools & Platforms" 
            skills={data.tools} 
            delay={600}
          />
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Projects Completed', value: '50+' },
            { label: 'Technologies', value: '20+' },
            { label: 'Happy Clients', value: '30+' },
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${800 + index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;