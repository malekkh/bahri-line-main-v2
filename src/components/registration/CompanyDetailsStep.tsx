import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Info } from 'lucide-react';

interface CompanyDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ 
  onNext, 
  onPrevious 
}) => {
  const [formData, setFormData] = useState({
    parentCompany: '',
    crNumber: '',
    businessType: '',
    companyName: '',
    vatNumber: '',
    numberOfEmployees: '',
    phone: '',
    territory: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // TODO: Add validation
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Form Fields - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[200px] overflow-y-auto pe-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentCompany" className="text-white font-[325]">
              Parent Company
            </Label>
            <Input
              id="parentCompany"
              type="text"
              placeholder="Placeholder"
              value={formData.parentCompany}
              onChange={(e) => handleInputChange('parentCompany', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="crNumber" className="text-white font-[325]" required>
                CR Number
              </Label>
              <Info className="h-3 w-3 text-white/60" />
            </div>
            <Input
              id="crNumber"
              type="text"
              placeholder="Placeholder"
              value={formData.crNumber}
              onChange={(e) => handleInputChange('crNumber', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-white font-[325]" required>
              Business Type
            </Label>
            <div className="relative">
              <Input
                id="businessType"
                type="text"
                placeholder="Placeholder"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="territory" className="text-white font-[325]" required>
              Territory
            </Label>
            <div className="relative">
              <Input
                id="territory"
                type="text"
                placeholder="Placeholder"
                value={formData.territory}
                onChange={(e) => handleInputChange('territory', e.target.value)}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-white font-[325]" required>
              Company Name
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="Placeholder"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="vatNumber" className="text-white font-[325]" required>
                VAT Number
              </Label>
              <Info className="h-3 w-3 text-white/60" />
            </div>
            <Input
              id="vatNumber"
              type="text"
              placeholder="Placeholder"
              value={formData.vatNumber}
              onChange={(e) => handleInputChange('vatNumber', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfEmployees" className="text-white font-[325]">
              Number of Employee
            </Label>
            <Input
              id="numberOfEmployees"
              type="number"
              placeholder="Placeholder"
              value={formData.numberOfEmployees}
              onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-[325]" required>
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Placeholder"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="bg-transparent border-[#FF6720] text-white hover:bg-[#FF6720]/10"
        >
          Previous: Parent Account
        </Button>
        
        <Button
          onClick={handleNext}
          className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold"
        >
          Next: Bank Details
        </Button>
      </div>
    </div>
  );
};
