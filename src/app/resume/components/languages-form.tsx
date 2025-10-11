"use client";

interface LanguagesFormProps {
  data: string;
  updateData: (data: string) => void;
}

export default function LanguagesForm({ data, updateData }: LanguagesFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Languages
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Languages & Proficiency
        </label>
        <input
          type="text"
          value={data}
          onChange={(e) => updateData(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Bangla: Native | English: Fluent (C1 equivalent) | German: Intermediate (B1 equivalent)"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Separate languages with &quot; | &quot; (e.g., &quot;English: Fluent | Spanish: Intermediate&quot;)
        </p>
      </div>
    </div>
  );
}
