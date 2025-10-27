import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { BankDetailsFormData } from '@/schemas/auth.schema';

const BANK_ACCOUNT_TYPE_OPTIONS = [
  { value: "876490000", label: "Checking" },
  { value: "876490001", label: "Savings" },
  { value: "876490002", label: "Other" },
];

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
            <Label htmlFor="ntw_bankname" className="text-white font-[325]" required>
              Bank Name
            </Label>
            <Input
              id="ntw_bankname"
              type="text"
              placeholder="Enter bank name"
              {...register('ntw_bankname')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankname && (
              <p className="text-red-400 text-sm">{errors.ntw_bankname.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_bankbeneficiaryname" className="text-white font-[325]" required>
              Account Beneficiary Name
            </Label>
            <Input
              id="ntw_bankbeneficiaryname"
              type="text"
              placeholder="Enter beneficiary name"
              {...register('ntw_bankbeneficiaryname')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankbeneficiaryname && (
              <p className="text-red-400 text-sm">{errors.ntw_bankbeneficiaryname.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_bankaccountno" className="text-white font-[325]" required>
              Bank Account Number
            </Label>
            <Input
              id="ntw_bankaccountno"
              type="text"
              placeholder="Enter account number"
              {...register('ntw_bankaccountno')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankaccountno && (
              <p className="text-red-400 text-sm">{errors.ntw_bankaccountno.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_typeofbankaccount" className="text-white font-[325]" required>
              Account Type
            </Label>
            <div className="relative">
              <select
                id="ntw_typeofbankaccount"
                {...register('ntw_typeofbankaccount')}
                className="flex h-9 w-full rounded-md border border-[#EDF1F3] bg-transparent px-3 py-1 mt-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white focus:border-white pr-10 appearance-none cursor-pointer"
              >
                <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                  Select Account Type
                </option>
                {BANK_ACCOUNT_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
            </div>
            {errors.ntw_typeofbankaccount && (
              <p className="text-red-400 text-sm">{errors.ntw_typeofbankaccount.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_bankcity" className="text-white font-[325]" required>
              Bank City
            </Label>
            <Input
              id="ntw_bankcity"
              type="text"
              placeholder="Enter bank city"
              {...register('ntw_bankcity')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankcity && (
              <p className="text-red-400 text-sm">{errors.ntw_bankcity.message}</p>
            )}
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ntw_bankstate" className="text-white font-[325]" required>
              Bank State/Province
            </Label>
            <Input
              id="ntw_bankstate"
              type="text"
              placeholder="Enter bank state/province"
              {...register('ntw_bankstate')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankstate && (
              <p className="text-red-400 text-sm">{errors.ntw_bankstate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_bankaddress" className="text-white font-[325]" required>
              Bank Address
            </Label>
            <Input
              id="ntw_bankaddress"
              type="text"
              placeholder="Enter bank address"
              {...register('ntw_bankaddress')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankaddress && (
              <p className="text-red-400 text-sm">{errors.ntw_bankaddress.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_bankphone" className="text-white font-[325]" required>
              Bank Phone Number
            </Label>
            <Input
              id="ntw_bankphone"
              type="text"
              placeholder="+1 (212) 902-1000"
              {...register('ntw_bankphone')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankphone && (
              <p className="text-red-400 text-sm">{errors.ntw_bankphone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_bankzipcode" className="text-white font-[325]" required>
              Bank Postal Code
            </Label>
            <Input
              id="ntw_bankzipcode"
              type="text"
              placeholder="Enter postal code"
              {...register('ntw_bankzipcode')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_bankzipcode && (
              <p className="text-red-400 text-sm">{errors.ntw_bankzipcode.message}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
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
