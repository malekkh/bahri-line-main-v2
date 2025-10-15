import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ParentAccountStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const ParentAccountStep: React.FC<ParentAccountStepProps> = ({ 
  onNext, 
  onPrevious 
}) => {
  const [hasParentAccount, setHasParentAccount] = useState<'yes' | 'no'>('yes');
  const [parentAccountName, setParentAccountName] = useState('');
  const [parentCRNumber, setParentCRNumber] = useState('');

  const handleNext = () => {
    // TODO: Add validation
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Radio Button Options */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="hasParentYes"
              name="hasParentAccount"
              value="yes"
              checked={hasParentAccount === 'yes'}
              onChange={(e) => setHasParentAccount(e.target.value as 'yes' | 'no')}
              className="w-4 h-4 text-[#FF6720] accent-[#E2622E] bg-transparent"
            />
            <Label htmlFor="hasParentYes" className="mx-2 text-white font-[325]">
              Yes my company has a parent account
            </Label>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="hasParentNo"
              name="hasParentAccount"
              value="no"
              checked={hasParentAccount === 'no'}
              onChange={(e) => setHasParentAccount(e.target.value as 'yes' | 'no')}
              className="w-4 h-4 text-[#FF6720] accent-[#E2622E] bg-transparent"
            />
            <Label htmlFor="hasParentNo" className="mx-2 text-white font-[325]">
              No, my company doesn't have a parent account
            </Label>
          </div>
        </div>
      </div>

      {/* Conditional Fields - Show only if "Yes" is selected */}
      {hasParentAccount === 'yes' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentAccountName" className="text-white font-[325]">
              Parent account name
            </Label>
            <Input
              id="parentAccountName"
              type="text"
              placeholder="Parent account name"
              value={parentAccountName}
              onChange={(e) => setParentAccountName(e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentCRNumber" className="text-white font-[325]" required>
              Parent CR Number
            </Label>
            <Input
              id="parentCRNumber"
              type="text"
              placeholder="Placeholder"
              value={parentCRNumber}
              onChange={(e) => setParentCRNumber(e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="bg-transparent border-[#FF6720] text-white hover:bg-[#FF6720]/10"
        >
          Previous: Contact Details
        </Button>
        
        <Button
          onClick={handleNext}
          className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold"
        >
          Next: Company details
        </Button>
      </div>
    </div>
  );
};
