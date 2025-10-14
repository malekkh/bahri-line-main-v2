import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

interface ContactDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ 
  onNext, 
  onPrevious 
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    businessPhone: '',
    mobilePhone: '',
    fax: '',
    email: '',
    birthday: '',
    city: '',
    street: '',
    country: '',
    stateProvince: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // TODO: Add validation
    onNext();
  };

  const requiredFields = [
    'firstName', 'lastName', 'jobTitle', 'businessPhone', 
    'mobilePhone', 'email', 'city', 'street', 'country', 'stateProvince'
  ];

  return (
    <div className="space-y-6">
      {/* Form Fields - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-96 overflow-y-auto pr-2">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white font-[325]" required>
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Placeholder"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessPhone" className="text-white font-[325]" required>
              Business Phone
            </Label>
            <Input
              id="businessPhone"
              type="tel"
              placeholder="Placeholder"
              value={formData.businessPhone}
              onChange={(e) => handleInputChange('businessPhone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fax" className="text-white font-[325]">
              Fax
            </Label>
            <Input
              id="fax"
              type="text"
              placeholder="Placeholder"
              value={formData.fax}
              onChange={(e) => handleInputChange('fax', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-[325]" required>
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Placeholder"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white font-[325]" required>
              Last name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Placeholder"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobilePhone" className="text-white font-[325]" required>
              Mobile Phone
            </Label>
            <Input
              id="mobilePhone"
              type="tel"
              placeholder="Placeholder"
              value={formData.mobilePhone}
              onChange={(e) => handleInputChange('mobilePhone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-white font-[325]" required>
              City
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Placeholder"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-white font-[325]" required>
              Street
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="Placeholder"
              value={formData.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-white font-[325]" required>
              Job Title
            </Label>
            <Input
              id="jobTitle"
              type="text"
              placeholder="Placeholder"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthday" className="text-white font-[325]">
              Birthday
            </Label>
            <div className="relative">
              <Input
                id="birthday"
                type="text"
                placeholder="Placeholder"
                value={formData.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-white font-[325]" required>
              Country
            </Label>
            <Input
              id="country"
              type="text"
              placeholder="Placeholder"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stateProvince" className="text-white font-[325]" required>
              State/Province
            </Label>
            <Input
              id="stateProvince"
              type="text"
              placeholder="Placeholder"
              value={formData.stateProvince}
              onChange={(e) => handleInputChange('stateProvince', e.target.value)}
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
          Previous: Invitation code
        </Button>
        
        <Button
          onClick={handleNext}
          className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold"
        >
          Next: Parent Account
        </Button>
      </div>
    </div>
  );
};
