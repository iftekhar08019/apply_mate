"use client";

import { useState } from "react";
import ResumePreview from "./components/resume-preview";
import SectionReorderer from "./components/section-reorderer";
import SectionSidebar from "./components/section-sidebar";
import SingleSectionForm from "./components/single-section-form";
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

  const [selectedSection, setSelectedSection] = useState<string | null>('personal');

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        
        {/* Top Section - Section Navigation and Order */}
        <div className="mb-6 space-y-4">
          {/* Section Navigation */}
          <SectionSidebar
            availableSections={availableSections}
            activeSections={resumeData.activeSections}
            selectedSection={selectedSection}
            onSelectSection={setSelectedSection}
            onAddSection={handleAddSection}
            onRemoveSection={handleRemoveSection}
            onAddGenericSection={handleAddGenericSection}
          />
          
          {/* Section Reorderer - Horizontal Layout */}
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
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 lg:gap-6 min-h-[calc(100vh-400px)]">
          {/* Left Column - Section Form - Full width on mobile/tablet, 1/3 on desktop */}
          <div className="xl:col-span-4 order-2 xl:order-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 lg:p-4 h-full">
              <h2 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4">
                {selectedSection === 'personal' ? 'Personal Information' : 
                 selectedSection ? `${availableSections.find(s => s.id === selectedSection)?.title || 'Section'} Details` : 
                 'Resume Information'}
              </h2>
              <SingleSectionForm 
                resumeData={resumeData} 
                selectedSection={selectedSection}
                updateResumeData={updateResumeData}
                updateGenericSection={handleUpdateGenericSection}
                removeGenericSection={handleRemoveGenericSection}
              />
            </div>
          </div>
          
          {/* Right Column - Preview - Full width on mobile/tablet, 2/3 on desktop */}
          <div className="xl:col-span-8 order-1 xl:order-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 lg:p-4 h-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 lg:mb-4 gap-2">
                <h2 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                  Live Preview
                </h2>
                <div className="flex-shrink-0">
                  <PDFDownload fileName={`${resumeData.personalInfo.name || 'resume'}`} />
                </div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <ResumePreview 
                    resumeData={resumeData} 
                    sectionVisibility={sectionVisibility}
                  />
                </div>
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
