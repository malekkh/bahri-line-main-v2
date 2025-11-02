'use client';

/**
 * Step 1: Request Information
 * Form for basic quotation request information
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

interface RequestInformationStepProps {
  loadPort?: string;
  dischargePort?: string;
  cargoReadyDate?: string;
  onLoadPortChange?: (value: string) => void;
  onDischargePortChange?: (value: string) => void;
  onCargoReadyDateChange?: (value: string) => void;
}

export function RequestInformationStep({
  loadPort = 'Dammam',
  dischargePort = 'Jakarta',
  cargoReadyDate = '24-Apr-2025',
  onLoadPortChange,
  onDischargePortChange,
  onCargoReadyDateChange,
}: RequestInformationStepProps) {
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
          <Input
            id="loadPort"
            value={loadPort}
            onChange={(e) => onLoadPortChange?.(e.target.value)}
            className="border-gray-300 bg-white text-black"
            placeholder="Enter load port"
          />
        </div>

        {/* Discharge Port */}
        <div className="space-y-2">
          <Label htmlFor="dischargePort" className="text-[#003C71] font-medium">
            Discharge Port
          </Label>
          <Input
            id="dischargePort"
            value={dischargePort}
            onChange={(e) => onDischargePortChange?.(e.target.value)}
            className="border-gray-300 bg-white text-black"
            placeholder="Enter discharge port"
          />
        </div>

        {/* Cargo Ready Date */}
        <div className="space-y-2">
          <Label htmlFor="cargoReadyDate" className="text-[#003C71] font-medium">
            Cargo Ready Date
          </Label>
          <div className="relative">
            <Input
              id="cargoReadyDate"
              type="text"
              value={cargoReadyDate}
              onChange={(e) => onCargoReadyDateChange?.(e.target.value)}
              className="border-gray-300 bg-white text-black pr-10"
              placeholder="Select date"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

