'use client';

/**
 * Step 1: Request Information
 * Form for basic quotation request information
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, ChevronDown } from 'lucide-react';
import { usePorts } from '@/customhooks/usePorts';
import { formatDateShort } from '@/utils/formatDate';
import React from 'react';

interface RequestInformationStepProps {
  loadPort?: string;
  dischargePort?: string;
  cargoReadyDate?: string;
  onLoadPortChange?: (value: string) => void;
  onDischargePortChange?: (value: string) => void;
  onCargoReadyDateChange?: (value: string) => void;
}

export function RequestInformationStep({
  loadPort = '',
  dischargePort = '',
  cargoReadyDate = '',
  onLoadPortChange,
  onDischargePortChange,
  onCargoReadyDateChange,
}: RequestInformationStepProps) {
  const { ports, isLoading: isLoadingPorts } = usePorts();
  
  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Format date for display
  const displayDate = cargoReadyDate ? formatDateShort(cargoReadyDate) : '';

  const handleDateClick = () => {
    const dateInput = document.getElementById('cargoReadyDatePicker') as HTMLInputElement;
    if (dateInput) {
      dateInput.showPicker?.();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-[#003C71] mb-6">Header</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Load Port */}
        <div className="space-y-2">
          <Label htmlFor="loadPort" className="text-[#003C71] font-medium">
            Load Port
          </Label>
          <div className="relative">
            <select
              id="loadPort"
              value={loadPort}
              onChange={(e) => onLoadPortChange?.(e.target.value)}
              className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-black appearance-none pr-8"
            >
              <option value="">Select Load Port</option>
              {isLoadingPorts ? (
                <option disabled>Loading ports...</option>
              ) : (
                ports.map((port) => (
                  <option key={port.ntw_portid} value={port.ntw_portid}>
                    {port.ntw_name}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Discharge Port */}
        <div className="space-y-2">
          <Label htmlFor="dischargePort" className="text-[#003C71] font-medium">
            Discharge Port
          </Label>
          <div className="relative">
            <select
              id="dischargePort"
              value={dischargePort}
              onChange={(e) => onDischargePortChange?.(e.target.value)}
              className="flex h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-black appearance-none pr-8"
            >
              <option value="">Select Discharge Port</option>
              {isLoadingPorts ? (
                <option disabled>Loading ports...</option>
              ) : (
                ports.map((port) => (
                  <option key={port.ntw_portid} value={port.ntw_portid}>
                    {port.ntw_name}
                  </option>
                ))
              )}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

      </div>

      {/* Cargo Ready Date - Full Width */}
      <div className="space-y-2">
        <Label htmlFor="cargoReadyDate" className="text-[#003C71] font-medium">
          Cargo Ready Date
        </Label>
        <div className="relative cursor-pointer" onClick={handleDateClick}>
          <Input
            id="cargoReadyDate"
            type="text"
            value={displayDate}
            readOnly
            placeholder="DD-MMM-YYYY"
            className="border-gray-300 bg-white text-black pr-10 cursor-pointer pointer-events-none"
          />
          <input
            id="cargoReadyDatePicker"
            type="date"
            value={cargoReadyDate}
            onChange={(e) => onCargoReadyDateChange?.(e.target.value)}
            min={today}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            style={{ zIndex: 1 }}
          />
          <Calendar 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" 
          />
        </div>
      </div>
    </div>
  );
}

