"use client";

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { SectionType } from '../types/resume-types';

interface SectionItemProps {
  id: string;
  title: string;
  isVisible: boolean;
}

function SectionItem({ id, title, isVisible }: SectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg ${
        !isVisible ? 'opacity-50' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab hover:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
      >
        <GripVertical size={16} />
      </div>
      <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </span>
      <div className={`w-2 h-2 rounded-full ${isVisible ? 'bg-green-500' : 'bg-gray-300'}`} />
    </div>
  );
}

interface SectionReordererProps {
  sectionOrder: string[];
  onReorder: (newOrder: string[]) => void;
  sectionVisibility: Record<string, boolean>;
  onToggleVisibility: (section: string) => void;
}

export default function SectionReorderer({ 
  sectionOrder, 
  onReorder, 
  sectionVisibility, 
  onToggleVisibility 
}: SectionReordererProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = sectionOrder.indexOf(active.id);
      const newIndex = sectionOrder.indexOf(over.id);
      
      onReorder(arrayMove(sectionOrder, oldIndex, newIndex));
    }
  };

  const sectionTitles: Record<string, string> = {
    skills: 'Skills',
    experiences: 'Work Experience',
    projects: 'Projects',
    education: 'Education',
    languages: 'Languages'
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
        Section Order
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Drag sections to reorder them in your resume. Click the dot to toggle visibility.
      </p>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sectionOrder.map((sectionId) => (
              <div key={sectionId} className="flex items-center gap-2">
                <div className="flex-1">
                  <SectionItem
                    id={sectionId}
                    title={sectionTitles[sectionId] || sectionId}
                    isVisible={sectionVisibility[sectionId] || false}
                  />
                </div>
                <button
                  onClick={() => onToggleVisibility(sectionId)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    sectionVisibility[sectionId] 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {sectionVisibility[sectionId] ? 'Visible' : 'Hidden'}
                </button>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
