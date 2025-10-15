import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

interface BankDetailsStepProps {
  onPrevious: () => void;
}

export const BankDetailsStep: React.FC<BankDetailsStepProps> = ({ 
  onPrevious 
}) => {
  const t = useTranslations('registration');
  const [formData, setFormData] = useState({
    bankName: '',
    accountType: '',
    accountNumber: '',
    beneficiaryName: '',
    bankAddress: '',
    bankPhone: '',
    bankCity: '',
    bankState: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // TODO: Add validation and API call
    console.log('Registration completed:', formData);
  };

  return (
    <div className="space-y-6">
      {/* Form Fields - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[200px] overflow-y-auto pe-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName" className="text-white font-[325]" required>
              {t('fields.bankName')}
            </Label>
            <Input
              id="bankName"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType" className="text-white font-[325]" required>
              {t('fields.accountType')}
            </Label>
            <Input
              id="accountType"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.accountType}
              onChange={(e) => handleInputChange('accountType', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beneficiaryName" className="text-white font-[325]" required>
              {t('fields.beneficiaryName')}
            </Label>
            <Input
              id="beneficiaryName"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.beneficiaryName}
              onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankState" className="text-white font-[325]" required>
              {t('fields.bankState')}
            </Label>
            <Input
              id="bankState"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.bankState}
              onChange={(e) => handleInputChange('bankState', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="text-white font-[325]" required>
              {t('fields.accountNumber')}
            </Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankAddress" className="text-white font-[325]" required>
              {t('fields.bankAddress')}
            </Label>
            <Input
              id="bankAddress"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.bankAddress}
              onChange={(e) => handleInputChange('bankAddress', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankPhone" className="text-white font-[325]" required>
              {t('fields.bankPhone')}
            </Label>
            <Input
              id="bankPhone"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.bankPhone}
              onChange={(e) => handleInputChange('bankPhone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankCity" className="text-white font-[325]" required>
              {t('fields.bankCity')}
            </Label>
            <Input
              id="bankCity"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.bankCity}
              onChange={(e) => handleInputChange('bankCity', e.target.value)}
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
          {t('buttons.previous')}: {t('steps.companyDetails')}
        </Button>
        
        <Button
          onClick={handleSubmit}
          className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold"
        >
          {t('buttons.complete')}
        </Button>
      </div>
    </div>
  );
};
