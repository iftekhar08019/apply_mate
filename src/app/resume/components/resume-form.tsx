"use client";

import { ResumeData } from "../types/resume-types";
import PersonalInfoForm from "./personal-info-form";
import SkillsForm from "./skills-form";
import ExperienceForm from "./experience-form";
import ProjectForm from "./project-form";
import EducationForm from "./education-form";
import LanguagesForm from "./languages-form";
import GenericSectionForm from "./generic-section-form";

interface ResumeFormProps {
  resumeData: ResumeData;
  updateResumeData: (section: keyof ResumeData, data: any) => void;
  updateGenericSection?: (section: any) => void;
  removeGenericSection?: (sectionId: string) => void;
}

export default function ResumeForm({ 
  resumeData, 
  updateResumeData, 
  updateGenericSection, 
  removeGenericSection 
}: ResumeFormProps) {
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'skills':
        return (
          <SkillsForm 
            key="skills"
            data={resumeData.skills}
            updateData={(data) => updateResumeData('skills', data)}
          />
        );
      case 'experiences':
        return (
          <ExperienceForm 
            key="experiences"
            data={resumeData.experiences}
            updateData={(data) => updateResumeData('experiences', data)}
          />
        );
      case 'projects':
        return (
          <ProjectForm 
            key="projects"
            data={resumeData.projects}
            updateData={(data) => updateResumeData('projects', data)}
          />
        );
      case 'education':
        return (
          <EducationForm 
            key="education"
            data={resumeData.education}
            updateData={(data) => updateResumeData('education', data)}
          />
        );
      case 'languages':
        return (
          <LanguagesForm 
            key="languages"
            data={resumeData.languages}
            updateData={(data) => updateResumeData('languages', data)}
          />
        );
      default:
        // Handle generic sections
        const genericSection = resumeData.genericSections.find(s => s.id === sectionId);
        if (genericSection && updateGenericSection && removeGenericSection) {
          return (
            <GenericSectionForm
              key={sectionId}
              section={genericSection}
              updateSection={updateGenericSection}
              onRemove={() => removeGenericSection(sectionId)}
            />
          );
        }
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Personal Info - Always shown */}
      <PersonalInfoForm 
        data={resumeData.personalInfo}
        updateData={(data) => updateResumeData('personalInfo', data)}
      />
      
      {/* Dynamic Sections based on activeSections */}
      {resumeData.activeSections.map(sectionId => renderSection(sectionId))}
    </div>
  );
}
