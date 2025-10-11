"use client";

import { useState } from 'react';
import { Plus, Settings, User, Briefcase, Code, GraduationCap, Globe, FileText, LucideIcon } from 'lucide-react';
import { AvailableSection, GenericSection } from '../types/resume-types';

interface SectionSidebarProps {
  availableSections: AvailableSection[];
  activeSections: string[];
  selectedSection: string | null;
  onSelectSection: (sectionId: string | null) => void;
  onAddSection: (sectionId: string) => void;
  onRemoveSection: (sectionId: string) => void;
  onAddGenericSection: (title: string) => void;
  genericSections?: GenericSection[];
  onRemoveGenericSection?: (sectionId: string) => void;
}

const sectionIcons: Record<string, LucideIcon> = {
  'personal': User,
  'skills': Code,
  'experiences': Briefcase,
  'projects': Code,
  'education': GraduationCap,
  'languages': Globe,
  'generic': FileText
};

export default function SectionSidebar({
  availableSections,
  activeSections,
  selectedSection,
  onSelectSection,
  onAddSection,
  onRemoveSection,
  onAddGenericSection,
  genericSections = [],
  onRemoveGenericSection
}: SectionSidebarProps) {
  const [showAddGeneric, setShowAddGeneric] = useState(false);
  const [genericTitle, setGenericTitle] = useState('');

  const handleAddGeneric = () => {
    if (genericTitle.trim()) {
      onAddGenericSection(genericTitle.trim());
      setGenericTitle('');
      setShowAddGeneric(false);
    }
  };

  const getSectionIcon = (sectionId: string) => {
    if (sectionId === 'personal') return User;
    if (sectionId.startsWith('generic_')) return FileText;
    return sectionIcons[sectionId] || FileText;
  };

  const getSectionTitle = (sectionId: string) => {
    if (sectionId === 'personal') return 'Personal Info';
    if (sectionId.startsWith('generic_')) {
      const genericSection = genericSections.find(s => s.id === sectionId);
      return genericSection?.title || 'Custom Section';
    }
    const section = availableSections.find(s => s.id === sectionId);
    return section?.title || sectionId;
  };

  return (
    <div className="w-full">
      <div className="p-3 lg:p-4">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4">
          Resume Sections
        </h3>
        
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {/* Personal Info - Always available */}
          <button
            onClick={() => onSelectSection('personal')}
            className={`flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-colors text-sm lg:text-base ${
              selectedSection === 'personal'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <User size={14} className="lg:w-4 lg:h-4" />
            <span className="font-medium hidden sm:inline">Personal Info</span>
            <span className="font-medium sm:hidden">Personal</span>
          </button>

          {/* Available Sections */}
          {availableSections.map((section) => {
            const isActive = activeSections.includes(section.id);
            const isSelected = selectedSection === section.id;
            const Icon = sectionIcons[section.id] || FileText;

            return (
                  <div key={section.id} className="flex items-center gap-1">
                    <button
                      onClick={() => onSelectSection(section.id)}
                      className={`flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-colors text-sm lg:text-base ${
                        isSelected
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon size={14} className="lg:w-4 lg:h-4" />
                      <span className="font-medium hidden sm:inline">{section.title}</span>
                      <span className="font-medium sm:hidden">{section.title.split(' ')[0]}</span>
                    </button>
                    
                    {isActive ? (
                      <button
                        onClick={() => onRemoveSection(section.id)}
                        className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded"
                        title="Remove section"
                      >
                        <Settings size={12} />
                      </button>
                    ) : (
                      <button
                        onClick={() => onAddSection(section.id)}
                        className="p-1 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 rounded"
                        title="Add section"
                      >
                        <Plus size={12} />
                      </button>
                    )}
                  </div>
            );
          })}

          {/* Generic/Custom Sections */}
          {genericSections.map((genericSection) => {
            const isActive = activeSections.includes(genericSection.id);
            const isSelected = selectedSection === genericSection.id;
            const Icon = FileText;

            return (
              <div key={genericSection.id} className="flex items-center gap-1">
                <button
                  onClick={() => onSelectSection(genericSection.id)}
                  className={`flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg transition-colors text-sm lg:text-base ${
                    isSelected
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon size={14} className="lg:w-4 lg:h-4" />
                  <span className="font-medium hidden sm:inline">{genericSection.title}</span>
                  <span className="font-medium sm:hidden">{genericSection.title.split(' ')[0]}</span>
                </button>
                
                {isActive && onRemoveGenericSection && (
                  <button
                    onClick={() => onRemoveGenericSection(genericSection.id)}
                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded"
                    title="Remove custom section"
                  >
                    <Settings size={12} />
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Generic Section Button */}
          {!showAddGeneric ? (
            <button
              onClick={() => setShowAddGeneric(true)}
              className="flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors border border-dashed border-gray-300 dark:border-gray-600 text-sm lg:text-base"
            >
              <Plus size={14} className="lg:w-4 lg:h-4" />
              <span className="font-medium hidden sm:inline">Add Custom</span>
              <span className="font-medium sm:hidden">Add</span>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
              <input
                type="text"
                value={genericTitle}
                onChange={(e) => setGenericTitle(e.target.value)}
                placeholder="Section title"
                className="px-2 lg:px-3 py-1.5 lg:py-2 text-xs lg:text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white flex-1 min-w-0"
              />
              <div className="flex gap-1">
                <button
                  onClick={handleAddGeneric}
                  disabled={!genericTitle.trim()}
                  className="bg-blue-600 text-white py-1.5 lg:py-2 px-2 lg:px-3 rounded text-xs lg:text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddGeneric(false);
                    setGenericTitle('');
                  }}
                  className="px-2 lg:px-3 py-1.5 lg:py-2 border border-gray-300 dark:border-gray-600 rounded text-xs lg:text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

        </div>
        
        {/* Active Sections and Order */}
        {activeSections.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Active Sections ({activeSections.length})
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Order
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {activeSections.map((sectionId, index) => {
                const Icon = getSectionIcon(sectionId);
                const title = getSectionTitle(sectionId);
                return (
                  <div
                    key={sectionId}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400"
                  >
                    <span className="bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                    <Icon size={12} />
                    <span className="truncate">{title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
