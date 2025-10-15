import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { ContactDetailsFormData } from '@/schemas/auth.schema';

interface ContactDetailsStepProps {
  form: UseFormReturn<ContactDetailsFormData>;
}

export const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({ form }) => {
  const t = useTranslations('registration');
  const { register, formState: { errors } } = form;

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
              {...register('firstName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessPhone" className="text-white font-[325]" required>
              {t('fields.businessPhone')}
            </Label>
            <Input
              id="businessPhone"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('businessPhone')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.businessPhone && (
              <p className="text-red-400 text-sm">{errors.businessPhone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fax" className="text-white font-[325]">
              {t('fields.fax')}
            </Label>
            <Input
              id="fax"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('fax')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.fax && (
              <p className="text-red-400 text-sm">{errors.fax.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white font-[325]" required>
              {t('fields.email')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('placeholders.default')}
              {...register('email')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
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
              {...register('lastName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm">{errors.lastName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobilePhone" className="text-white font-[325]" required>
              {t('fields.mobilePhone')}
            </Label>
            <Input
              id="mobilePhone"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('mobilePhone')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.mobilePhone && (
              <p className="text-red-400 text-sm">{errors.mobilePhone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-white font-[325]" required>
              {t('fields.city')}
            </Label>
            <Input
              id="city"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('city')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.city && (
              <p className="text-red-400 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-white font-[325]" required>
              {t('fields.street')}
            </Label>
            <Input
              id="street"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('street')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.street && (
              <p className="text-red-400 text-sm">{errors.street.message}</p>
            )}
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
              {...register('jobTitle')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.jobTitle && (
              <p className="text-red-400 text-sm">{errors.jobTitle.message}</p>
            )}
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
                {...register('birthday')}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
            {errors.birthday && (
              <p className="text-red-400 text-sm">{errors.birthday.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-white font-[325]" required>
              {t('fields.country')}
            </Label>
            <Input
              id="country"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('country')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.country && (
              <p className="text-red-400 text-sm">{errors.country.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stateProvince" className="text-white font-[325]" required>
              {t('fields.stateProvince')}
            </Label>
            <Input
              id="stateProvince"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('stateProvince')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.stateProvince && (
              <p className="text-red-400 text-sm">{errors.stateProvince.message}</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
