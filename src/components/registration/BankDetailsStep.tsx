import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';
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
      {/* Form Fields - Multi Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankName" className="text-white font-[325]" required>
              Bank Name
            </Label>
            <Input
              id="bankName"
              type="text"
              placeholder="Enter bank name"
              {...register('bankName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankName && (
              <p className="text-red-400 text-sm">{errors.bankName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="beneficiaryName" className="text-white font-[325]" required>
              Account Beneficiary Name
            </Label>
            <Input
              id="beneficiaryName"
              type="text"
              placeholder="Enter beneficiary name"
              {...register('beneficiaryName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.beneficiaryName && (
              <p className="text-red-400 text-sm">{errors.beneficiaryName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountNumber" className="text-white font-[325]" required>
              Bank Account Number
            </Label>
            <Input
              id="accountNumber"
              type="text"
              placeholder="Enter account number"
              {...register('accountNumber')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.accountNumber && (
              <p className="text-red-400 text-sm">{errors.accountNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="w_typeofbankaccount" className="text-white font-[325]" required>
              Account Type
            </Label>
            <div className="relative">
              <Input
                id="w_typeofbankaccount"
                type="text"
                placeholder="Select account type"
                {...register('w_typeofbankaccount')}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
            {errors.w_typeofbankaccount && (
              <p className="text-red-400 text-sm">{errors.w_typeofbankaccount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankCountry" className="text-white font-[325]" required>
              Bank Country
            </Label>
            <div className="relative">
              <Input
                id="bankCountry"
                type="text"
                placeholder="Select bank country"
                {...register('bankCountry')}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
            {errors.bankCountry && (
              <p className="text-red-400 text-sm">{errors.bankCountry.message}</p>
            )}
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankCity" className="text-white font-[325]" required>
              Bank City
            </Label>
            <Input
              id="bankCity"
              type="text"
              placeholder="Enter bank city"
              {...register('bankCity')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankCity && (
              <p className="text-red-400 text-sm">{errors.bankCity.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankState" className="text-white font-[325]" required>
              Bank State/Province
            </Label>
            <Input
              id="bankState"
              type="text"
              placeholder="Enter bank state/province"
              {...register('bankState')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankState && (
              <p className="text-red-400 text-sm">{errors.bankState.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankAddress" className="text-white font-[325]" required>
              Bank Address
            </Label>
            <Input
              id="bankAddress"
              type="text"
              placeholder="Enter bank address"
              {...register('bankAddress')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankAddress && (
              <p className="text-red-400 text-sm">{errors.bankAddress.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankPhoneCountryCode" className="text-white font-[325]" required>
              Bank Phone Country Code
            </Label>
            <Input
              id="bankPhoneCountryCode"
              type="text"
              placeholder="+966"
              {...register('bankPhoneCountryCode')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankPhoneCountryCode && (
              <p className="text-red-400 text-sm">{errors.bankPhoneCountryCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bankPhoneNumber" className="text-white font-[325]" required>
              Bank Phone Number
            </Label>
            <Input
              id="bankPhoneNumber"
              type="text"
              placeholder="Enter bank phone number"
              {...register('bankPhoneNumber')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankPhoneNumber && (
              <p className="text-red-400 text-sm">{errors.bankPhoneNumber.message}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bankZipCode" className="text-white font-[325]" required>
              Bank Postal Code
            </Label>
            <Input
              id="bankZipCode"
              type="text"
              placeholder="Enter postal code"
              {...register('bankZipCode')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.bankZipCode && (
              <p className="text-red-400 text-sm">{errors.bankZipCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_swift" className="text-white font-[325]" required>
              SWIFT Code
            </Label>
            <Input
              id="ntw_swift"
              type="text"
              placeholder="Enter SWIFT code"
              {...register('ntw_swift')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_swift && (
              <p className="text-red-400 text-sm">{errors.ntw_swift.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_ibannocurrency" className="text-white font-[325]" required>
              IBAN with Currency
            </Label>
            <Input
              id="ntw_ibannocurrency"
              type="text"
              placeholder="Enter IBAN (e.g., SA0380000000608010167519)"
              {...register('ntw_ibannocurrency')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_ibannocurrency && (
              <p className="text-red-400 text-sm">{errors.ntw_ibannocurrency.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
