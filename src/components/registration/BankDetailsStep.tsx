import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { BankDetailsFormData } from '@/schemas/auth.schema';

interface BankDetailsStepProps {
  form: UseFormReturn<BankDetailsFormData>;
}

export const BankDetailsStep: React.FC<BankDetailsStepProps> = ({ form }) => {
  const t = useTranslations('registration');
  const { register, formState: { errors } } = form;

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
              {...register('bankName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankName && (
              <p className="text-red-400 text-sm">{errors.bankName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType" className="text-white font-[325]" required>
              {t('fields.accountType')}
            </Label>
            <Input
              id="accountType"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('accountType')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.accountType && (
              <p className="text-red-400 text-sm">{errors.accountType.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="beneficiaryName" className="text-white font-[325]" required>
              {t('fields.beneficiaryName')}
            </Label>
            <Input
              id="beneficiaryName"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('beneficiaryName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.beneficiaryName && (
              <p className="text-red-400 text-sm">{errors.beneficiaryName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankState" className="text-white font-[325]" required>
              {t('fields.bankState')}
            </Label>
            <Input
              id="bankState"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('bankState')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankState && (
              <p className="text-red-400 text-sm">{errors.bankState.message}</p>
            )}
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
              {...register('accountNumber')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.accountNumber && (
              <p className="text-red-400 text-sm">{errors.accountNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankAddress" className="text-white font-[325]" required>
              {t('fields.bankAddress')}
            </Label>
            <Input
              id="bankAddress"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('bankAddress')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankAddress && (
              <p className="text-red-400 text-sm">{errors.bankAddress.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankPhone" className="text-white font-[325]" required>
              {t('fields.bankPhone')}
            </Label>
            <Input
              id="bankPhone"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('bankPhone')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankPhone && (
              <p className="text-red-400 text-sm">{errors.bankPhone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankCity" className="text-white font-[325]" required>
              {t('fields.bankCity')}
            </Label>
            <Input
              id="bankCity"
              type="text"
              placeholder={t('placeholders.default')}
              {...register('bankCity')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankCity && (
              <p className="text-red-400 text-sm">{errors.bankCity.message}</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};
