'use client';

/**
 * Step 2: Lines Information
 * Form for adding lines via upload or manual entry
 */

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Eye, Download, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Mode = 'upload' | 'manual' | 'view';

interface LinesInformationStepProps {
  mode?: Mode;
  onModeChange?: (mode: Mode) => void;
  onViewLines?: () => void;
}

export function LinesInformationStep({
  mode: initialMode = 'upload',
  onModeChange,
  onViewLines,
}: LinesInformationStepProps) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    progress: number;
  } | null>(null);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    onModeChange?.(newMode);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)}KB`,
        progress: 100,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selection Buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={() => handleModeChange('upload')}
          className={cn(
            'bg-white border-gray-300 text-gray-700 hover:text-unset hover:border-unset hover:bg-unset',
            mode === 'upload' && 'border-[#FF6720] text-[#FF6720] bg-white ',
            mode !== 'upload' && 'hover:bg-gray-50 hover:text-black hover:border-[#FF6720]'
          )}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Lines file
        </Button>
        <Button
          variant="outline"
          onClick={() => handleModeChange('manual')}
          className={cn(
            'bg-white border-gray-300 text-gray-700 hover:text-unset hover:border-unset hover:bg-unset',
            mode === 'manual' && 'border-[#FF6720] text-[#FF6720] bg-white',
            mode !== 'manual' && 'hover:bg-gray-50 hover:text-black hover:border-[#FF6720]'
          )}
        >
          <FileText className="w-4 h-4 mr-2" />
          Insert Lines manually
        </Button>
        <Button
          variant="outline"
          onClick={onViewLines}
          className={cn("bg-white border-gray-300 text-gray-700 hover:text-unset hover:border-unset hover:bg-unset", mode === 'view' && 'border-[#FF6720] text-[#FF6720] bg-white', mode !== 'view' && 'hover:bg-gray-50 hover:text-black hover:border-[#FF6720]')}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Lines Added
        </Button>
      </div>

      {mode === 'upload' ? (
        <div className="space-y-6">
          {/* Download Template Section */}
          <div>
            <Label className="text-[#003C71] font-medium mb-4 block">
              1 First : Download Lines File Template
            </Label>
            <Button
              variant="outline"
              className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50 justify-start"
            >
              <Download className="w-4 h-4 mr-2" />
              Download File Template
            </Button>
          </div>

          {/* Upload File Section */}
          <div>
            <Label className="text-[#003C71] font-medium mb-4 block">
              2 Second : Upload Lines File
            </Label>
            {uploadedFile ? (
              <div className="border border-gray-300 rounded-lg p-4 bg-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{uploadedFile.name}</div>
                    <div className="text-sm text-gray-500">{uploadedFile.size}</div>
                    <div className="text-sm text-green-600">{uploadedFile.progress}% uploaded</div>
                  </div>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors block">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-gray-700 font-medium">Click to upload or drag and drop</div>
                    <div className="text-gray-500 text-sm mt-1">Excel files only</div>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Manual Entry Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lineId" className="text-[#003C71] font-medium">
                  Line ID
                </Label>
                <Input
                  id="lineId"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productDescription" className="text-[#003C71] font-medium">
                  Product Description
                </Label>
                <Input
                  id="productDescription"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subType" className="text-[#003C71] font-medium">
                  Sub Type
                </Label>
                <Input
                  id="subType"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length" className="text-[#003C71] font-medium">
                  Length
                </Label>
                <Input
                  id="length"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-[#003C71] font-medium">
                  Height
                </Label>
                <Input
                  id="height"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-[#003C71] font-medium">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitOfWeight" className="text-[#003C71] font-medium">
                  Unit Of Weight
                </Label>
                <Input
                  id="unitOfWeight"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName" className="text-[#003C71] font-medium">
                  Product Name
                </Label>
                <Input
                  id="productName"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargoType" className="text-[#003C71] font-medium">
                  Cargo Type
                </Label>
                <Input
                  id="cargoType"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width" className="text-[#003C71] font-medium">
                  Width
                </Label>
                <Input
                  id="width"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-[#003C71] font-medium">
                  Weight
                </Label>
                <Input
                  id="weight"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitOfDimension" className="text-[#003C71] font-medium">
                  Unit Of Dimension
                </Label>
                <Input
                  id="unitOfDimension"
                  placeholder="Placeholder"
                  className="border-gray-300 bg-white text-black"
                />
              </div>
            </div>
          </div>

          {/* Add New Line Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <button className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Plus className="w-6 h-6" />
              <span className="font-medium">Add new line</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

