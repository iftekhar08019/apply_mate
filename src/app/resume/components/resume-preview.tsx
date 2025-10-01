"use client";

import { ResumeData, SectionType } from "../types/resume-types";

interface ResumePreviewProps {
  resumeData: ResumeData;
  sectionVisibility?: Record<string, boolean>;
}

export default function ResumePreview({ resumeData, sectionVisibility = {} }: ResumePreviewProps) {
  const { personalInfo, skills, experiences, projects, education, languages, genericSections, sectionOrder } = resumeData;

  // Default visibility for all sections
  const defaultVisibility = {
    skills: true,
    experiences: true,
    projects: true,
    education: true,
    languages: true,
    ...sectionVisibility
  };

  return (
    <div 
      id="resume-content"
      className="bg-white text-black mx-auto" 
      style={{ 
        fontFamily: 'Calibri, Arial, sans-serif',
        fontSize: 'clamp(9pt, 2.5vw, 11pt)',
        lineHeight: '1.2',
        width: '100%',
        maxWidth: '210mm', // A4 width
        minHeight: '297mm', // A4 height
        padding: 'clamp(10mm, 3vw, 15mm)',
        margin: '0 auto',
        boxSizing: 'border-box'
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-4 pb-4 border-b border-gray-300">
        <h1 className="font-bold mb-1" style={{ fontSize: 'clamp(14pt, 4vw, 16pt)' }}>
          {personalInfo.name || "Your Name"}
        </h1>
        <p className="font-bold mb-1" style={{ fontSize: 'clamp(10pt, 3vw, 12pt)' }}>
          {personalInfo.title || "Professional Title"}
        </p>
        <p className="mb-3" style={{ fontSize: 'clamp(9pt, 2.5vw, 11pt)' }}>
          {personalInfo.location || "Location"}
        </p>
        <div style={{ fontSize: 'clamp(9pt, 2.5vw, 11pt)' }} className="flex flex-wrap justify-center items-center gap-1">
          <span>{personalInfo.phone || "Phone"}</span>
          <span className="hidden sm:inline">|</span>
          <a 
            href={personalInfo.email ? `mailto:${personalInfo.email}` : "#"} 
            className="text-blue-600 hover:underline"
          >
            {personalInfo.email || "email@example.com"}
          </a>
          {personalInfo.linkedin && (
            <>
              <span className="mx-1">|</span>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span className="mx-1">|</span>
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span className="mx-1">|</span>
              <a 
                href={personalInfo.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>

      {/* Render sections in the specified order */}
      {sectionOrder.map((sectionId) => {
        switch (sectionId) {
          case 'skills':
            if (!defaultVisibility.skills || (!skills.frontend && !skills.backend && !skills.tools && !skills.softSkills)) return null;
            return (
              <div key="skills" className="mb-4 pb-4 border-b border-gray-300">
                <h2 className="font-bold uppercase mb-2" style={{ fontSize: '11pt', textDecoration: 'underline', textUnderlineOffset: '2px' }}>SKILLS</h2>
                <div className="space-y-1">
                  {skills.frontend && (
                    <div>
                      <span className="font-bold">Frontend Technology: </span>
                      <span>{skills.frontend}</span>
                    </div>
                  )}
                  {skills.backend && (
                    <div>
                      <span className="font-bold">Backend Technology: </span>
                      <span>{skills.backend}</span>
                    </div>
                  )}
                  {skills.tools && (
                    <div>
                      <span className="font-bold">Tools: </span>
                      <span>{skills.tools}</span>
                    </div>
                  )}
                  {skills.softSkills && (
                    <div>
                      <span className="font-bold">Soft Skills: </span>
                      <span>{skills.softSkills}</span>
                    </div>
                  )}
                </div>
              </div>
            );

          case 'experiences':
            if (!defaultVisibility.experiences || experiences.length === 0) return null;
            return (
              <div key="experiences" className="mb-4 pb-4 border-b border-gray-300">
                <h2 className="font-bold uppercase mb-2" style={{ fontSize: '11pt', textDecoration: 'underline', textUnderlineOffset: '2px' }}>EXPERIENCES</h2>
                <div className="space-y-3">
                  {experiences.map((exp, index) => (
                    <div key={exp.id || index}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <div className="font-bold">{exp.jobTitle}</div>
                          <div className="italic">{exp.company}</div>
                        </div>
                        <div className="text-right" style={{ fontSize: '11pt' }}>
                          <div>{exp.location}</div>
                          <div>{exp.startDate} - {exp.endDate}</div>
                        </div>
                      </div>
                      {exp.description.length > 0 && (
                        <ul className="ml-4 space-y-0.5">
                          {exp.description.map((desc, descIndex) => (
                            desc && (
                              <li key={descIndex} className="flex items-start">
                                <span className="mr-2" style={{ fontSize: '11pt' }}>•</span>
                                <span style={{ fontSize: '11pt' }}>{desc}</span>
                              </li>
                            )
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'projects':
            if (!defaultVisibility.projects || projects.length === 0) return null;
            return (
              <div key="projects" className="mb-4 pb-4 border-b border-gray-300">
                <h2 className="font-bold uppercase mb-2" style={{ fontSize: '11pt', textDecoration: 'underline', textUnderlineOffset: '2px' }}>PROJECTS</h2>
                <div className="space-y-3">
                  {projects.map((project, index) => (
                    <div key={project.id || index}>
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-bold">{project.name} - {project.type}</div>
                        <div className="text-right" style={{ fontSize: '11pt' }}>
                          <div className="flex gap-1">
                            {project.liveLink && (
                              <a 
                                href={project.liveLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 underline italic"
                              >
                                Live Link |
                              </a>
                            )}
                            {project.clientLink && (
                              <a 
                                href={project.clientLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 underline italic"
                              >
                                Client Link |
                              </a>
                            )}
                            {project.serverLink && (
                              <a 
                                href={project.serverLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 underline italic"
                              >
                                Server Link
                              </a>
                            )}
                          </div>
                          <div>{project.date}</div>
                        </div>
                      </div>
                      {project.description.length > 0 && (
                        <ul className="ml-4 space-y-0.5 mb-2">
                          {project.description.map((desc, descIndex) => (
                            desc && (
                              <li key={descIndex} className="flex items-start">
                                <span className="mr-2" style={{ fontSize: '11pt' }}>•</span>
                                <span style={{ fontSize: '11pt' }}>{desc}</span>
                              </li>
                            )
                          ))}
                        </ul>
                      )}
                      {project.techStack && (
                        <div style={{ fontSize: '11pt' }}>
                          <span className="font-bold">Tech Stack: </span>
                          <span>{project.techStack}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'education':
            if (!defaultVisibility.education || (!education.institution && !education.degree)) return null;
            return (
              <div key="education" className="mb-4 pb-4 border-b border-gray-300">
                <h2 className="font-bold uppercase mb-2" style={{ fontSize: '11pt', textDecoration: 'underline', textUnderlineOffset: '2px' }}>EDUCATION</h2>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold">{education.institution || "Institution Name"}</div>
                    <div style={{ fontSize: '11pt' }}>{education.degree || "Degree & Specialization"}</div>
                  </div>
                  <div className="text-right" style={{ fontSize: '11pt' }}>
                    <div>{education.location || "Location"}</div>
                    <div>{education.startDate} - {education.endDate}</div>
                  </div>
                </div>
              </div>
            );

          case 'languages':
            if (!defaultVisibility.languages || !languages) return null;
            return (
              <div key="languages" className="mb-4 pb-4 border-b border-gray-300">
                <h2 className="font-bold uppercase mb-2" style={{ fontSize: '11pt', textDecoration: 'underline', textUnderlineOffset: '2px' }}>LANGUAGES</h2>
                <div style={{ fontSize: '11pt' }}>
                  {languages.split(' | ').map((lang, index) => (
                    <span key={index}>
                      {lang}
                      {index < languages.split(' | ').length - 1 && <span className="mx-1">|</span>}
                    </span>
                  ))}
                </div>
              </div>
            );

          default:
            // Handle generic sections
            const genericSection = genericSections.find(s => s.id === sectionId);
            if (genericSection && defaultVisibility[sectionId] !== false && genericSection.entries.length > 0) {
              return (
                <div key={sectionId} className="mb-4 pb-4 border-b border-gray-300">
                  <h2 className="font-bold uppercase mb-2" style={{ fontSize: '11pt', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                    {genericSection.title.toUpperCase()}
                  </h2>
                  <div className="space-y-3">
                    {genericSection.entries.map((entry, index) => (
                      <div key={entry.id || index}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <div className="font-bold" style={{ fontSize: '11pt' }}>
                              {entry.mainHeading}
                              {entry.subHeading && ` - ${entry.subHeading}`}
                            </div>
                          </div>
                          <div className="text-right" style={{ fontSize: '11pt' }}>
                            {entry.location && <div>{entry.location}</div>}
                            {(entry.startDate || entry.endDate) && (
                              <div>
                                {entry.startDate} {entry.startDate && entry.endDate && '- '} {entry.endDate}
                              </div>
                            )}
                          </div>
                        </div>
                        {entry.description.length > 0 && (
                          <ul className="ml-4 space-y-0.5">
                            {entry.description.map((desc, descIndex) => (
                              desc && (
                                <li key={descIndex} className="flex items-start">
                                  <span className="mr-2" style={{ fontSize: '11pt' }}>•</span>
                                  <span style={{ fontSize: '11pt' }}>{desc}</span>
                                </li>
                              )
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
            return null;
        }
      })}
    </div>
  );
}
