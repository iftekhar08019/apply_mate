"use client";

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { AvailableSection, SectionType } from '../types/resume-types';

interface SectionSelectorProps {
  availableSections: AvailableSection[];
  activeSections: string[];
  onAddSection: (sectionId: string) => void;
  onRemoveSection: (sectionId: string) => void;
  onAddGenericSection: (title: string) => void;
}

export default function SectionSelector({ 
  availableSections, 
  activeSections, 
  onAddSection, 
  onRemoveSection,
  onAddGenericSection 
}: SectionSelectorProps) {
  const [showAddGeneric, setShowAddGeneric] = useState(false);
  const [genericTitle, setGenericTitle] = useState('');

  const handleAddGeneric = () => {
    if (genericTitle.trim()) {
      onAddGenericSection(genericTitle.trim());
      setGenericTitle('');
      setShowAddGeneric(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Add Sections
      </h3>
      
      {/* Available Sections */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Available Sections:
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {availableSections.map((section) => {
            const isActive = activeSections.includes(section.id);
            return (
              <div
                key={section.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  isActive
                    ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {section.title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {section.description}
                  </div>
                </div>
                <button
                  onClick={() => isActive ? onRemoveSection(section.id) : onAddSection(section.id)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    isActive
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300'
                  }`}
                >
                  {isActive ? (
                    <>
                      <X size={12} className="inline mr-1" />
                      Remove
                    </>
                  ) : (
                    <>
                      <Plus size={12} className="inline mr-1" />
                      Add
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generic Section */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom Section:
        </h4>
        {!showAddGeneric ? (
          <button
            onClick={() => setShowAddGeneric(true)}
            className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-gray-600 dark:text-gray-400"
          >
            <Plus size={16} />
            Add Custom Section
          </button>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={genericTitle}
              onChange={(e) => setGenericTitle(e.target.value)}
              placeholder="Enter section title (e.g., Certifications, Awards)"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddGeneric}
                disabled={!genericTitle.trim()}
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
              >
                Add Section
              </button>
              <button
                onClick={() => {
                  setShowAddGeneric(false);
                  setGenericTitle('');
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Sections Summary */}
      {activeSections.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">
            Active Sections ({activeSections.length}):
          </div>
          <div className="flex flex-wrap gap-1">
            {activeSections.map((sectionId) => {
              const section = availableSections.find(s => s.id === sectionId);
              return (
                <span
                  key={sectionId}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded"
                >
                  {section?.title || sectionId}
                  <button
                    onClick={() => onRemoveSection(sectionId)}
                    className="hover:text-red-600 dark:hover:text-red-400"
                  >
                    <X size={10} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
