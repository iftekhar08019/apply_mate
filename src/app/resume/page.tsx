"use client";

import { useState } from "react";
import ResumeForm from "./components/resume-form";
import ResumePreview from "./components/resume-preview";
import SectionReorderer from "./components/section-reorderer";
import SectionSelector from "./components/section-selector";
import PDFDownload from "./components/pdf-download";
import { ResumeData, AvailableSection, GenericSection } from "./types/resume-types";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      title: "",
      location: "",
      phone: "",
      email: "",
      linkedin: "",
      github: "",
      portfolio: ""
    },
    skills: {
      frontend: "",
      backend: "",
      tools: "",
      softSkills: ""
    },
    experiences: [],
    projects: [],
    education: {
      institution: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: ""
    },
    languages: "",
    genericSections: [],
    sectionOrder: ['skills', 'experiences', 'projects', 'education', 'languages'],
    activeSections: []
  });

  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    skills: true,
    experiences: true,
    projects: true,
    education: true,
    languages: true
  });

  const availableSections: AvailableSection[] = [
    {
      id: 'skills',
      title: 'Skills',
      description: 'Technical skills, tools, and competencies',
      type: 'skills'
    },
    {
      id: 'experiences',
      title: 'Work Experience',
      description: 'Professional work history and achievements',
      type: 'experiences'
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Personal and professional projects',
      type: 'projects'
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Academic background and qualifications',
      type: 'education'
    },
    {
      id: 'languages',
      title: 'Languages',
      description: 'Language proficiencies',
      type: 'languages'
    }
  ];

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSectionReorder = (newOrder: string[]) => {
    setResumeData(prev => ({
      ...prev,
      sectionOrder: newOrder
    }));
  };

  const handleToggleVisibility = (section: string) => {
    setSectionVisibility(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAddSection = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      activeSections: [...prev.activeSections, sectionId]
    }));
  };

  const handleRemoveSection = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      activeSections: prev.activeSections.filter(id => id !== sectionId)
    }));
  };

  const handleAddGenericSection = (title: string) => {
    const newSection: GenericSection = {
      id: `generic_${Date.now()}`,
      title,
      content: '',
      type: 'generic'
    };
    
    setResumeData(prev => ({
      ...prev,
      genericSections: [...prev.genericSections, newSection],
      activeSections: [...prev.activeSections, newSection.id]
    }));
  };

  const handleUpdateGenericSection = (updatedSection: GenericSection) => {
    setResumeData(prev => ({
      ...prev,
      genericSections: prev.genericSections.map(section => 
        section.id === updatedSection.id ? updatedSection : section
      )
    }));
  };

  const handleRemoveGenericSection = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      genericSections: prev.genericSections.filter(section => section.id !== sectionId),
      activeSections: prev.activeSections.filter(id => id !== sectionId)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your professional resume with our easy-to-use builder
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-300px)]">
          {/* Left Column - Form and Section Management - 1/3 width on large screens */}
          <div className="lg:col-span-4 space-y-4">
            {/* Section Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <SectionSelector
                availableSections={availableSections}
                activeSections={resumeData.activeSections}
                onAddSection={handleAddSection}
                onRemoveSection={handleRemoveSection}
                onAddGenericSection={handleAddGenericSection}
              />
            </div>
            
            {/* Section Reorderer */}
            {resumeData.activeSections.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <SectionReorderer
                  sectionOrder={resumeData.activeSections}
                  onReorder={handleSectionReorder}
                  sectionVisibility={sectionVisibility}
                  onToggleVisibility={handleToggleVisibility}
                />
              </div>
            )}
            
            {/* Resume Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Resume Information
              </h2>
              <ResumeForm 
                resumeData={resumeData} 
                updateResumeData={updateResumeData}
                updateGenericSection={handleUpdateGenericSection}
                removeGenericSection={handleRemoveGenericSection}
              />
            </div>
          </div>
          
          {/* Right Column - Preview Section - 2/3 width on large screens */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-h-[600px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Live Preview
                </h2>
                <PDFDownload fileName={`${resumeData.personalInfo.name || 'resume'}`} />
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <ResumePreview 
                  resumeData={resumeData} 
                  sectionVisibility={sectionVisibility}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom spacing to prevent footer overlap */}
        <div className="h-16"></div>
      </div>
    </div>
  );
}
