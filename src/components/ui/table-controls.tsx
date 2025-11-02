'use client';

/**
 * Table Controls Component
 * Reusable search input and export button for tables
 */

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
  searchPlaceholder?: string;
  exportButtonText?: string;
  disabled?: boolean;
  showExport?: boolean;
  className?: string;
}

export function TableControls({
  searchQuery,
  onSearchChange,
  onExport,
  searchPlaceholder = 'Search...',
  exportButtonText = 'Export',
  disabled = false,
  showExport = true,
  className,
}: TableControlsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className={cn('flex flex-col sm:flex-row gap-3', className)}>
      {/* Search Input */}
      <div className="relative flex-1 sm:min-w-[250px]">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-10 bg-white border-gray-300 text-gray-700 placeholder:text-gray-400 m-0"
          disabled={disabled}
        />
      </div>

      {/* Export Button */}
      {showExport && (
        <Button
          variant="outline"
          onClick={onExport}
          disabled={disabled}
          className="whitespace-nowrap bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-700"
        >
          <Upload className="w-4 h-4 mr-2 text-gray-500" />
          {exportButtonText}
        </Button>
      )}
    </div>
  );
}

