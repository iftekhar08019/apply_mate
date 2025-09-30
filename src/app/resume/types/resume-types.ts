export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Skills {
  frontend: string;
  backend: string;
  tools: string;
  softSkills: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  type: string;
  liveLink: string;
  clientLink?: string;
  serverLink?: string;
  date: string;
  description: string[];
  techStack: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface GenericSection {
  id: string;
  title: string;
  content: string;
  type: 'generic';
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: Skills;
  experiences: Experience[];
  projects: Project[];
  education: Education;
  languages: string;
  genericSections: GenericSection[];
  sectionOrder: string[];
  activeSections: string[];
}

export type SectionType = 'skills' | 'experiences' | 'projects' | 'education' | 'languages' | 'generic';

export interface AvailableSection {
  id: string;
  title: string;
  description: string;
  type: SectionType;
}
