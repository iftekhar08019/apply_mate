"use client";

import { Experience } from "../types/resume-types";
import { useState } from "react";

interface ExperienceFormProps {
  data: Experience[];
  updateData: (data: Experience[]) => void;
}

export default function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [newExperience, setNewExperience] = useState<Experience>({
    id: '',
    jobTitle: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ['']
  });

  const addExperience = () => {
    if (newExperience.jobTitle && newExperience.company) {
      const experience = {
        ...newExperience,
        id: Date.now().toString()
      };
      updateData([...data, experience]);
      setNewExperience({
        id: '',
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ['']
      });
    }
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    updateData(updated);
  };

  const removeExperience = (index: number) => {
    updateData(data.filter((_, i) => i !== index));
  };

  const addDescription = (index: number) => {
    const updated = [...data];
    updated[index].description.push('');
    updateData(updated);
  };

  const updateDescription = (expIndex: number, descIndex: number, value: string) => {
    const updated = [...data];
    updated[expIndex].description[descIndex] = value;
    updateData(updated);
  };

  const removeDescription = (expIndex: number, descIndex: number) => {
    const updated = [...data];
    updated[expIndex].description.splice(descIndex, 1);
    updateData(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Work Experience
      </h3>
      
      {/* Existing Experiences */}
      {data.map((experience, index) => (
        <div key={experience.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Experience {index + 1}</h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={experience.jobTitle}
                onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Frontend Developer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company
              </label>
              <input
                type="text"
                value={experience.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Company Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                value={experience.location}
                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="City, Country"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={experience.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="May 2021"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={experience.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="October 2021"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description Points
            </label>
            {experience.description.map((desc, descIndex) => (
              <div key={descIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Describe your responsibilities and achievements"
                />
                <button
                  onClick={() => removeDescription(index, descIndex)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => addDescription(index)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + Add Description Point
            </button>
          </div>
        </div>
      ))}
      
      {/* Add New Experience */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Add New Experience</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={newExperience.jobTitle}
              onChange={(e) => setNewExperience({...newExperience, jobTitle: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Frontend Developer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company
            </label>
            <input
              type="text"
              value={newExperience.company}
              onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Company Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              value={newExperience.location}
              onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="City, Country"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="text"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="May 2021"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="text"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="October 2021"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            value={newExperience.description[0] || ''}
            onChange={(e) => setNewExperience({...newExperience, description: [e.target.value]})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Describe your responsibilities and achievements"
          />
        </div>
        
        <button
          onClick={addExperience}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Experience
        </button>
      </div>
    </div>
  );
}
