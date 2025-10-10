"use client";

import { ResumeData } from "../types/resume-types";
import PersonalInfoForm from "./personal-info-form";
import SkillsForm from "./skills-form";
import ExperienceForm from "./experience-form";
import ProjectForm from "./project-form";
import EducationForm from "./education-form";
import LanguagesForm from "./languages-form";
import GenericSectionForm from "./generic-section-form";

interface SingleSectionFormProps {
  resumeData: ResumeData;
  selectedSection: string | null;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  updateGenericSection?: (section: any) => void;
  removeGenericSection?: (sectionId: string) => void;
}

export default function SingleSectionForm({ 
  resumeData, 
  selectedSection,
  updateResumeData, 
  updateGenericSection, 
  removeGenericSection 
}: SingleSectionFormProps) {
  
  if (!selectedSection) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-medium mb-2">Select a Section</h3>
          <p className="text-sm">Choose a section from the sidebar to start editing your resume</p>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (selectedSection) {
      case 'personal':
        return (
          <PersonalInfoForm 
            data={resumeData.personalInfo}
            updateData={(data) => updateResumeData('personalInfo', data)}
          />
        );
      case 'skills':
        return (
          <SkillsForm 
            data={resumeData.skills}
            updateData={(data) => updateResumeData('skills', data)}
          />
        );
      case 'experiences':
        return (
          <ExperienceForm 
            data={resumeData.experiences}
            updateData={(data) => updateResumeData('experiences', data)}
          />
        );
      case 'projects':
        return (
          <ProjectForm 
            data={resumeData.projects}
            updateData={(data) => updateResumeData('projects', data)}
          />
        );
      case 'education':
        return (
          <EducationForm 
            data={resumeData.education}
            updateData={(data) => updateResumeData('education', data)}
          />
        );
      case 'languages':
        return (
          <LanguagesForm 
            data={resumeData.languages}
            updateData={(data) => updateResumeData('languages', data)}
          />
        );
      default:
        // Handle generic sections
        const genericSection = resumeData.genericSections.find(s => s.id === selectedSection);
        if (genericSection && updateGenericSection && removeGenericSection) {
          return (
            <GenericSectionForm
              section={genericSection}
              updateSection={updateGenericSection}
              onRemove={() => removeGenericSection(selectedSection)}
            />
          );
        }
        return (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>Section not found</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      {renderSection()}
    </div>
  );
}
