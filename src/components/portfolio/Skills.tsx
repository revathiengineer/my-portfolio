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
      <div className="grid grid-cols-2 gap-4">
        {skills.map((skill) => {
          const IconComponent = iconMap[skill.icon] || Code;
          return (
            <div key={skill.name} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
              <IconComponent className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="font-medium text-foreground">{skill.name}</span>
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

      </div>
    </section>
  );
};

export default Skills;