"use client";

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { GenericSection } from '../types/resume-types';

interface SortableSectionItemProps {
  id: string;
  title: string;
  isVisible: boolean;
  onToggleVisibility: (id: string) => void;
}

function SortableSectionItem({ id, title, isVisible, onToggleVisibility }: SortableSectionItemProps) {
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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-1 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className={`flex items-center gap-1 lg:gap-2 p-1.5 lg:p-2 bg-white dark:bg-gray-800 border-2 rounded-lg min-w-0 ${
        isDragging 
          ? 'border-blue-500 shadow-lg scale-105 z-50' 
          : 'border-gray-200 dark:border-gray-700'
      } ${!isVisible ? 'opacity-50' : ''}`}>
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 flex-shrink-0 p-0.5 lg:p-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          <GripVertical size={12} className="lg:w-3.5 lg:h-3.5" />
        </div>
        <span className="flex-1 text-xs lg:text-sm font-medium text-gray-900 dark:text-white truncate min-w-0">
          {title}
        </span>
        <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full flex-shrink-0 ${isVisible ? 'bg-blue-500' : 'bg-gray-300'}`} />
      </div>
      <button
        onClick={() => onToggleVisibility(id)}
        className={`px-1.5 lg:px-2 py-1 text-xs rounded-md transition-colors ${
          isVisible 
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
        }`}
      >
        <span className="hidden sm:inline">{isVisible ? 'Visible' : 'Hidden'}</span>
        <span className="sm:hidden">{isVisible ? 'V' : 'H'}</span>
      </button>
    </div>
  );
}

interface SectionReordererProps {
  sectionOrder: string[];
  onReorder: (newOrder: string[]) => void;
  sectionVisibility: Record<string, boolean>;
  onToggleVisibility: (section: string) => void;
  genericSections?: GenericSection[];
}

export default function SectionReorderer({ 
  sectionOrder, 
  onReorder, 
  sectionVisibility, 
  onToggleVisibility,
  genericSections = []
}: SectionReordererProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before activating drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // console.log('Drag end:', { active: active.id, over: over?.id });

    if (active.id !== over?.id && over) {
      const oldIndex = sectionOrder.indexOf(active.id as string);
      const newIndex = sectionOrder.indexOf(over.id as string);
      
      // console.log('Reordering:', { oldIndex, newIndex });
      
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorder(arrayMove(sectionOrder, oldIndex, newIndex));
      }
    }
    
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getSectionTitle = (sectionId: string): string => {
    // Predefined sections
    const sectionTitles: Record<string, string> = {
      skills: 'Skills',
      experiences: 'Work Experience',
      projects: 'Projects',
      education: 'Education',
      languages: 'Languages'
    };
    
    // Check if it's a predefined section
    if (sectionTitles[sectionId]) {
      return sectionTitles[sectionId];
    }
    
    // Check if it's a generic/custom section
    if (sectionId.startsWith('generic_')) {
      const genericSection = genericSections.find(s => s.id === sectionId);
      return genericSection?.title || 'Custom Section';
    }
    
    return sectionId;
  };

  return (
    <div className="space-y-3 lg:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
          Section Order
        </h3>
        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
          Drag to reorder • Click dot to toggle visibility
        </p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sectionOrder}>
          <div className="flex flex-wrap gap-2">
            {sectionOrder.map((sectionId) => (
              <SortableSectionItem
                key={sectionId}
                id={sectionId}
                title={getSectionTitle(sectionId)}
                isVisible={sectionVisibility[sectionId] || false}
                onToggleVisibility={onToggleVisibility}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <div className="flex items-center gap-1 lg:gap-2 p-1.5 lg:p-2 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-lg shadow-2xl opacity-90">
              <GripVertical size={12} className="lg:w-3.5 lg:h-3.5 text-blue-500" />
              <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
                {getSectionTitle(activeId)}
              </span>
              <div className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full ${sectionVisibility[activeId] ? 'bg-blue-500' : 'bg-gray-300'}`} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
