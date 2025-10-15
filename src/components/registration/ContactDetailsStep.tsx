import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface ContactDetailsStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

export const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ 
  onNext, 
  onPrevious 
}) => {
  const t = useTranslations('registration');
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[200px] overflow-y-auto pe-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white font-[325]" required>
              {t('fields.firstName')}
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessPhone" className="text-white font-[325]" required>
              {t('fields.businessPhone')}
            </Label>
            <Input
              id="businessPhone"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.businessPhone}
              onChange={(e) => handleInputChange('businessPhone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fax" className="text-white font-[325]">
              {t('fields.fax')}
            </Label>
            <Input
              id="fax"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.fax}
              onChange={(e) => handleInputChange('fax', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-[325]" required>
              {t('fields.email')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('placeholders.default')}
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
              {t('fields.lastName')}
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobilePhone" className="text-white font-[325]" required>
              {t('fields.mobilePhone')}
            </Label>
            <Input
              id="mobilePhone"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.mobilePhone}
              onChange={(e) => handleInputChange('mobilePhone', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-white font-[325]" required>
              {t('fields.city')}
            </Label>
            <Input
              id="city"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-white font-[325]" required>
              {t('fields.street')}
            </Label>
            <Input
              id="street"
              type="text"
              placeholder={t('placeholders.default')}
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
              {t('fields.jobTitle')}
            </Label>
            <Input
              id="jobTitle"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthday" className="text-white font-[325]">
              {t('fields.birthday')}
            </Label>
            <div className="relative">
              <Input
                id="birthday"
                type="text"
                placeholder={t('placeholders.default')}
                value={formData.birthday}
                onChange={(e) => handleInputChange('birthday', e.target.value)}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-white font-[325]" required>
              {t('fields.country')}
            </Label>
            <Input
              id="country"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stateProvince" className="text-white font-[325]" required>
              {t('fields.stateProvince')}
            </Label>
            <Input
              id="stateProvince"
              type="text"
              placeholder={t('placeholders.default')}
              value={formData.stateProvince}
              onChange={(e) => handleInputChange('stateProvince', e.target.value)}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
