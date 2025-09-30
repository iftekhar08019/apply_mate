"use client";

import { GenericSection } from "../types/resume-types";
import { useState } from "react";

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
    updateSection({
      ...section,
      title: newTitle
    });
  };

  const handleContentChange = (newContent: string) => {
    updateSection({
      ...section,
      content: newContent
    });
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

  return (
    <div className="space-y-4 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Section title"
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
              className="text-lg font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsEditing(true)}
            >
              {section.title}
            </h3>
          )}
        </div>
        <button
          onClick={onRemove}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Remove Section
        </button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content
        </label>
        <textarea
          value={section.content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          rows={6}
          placeholder="Enter your content here. You can use bullet points, paragraphs, or any other formatting you prefer."
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Tip: Use bullet points (•) for lists, separate paragraphs with line breaks
        </p>
      </div>
    </div>
  );
}
