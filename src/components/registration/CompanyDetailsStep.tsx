import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown, Info, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { CompanyDetailsFormData } from '@/schemas/auth.schema';
import { useCRValidation } from '@/customhooks/useCRValidation';

interface CompanyDetailsStepProps {
  form: UseFormReturn<CompanyDetailsFormData>;
}

export const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ form }) => {
  const t = useTranslations('registration');
  const { register, formState: { errors }, watch } = form;
  const { isValidating, isValid, errorMessage, validateCR } = useCRValidation(500);

  // Watch CR number field for real-time validation
  const crNumber = watch('crNumber');

  useEffect(() => {
    if (crNumber && crNumber.length >= 3) {
      validateCR(crNumber);
    }
  }, [crNumber, validateCR]);

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
              {...register('parentCompany')}
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
            <div className="relative">
              <Input
                id="crNumber"
                type="text"
                placeholder={t('placeholders.default')}
                {...register('crNumber')}
                className={`bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10 ${
                  isValid === false ? 'border-red-400' : isValid === true ? 'border-green-400' : ''
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {isValidating ? (
                  <Loader2 className="h-4 w-4 text-white/60 animate-spin" />
                ) : isValid === true ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : isValid === false ? (
                  <XCircle className="h-4 w-4 text-red-400" />
                ) : null}
              </div>
            </div>
            {errors.crNumber && (
              <p className="text-red-400 text-sm">{errors.crNumber.message}</p>
            )}
            {errorMessage && isValid === false && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
            {isValid === true && crNumber && (
              <p className="text-green-400 text-sm">CR number is valid</p>
            )}
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
              {...register('businessType')}
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
              {...register('territory')}
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
              {...register('companyName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.companyName && (
              <p className="text-red-400 text-sm">{errors.companyName.message}</p>
            )}
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
              {...register('vatNumber')}
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
              {...register('numberOfEmployees')}
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
              {...register('phone')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
