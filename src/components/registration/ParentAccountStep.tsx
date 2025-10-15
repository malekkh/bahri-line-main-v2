import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { ParentAccountFormData } from '@/schemas/auth.schema';

interface ParentAccountStepProps {
  form: UseFormReturn<ParentAccountFormData>;
}

export const ParentAccountStep: React.FC<ParentAccountStepProps> = ({ form }) => {
  const t = useTranslations('registration');
  const { register, formState: { errors }, watch } = form;
  const hasParentAccount = watch('hasParentAccount');

  return (
    <div className="space-y-6">
      {/* Radio Button Options */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="hasParentYes"
              value="yes"
              {...register('hasParentAccount')}
              className="w-4 h-4 text-[#FF6720] accent-[#E2622E] bg-transparent"
            />
            <Label htmlFor="hasParentYes" className="mx-2 text-white font-[325]">
              {t('fields.hasParentAccount')}
            </Label>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="hasParentNo"
              value="no"
              {...register('hasParentAccount')}
              className="w-4 h-4 text-[#FF6720] accent-[#E2622E] bg-transparent"
            />
            <Label htmlFor="hasParentNo" className="mx-2 text-white font-[325]">
              {t('fields.noParentAccount')}
            </Label>
          </div>
        </div>
      </div>

      {/* Conditional Fields - Show only if "Yes" is selected */}
      {hasParentAccount === 'yes' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentAccountName" className="text-white font-[325]">
              {t('fields.parentAccountName')}
            </Label>
            <Input
              id="parentAccountName"
              type="text"
              placeholder={t('placeholders.parentAccountName')}
              {...register('parentAccountName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.parentAccountName && (
              <p className="text-red-400 text-sm">{errors.parentAccountName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentCRNumber" className="text-white font-[325]" required>
              {t('fields.parentCRNumber')}
            </Label>
            <Input
              id="parentCRNumber"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('parentCRNumber')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.parentCRNumber && (
              <p className="text-red-400 text-sm">{errors.parentCRNumber.message}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
