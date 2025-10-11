"use client";

import { Project } from "../types/resume-types";
import { useState } from "react";

interface ProjectFormProps {
  data: Project[];
  updateData: (data: Project[]) => void;
}

export default function ProjectForm({ data, updateData }: ProjectFormProps) {
  const [newProject, setNewProject] = useState<Project>({
    id: '',
    name: '',
    type: '',
    liveLink: '',
    clientLink: '',
    serverLink: '',
    date: '',
    description: [''],
    techStack: ''
  });

  const addProject = () => {
    if (newProject.name && newProject.type) {
      const project = {
        ...newProject,
        id: Date.now().toString()
      };
      updateData([...data, project]);
      setNewProject({
        id: '',
        name: '',
        type: '',
        liveLink: '',
        clientLink: '',
        serverLink: '',
        date: '',
        description: [''],
        techStack: ''
      });
    }
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    updateData(updated);
  };

  const removeProject = (index: number) => {
    updateData(data.filter((_, i) => i !== index));
  };

  const addDescription = (index: number) => {
    const updated = [...data];
    updated[index].description.push('');
    updateData(updated);
  };

  const updateDescription = (projIndex: number, descIndex: number, value: string) => {
    const updated = [...data];
    updated[projIndex].description[descIndex] = value;
    updateData(updated);
  };

  const removeDescription = (projIndex: number, descIndex: number) => {
    const updated = [...data];
    updated[projIndex].description.splice(descIndex, 1);
    updateData(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Projects
      </h3>
      
      {/* Existing Projects */}
      {data.map((project, index) => (
        <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Project {index + 1}</h4>
            <button
              onClick={() => removeProject(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="PocketGear - Premium Tech Accessories E-commerce"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Type
              </label>
              <input
                type="text"
                value={project.type}
                onChange={(e) => updateProject(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="E-commerce Platform"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Live Link
              </label>
              <input
                type="url"
                value={project.liveLink}
                onChange={(e) => updateProject(index, 'liveLink', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://project.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Link (Optional)
              </label>
              <input
                type="url"
                value={project.clientLink || ''}
                onChange={(e) => updateProject(index, 'clientLink', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://github.com/username/client"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Server Link (Optional)
              </label>
              <input
                type="url"
                value={project.serverLink || ''}
                onChange={(e) => updateProject(index, 'serverLink', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="https://github.com/username/server"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="text"
                value={project.date}
                onChange={(e) => updateProject(index, 'date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="August 2025"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tech Stack
            </label>
            <input
              type="text"
              value={project.techStack}
              onChange={(e) => updateProject(index, 'techStack', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Next.js 15, React 19, Tailwind CSS, MongoDB, NextAuth.js"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description Points
            </label>
            {project.description.map((desc, descIndex) => (
              <div key={descIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={desc}
                  onChange={(e) => updateDescription(index, descIndex, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Describe your project features and achievements"
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
      
      {/* Add New Project */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Add New Project</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Name
            </label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Project Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Type
            </label>
            <input
              type="text"
              value={newProject.type}
              onChange={(e) => setNewProject({...newProject, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Project Type"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Live Link
            </label>
            <input
              type="url"
              value={newProject.liveLink}
              onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="https://project.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date
            </label>
            <input
              type="text"
              value={newProject.date}
              onChange={(e) => setNewProject({...newProject, date: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="August 2025"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tech Stack
          </label>
          <input
            type="text"
            value={newProject.techStack}
            onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Next.js 15, React 19, Tailwind CSS"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <input
            type="text"
            value={newProject.description[0] || ''}
            onChange={(e) => setNewProject({...newProject, description: [e.target.value]})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Describe your project features and achievements"
          />
        </div>
        
        <button
          onClick={addProject}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}
