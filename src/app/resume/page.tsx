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
  // Initialize with default values (hydration-safe)
  const [resumeData, setResumeData] = useState<ResumeData>(getDefaultResumeData);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({
    skills: true,
    experiences: true,
    projects: true,
    education: true,
    languages: true
  });
  const [selectedSection, setSelectedSection] = useState<string | null>('personal');
  const [isHydrated, setIsHydrated] = useState(false);

  // Load data from localStorage after hydration (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Load resume data
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          setResumeData(JSON.parse(storedData));
        }

        // Load visibility data
        const storedVisibility = localStorage.getItem(STORAGE_KEY_VISIBILITY);
        if (storedVisibility) {
          setSectionVisibility(JSON.parse(storedVisibility));
        }

        // Load selected section
        const storedSection = localStorage.getItem(STORAGE_KEY_SELECTED_SECTION);
        if (storedSection) {
          setSelectedSection(storedSection);
        }
      } catch {
        // console.error('Error loading data from localStorage');
      }
      
      setIsHydrated(true);
    }
  }, []);

  // Save resume data to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        // Changes are saved automatically without toast notification
      } catch {
        // console.error('Error saving resume data to localStorage');
        toast.error('Failed to save changes');
      }
    }
  }, [resumeData, isHydrated]);

  // Save section visibility to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_VISIBILITY, JSON.stringify(sectionVisibility));
      } catch {
        // console.error('Error saving visibility data to localStorage');
      }
    }
  }, [sectionVisibility, isHydrated]);

  // Save selected section to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined' && selectedSection) {
      try {
        localStorage.setItem(STORAGE_KEY_SELECTED_SECTION, selectedSection);
      } catch {
        // console.error('Error saving selected section to localStorage');
      }
    }
  }, [selectedSection, isHydrated]);

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
                } catch {
                  // console.error('Error clearing localStorage');
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Build Your{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Professional Resume
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create a stunning, ATS-friendly resume in minutes with our easy-to-use builder
          </p>
        </div>
        
        {/* Top Section - Section Navigation and Order */}
        <div className="mb-8 space-y-6">
          {/* Section Navigation */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-1 shadow-xl border border-blue-100 dark:border-blue-800">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
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
            </div>
          </div>
          
          {/* Section Reorderer - Horizontal Layout */}
          {resumeData.activeSections.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-1 shadow-xl border border-purple-100 dark:border-purple-800">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <SectionReorderer
                  sectionOrder={resumeData.activeSections}
                  onReorder={handleSectionReorder}
                  sectionVisibility={sectionVisibility}
                  onToggleVisibility={handleToggleVisibility}
                  genericSections={resumeData.genericSections}
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 min-h-[calc(100vh-400px)]">
          {/* Left Column - Section Form - Full width on mobile/tablet, 1/3 on desktop */}
          <div className="xl:col-span-4 order-2 xl:order-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-1 shadow-xl border border-blue-100 dark:border-blue-800 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                    {selectedSection === 'personal' ? 'Personal Information' : 
                     selectedSection ? `${availableSections.find(s => s.id === selectedSection)?.title || 'Section'} Details` : 
                     'Resume Information'}
                  </h2>
                </div>
                <SingleSectionForm 
                  resumeData={resumeData} 
                  selectedSection={selectedSection}
                  updateResumeData={updateResumeData}
                  updateGenericSection={handleUpdateGenericSection}
                  removeGenericSection={handleRemoveGenericSection}
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Preview - Full width on mobile/tablet, 2/3 on desktop */}
          <div className="xl:col-span-8 order-1 xl:order-2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-1 shadow-xl border border-blue-100 dark:border-blue-800 h-full">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 h-full">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                      Live Preview
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClearAllData}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-white dark:text-red-400 dark:hover:text-white border-2 border-red-500 dark:border-red-400 rounded-lg hover:bg-red-500 dark:hover:bg-red-500 transition-all duration-200 whitespace-nowrap"
                    >
                      Clear Data
                    </button>
                    <div className="flex-shrink-0">
                      <PDFDownload fileName={`${resumeData.personalInfo.name || 'resume'}`} />
                    </div>
                  </div>
                </div>
                <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-inner bg-gray-50 dark:bg-gray-900/50">
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
        </div>
        
        {/* Bottom spacing to prevent footer overlap */}
        <div className="h-16"></div>
      </div>
    </div>
  );
}
