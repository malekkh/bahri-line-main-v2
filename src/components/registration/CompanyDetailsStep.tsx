import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CompanyDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ 
  onNext, 
  onPrevious 
}) => {
  const t = useTranslations('registration');
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
              {t('fields.parentCompany')}
            </Label>
            <Input
              id="parentCompany"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.parentCompany}
              onChange={(e) => handleInputChange('parentCompany', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="crNumber" className="text-white font-[325]" required>
                {t('fields.crNumber')}
              </Label>
              <Info className="h-3 w-3 text-white/60" />
            </div>
            <Input
              id="crNumber"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.crNumber}
              onChange={(e) => handleInputChange('crNumber', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType" className="text-white font-[325]" required>
              {t('fields.businessType')}
            </Label>
            <div className="relative">
              <Input
                id="businessType"
                type="text"
                placeholder={t('placeholders.default')}
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="territory" className="text-white font-[325]" required>
              {t('fields.territory')}
            </Label>
            <div className="relative">
              <Input
                id="territory"
                type="text"
                placeholder={t('placeholders.default')}
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
              {t('fields.companyName')}
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="vatNumber" className="text-white font-[325]" required>
                {t('fields.vatNumber')}
              </Label>
              <Info className="h-3 w-3 text-white/60" />
            </div>
            <Input
              id="vatNumber"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.vatNumber}
              onChange={(e) => handleInputChange('vatNumber', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numberOfEmployees" className="text-white font-[325]">
              {t('fields.numberOfEmployees')}
            </Label>
            <Input
              id="numberOfEmployees"
              type="number"
              placeholder={t('placeholders.default')}
              value={formData.numberOfEmployees}
              onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-[325]" required>
              {t('fields.phone')}
            </Label>
            <Input
              id="phone"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
