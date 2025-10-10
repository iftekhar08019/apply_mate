"use client";

import { GenericSection, GenericSectionEntry } from "../types/resume-types";
import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface GenericSectionFormProps {
  section: GenericSection;
  updateSection: (section: GenericSection) => void;
  onRemove: () => void;
}

export default function GenericSectionForm({ section, updateSection, onRemove }: GenericSectionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);

  const handleTitleChange = (newTitle: string) => {
    setEditTitle(newTitle);
  };

  const handleSaveTitle = () => {
    if (editTitle.trim()) {
      updateSection({
        ...section,
        title: editTitle.trim()
      });
      setIsEditing(false);
    }
  };

  const handleAddEntry = () => {
    const newEntry: GenericSectionEntry = {
      id: `entry-${Date.now()}`,
      mainHeading: '',
      subHeading: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ['']
    };
    
    updateSection({
      ...section,
      entries: [...section.entries, newEntry]
    });
  };

  const handleUpdateEntry = (entryId: string, field: keyof GenericSectionEntry, value: any) => {
    updateSection({
      ...section,
      entries: section.entries.map(entry =>
        entry.id === entryId ? { ...entry, [field]: value } : entry
      )
    });
  };

  const handleRemoveEntry = (entryId: string) => {
    updateSection({
      ...section,
      entries: section.entries.filter(entry => entry.id !== entryId)
    });
  };

  const handleAddDescriptionPoint = (entryId: string) => {
    updateSection({
      ...section,
      entries: section.entries.map(entry =>
        entry.id === entryId
          ? { ...entry, description: [...entry.description, ''] }
          : entry
      )
    });
  };

  const handleUpdateDescriptionPoint = (entryId: string, index: number, value: string) => {
    updateSection({
      ...section,
      entries: section.entries.map(entry =>
        entry.id === entryId
          ? {
              ...entry,
              description: entry.description.map((desc, i) => (i === index ? value : desc))
            }
          : entry
      )
    });
  };

  const handleRemoveDescriptionPoint = (entryId: string, index: number) => {
    updateSection({
      ...section,
      entries: section.entries.map(entry =>
        entry.id === entryId
          ? {
              ...entry,
              description: entry.description.filter((_, i) => i !== index)
            }
          : entry
      )
    });
  };

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-3">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="flex-1 px-3 py-2 text-sm lg:text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Section title (e.g., Certifications, Awards, etc.)"
              />
              <button
                onClick={handleSaveTitle}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditTitle(section.title);
                  setIsEditing(false);
                }}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <h3 
              className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsEditing(true)}
              title="Click to edit section name"
            >
              {section.title || "Custom Section"}
            </h3>
          )}
        </div>
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium ml-4"
        >
          Remove Section
        </button>
      </div>

      {/* Entries */}
      <div className="space-y-4">
        {section.entries.map((entry, index) => (
          <div
            key={entry.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 lg:p-4 space-y-3 bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Entry #{index + 1}
              </h4>
              <button
                onClick={() => handleRemoveEntry(entry.id)}
                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                title="Remove entry"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Main Heading */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Main Heading *
                </label>
                <input
                  type="text"
                  value={entry.mainHeading}
                  onChange={(e) => handleUpdateEntry(entry.id, 'mainHeading', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., AWS Certified Developer"
                />
              </div>

              {/* Sub Heading */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sub Heading
                </label>
                <input
                  type="text"
                  value={entry.subHeading}
                  onChange={(e) => handleUpdateEntry(entry.id, 'subHeading', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Amazon Web Services"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={entry.location}
                  onChange={(e) => handleUpdateEntry(entry.id, 'location', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Online, New York, etc."
                />
              </div>

              {/* Start Date */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={entry.startDate}
                    onChange={(e) => handleUpdateEntry(entry.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="MMM YYYY"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    value={entry.endDate}
                    onChange={(e) => handleUpdateEntry(entry.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="MMM YYYY or Present"
                  />
                </div>
              </div>
            </div>

            {/* Description Points */}
            <div>
              <label className="block text-xs lg:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description Points
              </label>
              <div className="space-y-2">
                {entry.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={desc}
                      onChange={(e) => handleUpdateDescriptionPoint(entry.id, descIndex, e.target.value)}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder={`Description point ${descIndex + 1}`}
                    />
                    <button
                      onClick={() => handleRemoveDescriptionPoint(entry.id, descIndex)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2"
                      disabled={entry.description.length === 1}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddDescriptionPoint(entry.id)}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                >
                  <Plus size={16} />
                  Add Description Point
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Entry Button */}
        <button
          onClick={handleAddEntry}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">Add New Entry</span>
        </button>
      </div>
    </div>
  );
}
