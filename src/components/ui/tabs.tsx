'use client';

/**
 * Tabs Component
 * Reusable tabs component for navigation
 */

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Tab Headers */}
      <div className="flex items-center border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8">
          <div className="flex items-center gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'px-4 py-4 font-medium text-sm transition-colors relative',
                  activeTab === tab.id
                    ? 'text-[#FF6720]'
                    : 'text-[#003C71] hover:text-[#FF6720]'
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6720]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 min-h-[calc(100vh-300px)]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </div>
  );
}

