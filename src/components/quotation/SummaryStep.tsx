'use client';

/**
 * Step 3: Summary
 * Display summary of request information, lines, and charges
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, Column } from '@/components/ui/table';
import { Pagination } from '@/components/ui/pagination';
import { Upload, Trash2 } from 'lucide-react';
import { exportToCSV } from '@/utils/exportToCSV';
import { ReadonlyField } from '@/components/ui/readonly-field';

interface Line {
  id: number;
  lineId: string;
  name: string;
  description: string;
  quantity: number;
  cargoType: string;
  subType: string;
  containerSize: string;
  hazardous?: boolean;
}

interface Charge {
  lineId: string;
  charges: {
    type: string;
    amount: number;
    formatted: string;
  }[];
  total: number;
  totalFormatted: string;
}

interface SummaryStepProps {
  loadPort?: string;
  dischargePort?: string;
  cargoReadyDate?: string;
  lines?: Line[];
  charges?: Charge[];
  estimatedTotal?: string;
  onExport?: () => void;
}

export function SummaryStep({
  loadPort = 'Dammam',
  dischargePort = 'Jakarta',
  cargoReadyDate = '24-Apr-2025',
  lines = [],
  charges = [],
  estimatedTotal = '$49,244.00',
  onExport,
}: SummaryStepProps) {
  const [selectedLines, setSelectedLines] = useState<Set<number>>(new Set());
  const [linesPage, setLinesPage] = useState(1);
  const itemsPerPage = 4;

  // Mock data for demonstration
  const mockLines: Line[] = lines.length > 0 ? lines : [
    { id: 1, lineId: '1', name: 'Product A', description: 'Description A', quantity: 43, cargoType: 'Container', subType: 'SOC', containerSize: "40' Dry / HC" },
    { id: 2, lineId: '2', name: 'Product B', description: 'Description B', quantity: 43, cargoType: 'Container', subType: 'SOC', containerSize: "40' Dry / HC" },
    { id: 3, lineId: '3', name: 'Product C', description: 'Description C', quantity: 43, cargoType: 'Container', subType: 'SOC', containerSize: "40' Dry / HC" },
    { id: 4, lineId: '4', name: 'Product D', description: 'Description D', quantity: 43, cargoType: 'Container', subType: 'SOC', containerSize: "40' Dry / HC" },
  ];

  const mockCharges: Charge[] = charges.length > 0 ? charges : [
    {
      lineId: '1',
      charges: [
        { type: 'Ocean Freight', amount: 8311, formatted: '$8,311.00' },
        { type: 'Baf', amount: 1200, formatted: '$1,200.00' },
        { type: 'Eu ETS', amount: 1800, formatted: '$1,800.00' },
        { type: 'Suez canal', amount: 1000, formatted: '$1,000.00' },
      ],
      total: 12311,
      totalFormatted: '$12,311.00',
    },
    {
      lineId: '2',
      charges: [
        { type: 'Ocean Freight', amount: 8311, formatted: '$8,311.00' },
        { type: 'Baf', amount: 1200, formatted: '$1,200.00' },
        { type: 'Eu ETS', amount: 1800, formatted: '$1,800.00' },
        { type: 'Suez canal', amount: 1000, formatted: '$1,000.00' },
      ],
      total: 12311,
      totalFormatted: '$12,311.00',
    },
    {
      lineId: '3',
      charges: [
        { type: 'Ocean Freight', amount: 8311, formatted: '$8,311.00' },
        { type: 'Baf', amount: 1200, formatted: '$1,200.00' },
        { type: 'Eu ETS', amount: 1800, formatted: '$1,800.00' },
        { type: 'Suez canal', amount: 1000, formatted: '$1,000.00' },
      ],
      total: 12311,
      totalFormatted: '$12,311.00',
    },
    {
      lineId: '4',
      charges: [
        { type: 'Ocean Freight', amount: 8311, formatted: '$8,311.00' },
        { type: 'Baf', amount: 1200, formatted: '$1,200.00' },
        { type: 'Eu ETS', amount: 1800, formatted: '$1,800.00' },
        { type: 'Suez canal', amount: 1000, formatted: '$1,000.00' },
      ],
      total: 12311,
      totalFormatted: '$12,311.00',
    },
  ];

  const paginatedLines = mockLines.slice(
    (linesPage - 1) * itemsPerPage,
    linesPage * itemsPerPage
  );
  const totalLinesPages = Math.ceil(mockLines.length / itemsPerPage);

  const toggleLineSelection = (id: number) => {
    setSelectedLines((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    // TODO: Implement delete logic
    console.log('Delete selected lines:', Array.from(selectedLines));
    setSelectedLines(new Set());
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      exportToCSV(mockLines, 'quotation-summary.csv');
    }
  };

  const linesColumns: Column<Line>[] = [
    {
      key: 'checkbox',
      label: '',
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selectedLines.has(row.id)}
          onChange={() => toggleLineSelection(row.id)}
          className="cursor-pointer"
        />
      ),
    },
    { key: 'lineId', label: 'Line ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'cargoType', label: 'Cargo Type', sortable: true },
    { key: 'subType', label: 'Sub Type', sortable: true },
    { key: 'containerSize', label: 'Container Size', sortable: true },
  ];

  const chargesColumns: Column<Charge>[] = [
    { key: 'lineId', label: 'Line ID', sortable: true },
    {
      key: 'charges',
      label: 'Charge',
      render: (charges: any, row: Charge) => (
        <div className="space-y-1">
          {row.charges.map((charge: any, idx: number) => (
            <div key={idx} className="text-sm">
              {charge.type}: {charge.formatted}
            </div>
          ))}
        </div>
      ),
    },
    { key: 'totalFormatted', label: 'Total', sortable: true },
  ];

  return (
    <div className="space-y-8">
      {/* Title and Export */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[#003C71]">Summary</h3>
        <Button
          variant="outline"
          onClick={handleExport}
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <Upload className="w-4 h-4 mr-2 text-gray-500" />
          Export
        </Button>
      </div>

      {/* Header Section */}
      <div>
        <h4 className="text-lg font-semibold text-[#003C71] mb-4">Header</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReadonlyField label="Load Port" value={loadPort} />
          <ReadonlyField label="Discharge Port" value={dischargePort} />
          <ReadonlyField label="Cargo Ready Date" value={cargoReadyDate} />
        </div>
      </div>

      {/* Lines Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-[#003C71]">Lines</h4>
          {selectedLines.size > 0 && (
            <Button
              variant="outline"
              onClick={handleDeleteSelected}
              className="bg-white border-red-500 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table
            columns={linesColumns}
            data={paginatedLines}
            className="bg-white"
          />
        </div>
        {totalLinesPages > 1 && (
          <div className="mt-4">
            <Pagination
              currentPage={linesPage}
              totalPages={totalLinesPages}
              onPageChange={setLinesPage}
            />
          </div>
        )}
      </div>

      {/* Charges Section */}
      <div>
        <h4 className="text-lg font-semibold text-[#003C71] mb-4">Charges</h4>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table
            columns={chargesColumns}
            data={mockCharges}
            className="bg-white"
          />
        </div>
        <div className="mt-4 text-right">
          <span className="text-lg font-semibold text-[#003C71]">
            Est. Total: {estimatedTotal}
          </span>
        </div>
      </div>
    </div>
  );
}

