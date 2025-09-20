import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye, Code, Filter } from 'lucide-react';
import type { PortfolioData } from '@/hooks/usePortfolioData';

interface ProjectsProps {
  data: PortfolioData['projects'];
}

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  const [filter, setFilter] = useState<'all' | 'featured' | 'completed' | 'in-development'>('all');
  
  const filteredProjects = data.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    if (filter === 'completed') return project.status === 'Completed';
    if (filter === 'in-development') return project.status === 'In Development';
    return true;
  });

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'featured', label: 'Featured' },
    { key: 'completed', label: 'Completed' },
    { key: 'in-development', label: 'In Development' },
  ] as const;

  const ProjectCard: React.FC<{ project: PortfolioData['projects'][0]; index: number }> = ({ 
    project, 
    index 
  }) => (
    <Card className="card-elegant overflow-hidden group fade-in-up"
          style={{ animationDelay: `${index * 200}ms` }}>
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {/* Status Badge */}
        <Badge 
          variant={project.status === 'Completed' ? 'default' : 'secondary'}
          className="absolute top-4 right-4"
        >
          {project.status}
        </Badge>
        
        {/* Featured Badge */}
        {project.featured && (
          <Badge 
            variant="secondary"
            className="absolute top-4 left-4 bg-primary/90 text-primary-foreground"
          >
            Featured
          </Badge>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-smooth">
          {project.liveUrl && (
            <Button
              size="sm"
              variant="glass"
              asChild
              className="backdrop-blur-md"
            >
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <Eye className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
          )}
          <Button
            size="sm"
            variant="glass"
            asChild
            className="backdrop-blur-md"
          >
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Code
            </a>
          </Button>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-smooth">
            {project.name}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex gap-2">
            {project.liveUrl && (
              <Button size="sm" variant="ghost" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
            <Button size="sm" variant="ghost" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
          </div>
          
          <Button size="sm" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of projects that showcase my skills and passion for creating 
            exceptional digital experiences.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(key)}
              className="transition-smooth"
            >
              <Filter className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Code className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filter to see more projects.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">
              Interested in working together?
              <ExternalLink className="w-5 h-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;