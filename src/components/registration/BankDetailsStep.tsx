import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BankDetailsStepProps {
  onPrevious: () => void;
}

export const BankDetailsStep: React.FC<BankDetailsStepProps> = ({ 
  onPrevious 
}) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-y-auto pr-2">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName" className="text-white font-[325]" required>
              Bank name
            </Label>
            <Input
              id="bankName"
              type="text"
              placeholder="Placeholder"
              value={formData.bankName}
              onChange={(e) => handleInputChange('bankName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType" className="text-white font-[325]" required>
              Type of Bank Account
            </Label>
            <Input
              id="accountType"
              type="text"
              placeholder="Placeholder"
              value={formData.accountType}
              onChange={(e) => handleInputChange('accountType', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="beneficiaryName" className="text-white font-[325]" required>
              Beneficiary Name
            </Label>
            <Input
              id="beneficiaryName"
              type="text"
              placeholder="Placeholder"
              value={formData.beneficiaryName}
              onChange={(e) => handleInputChange('beneficiaryName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankState" className="text-white font-[325]" required>
              Bank State
            </Label>
            <Input
              id="bankState"
              type="text"
              placeholder="Placeholder"
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
              Account no.
            </Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Placeholder"
              value={formData.accountNumber}
              onChange={(e) => handleInputChange('accountNumber', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankAddress" className="text-white font-[325]" required>
              Bank Address
            </Label>
            <Input
              id="bankAddress"
              type="text"
              placeholder="Placeholder"
              value={formData.bankAddress}
              onChange={(e) => handleInputChange('bankAddress', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankPhone" className="text-white font-[325]" required>
              Bank Phone
            </Label>
            <Input
              id="bankPhone"
              type="tel"
              placeholder="Placeholder"
              value={formData.bankPhone}
              onChange={(e) => handleInputChange('bankPhone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankCity" className="text-white font-[325]" required>
              Bank City
            </Label>
            <Input
              id="bankCity"
              type="text"
              placeholder="Placeholder"
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
          Previous: Company Details
        </Button>
        
        <Button
          onClick={handleSubmit}
          className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};
