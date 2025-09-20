import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    subtitle: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    avatar: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website: string;
  };
  skills: {
    frontend: Skill[];
    backend: Skill[];
    tools: Skill[];
  };
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  image: string;
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string;
  featured: boolean;
  status: 'Completed' | 'In Development' | 'Planned';
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate async loading (in a real app, this might be an API call)
      setTimeout(() => {
        setData(portfolioData as PortfolioData);
        setLoading(false);
      }, 100);
    } catch (err) {
      setError('Failed to load portfolio data');
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
};