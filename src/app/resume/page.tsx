"use client";

import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import ResumePreview from "./components/resume-preview";
import SectionReorderer from "./components/section-reorderer";
import SectionSidebar from "./components/section-sidebar";
import SingleSectionForm from "./components/single-section-form";
import PDFDownload from "./components/pdf-download";
import { ResumeData, AvailableSection, GenericSection } from "./types/resume-types";

const STORAGE_KEY = 'resume_builder_data';
const STORAGE_KEY_VISIBILITY = 'resume_builder_visibility';
const STORAGE_KEY_SELECTED_SECTION = 'resume_builder_selected_section';

// Helper function to get default resume data
function getDefaultResumeData(): ResumeData {
  return {
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
  };
}

export default function ResumeBuilder() {
  // Initialize state with default values
  const getInitialResumeData = (): ResumeData => {
    if (typeof window === 'undefined') {
      return getDefaultResumeData();
    }
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading resume data from localStorage:', error);
    }
    
    return getDefaultResumeData();
  };

  const getInitialVisibility = (): Record<string, boolean> => {
    if (typeof window === 'undefined') {
      return {
        skills: true,
        experiences: true,
        projects: true,
        education: true,
        languages: true
      };
    }
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_VISIBILITY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading visibility data from localStorage:', error);
    }
    
    return {
      skills: true,
      experiences: true,
      projects: true,
      education: true,
      languages: true
    };
  };

  const getInitialSelectedSection = (): string | null => {
    if (typeof window === 'undefined') {
      return 'personal';
    }
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SELECTED_SECTION);
      return stored || 'personal';
    } catch (error) {
      console.error('Error loading selected section from localStorage:', error);
    }
    
    return 'personal';
  };

  const [resumeData, setResumeData] = useState<ResumeData>(getInitialResumeData);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>(getInitialVisibility);
  const [selectedSection, setSelectedSection] = useState<string | null>(getInitialSelectedSection);

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        // Only show toast after initial load (not on first mount)
        const isInitialLoad = sessionStorage.getItem('resume_initial_load');
        if (isInitialLoad) {
          toast.success('Changes saved', {
            duration: 1000,
            icon: '💾',
          });
        } else {
          sessionStorage.setItem('resume_initial_load', 'true');
        }
      } catch (error) {
        console.error('Error saving resume data to localStorage:', error);
        toast.error('Failed to save changes');
      }
    }
  }, [resumeData]);

  // Save section visibility to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_VISIBILITY, JSON.stringify(sectionVisibility));
      } catch (error) {
        console.error('Error saving visibility data to localStorage:', error);
      }
    }
  }, [sectionVisibility]);

  // Save selected section to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && selectedSection) {
      try {
        localStorage.setItem(STORAGE_KEY_SELECTED_SECTION, selectedSection);
      } catch (error) {
        console.error('Error saving selected section to localStorage:', error);
      }
    }
  }, [selectedSection]);

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
    const sectionName = availableSections.find(s => s.id === sectionId)?.title || 'Section';
    toast.success(`${sectionName} added`, {
      icon: '✅',
    });
  };

  const handleRemoveSection = (sectionId: string) => {
    const sectionName = availableSections.find(s => s.id === sectionId)?.title || 'Section';
    setResumeData(prev => ({
      ...prev,
      activeSections: prev.activeSections.filter(id => id !== sectionId)
    }));
    toast.success(`${sectionName} removed`, {
      icon: '🗑️',
    });
  };

  const handleAddGenericSection = (title: string) => {
    const newSection: GenericSection = {
      id: `generic_${Date.now()}`,
      title,
      entries: [],
      type: 'generic'
    };
    
    setResumeData(prev => ({
      ...prev,
      genericSections: [...prev.genericSections, newSection],
      activeSections: [...prev.activeSections, newSection.id]
    }));

    // Select the newly added section
    setSelectedSection(newSection.id);
    
    toast.success(`${title} section created`, {
      icon: '✨',
    });
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
    const section = resumeData.genericSections.find(s => s.id === sectionId);
    setResumeData(prev => ({
      ...prev,
      genericSections: prev.genericSections.filter(section => section.id !== sectionId),
      activeSections: prev.activeSections.filter(id => id !== sectionId)
    }));
    if (section) {
      toast.success(`${section.title} section removed`, {
        icon: '🗑️',
      });
    }
  };

  const handleClearAllData = () => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            Clear All Resume Data?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This will delete all your resume information. This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => {
              toast.dismiss(t.id);
            }}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Clear localStorage
              if (typeof window !== 'undefined') {
                try {
                  localStorage.removeItem(STORAGE_KEY);
                  localStorage.removeItem(STORAGE_KEY_VISIBILITY);
                  localStorage.removeItem(STORAGE_KEY_SELECTED_SECTION);
                } catch (error) {
                  console.error('Error clearing localStorage:', error);
                  toast.error('Failed to clear data');
                  toast.dismiss(t.id);
                  return;
                }
              }
              
              // Reset state to defaults
              setResumeData(getDefaultResumeData());
              setSectionVisibility({
                skills: true,
                experiences: true,
                projects: true,
                education: true,
                languages: true
              });
              setSelectedSection('personal');
              
              toast.dismiss(t.id);
              toast.success('All resume data has been cleared', {
                icon: '🗑️',
              });
            }}
            className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
          >
            Clear Data
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
      position: 'top-center',
      style: {
        maxWidth: '500px',
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 3000,
          style: {
            background: '#fff',
            color: '#000',
          },
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Resume Builder
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Create your professional resume with our easy-to-use builder
              </p>
            </div>
            <button
              onClick={handleClearAllData}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors whitespace-nowrap"
            >
              Clear All Data
            </button>
          </div>
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
            genericSections={resumeData.genericSections}
            onRemoveGenericSection={handleRemoveGenericSection}
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
