"use client";

import { Skills } from "../types/resume-types";

interface SkillsFormProps {
  data: Skills;
  updateData: (data: Skills) => void;
}

export default function SkillsForm({ data, updateData }: SkillsFormProps) {
  const handleChange = (field: keyof Skills, value: string) => {
    updateData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Skills
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Frontend Technologies
          </label>
          <input
            type="text"
            value={data.frontend}
            onChange={(e) => handleChange('frontend', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="HTML, CSS, JavaScript (ES6+), React.js, Next.js, Tailwind CSS"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Backend Technologies
          </label>
          <input
            type="text"
            value={data.backend}
            onChange={(e) => handleChange('backend', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Node.js, Express.js, MongoDB, REST API, JWT, Firebase Auth"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tools
          </label>
          <input
            type="text"
            value={data.tools}
            onChange={(e) => handleChange('tools', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Git, GitHub, Postman, Stripe, TanStack Query"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Soft Skills
          </label>
          <input
            type="text"
            value={data.softSkills}
            onChange={(e) => handleChange('softSkills', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Teamwork, Problem Solving, Time Management, Organization, Leadership, Attention to detail"
          />
        </div>
      </div>
    </div>
  );
}
