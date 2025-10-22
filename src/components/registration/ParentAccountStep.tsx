import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { ParentAccountFormData } from '@/schemas/auth.schema';
import { useCRValidation } from '@/customhooks/useCRValidation';

interface ParentAccountStepProps {
  form: UseFormReturn<ParentAccountFormData>;
}

export const ParentAccountStep: React.FC<ParentAccountStepProps> = ({ form }) => {
  const t = useTranslations('registration');
  const { register, formState: { errors }, watch, setValue } = form;
  const { isValidating, isValid, errorMessage, companyInfo, validateCR } = useCRValidation(500);
  
  const hasParentAccount = watch('hasParentAccount');
  const parentCrNumber = watch('parentCrNumber');

  // Watch CR number field for real-time validation and auto-fill
  useEffect(() => {
    if (parentCrNumber && parentCrNumber.length > 3) {
      validateCR(parentCrNumber);
    }
  }, [parentCrNumber, validateCR]);

  // Auto-fill parent account information when company info is available
  useEffect(() => {
    if (companyInfo && isValid) {
      setValue('parentaccountname', companyInfo.name);
      setValue('parentaccountid', companyInfo.accountid);
    } else if (isValid === false) {
      // Clear fields when validation fails
      setValue('parentaccountname', '');
      setValue('parentaccountid', '');
    }
  }, [companyInfo, isValid, setValue]);

  return (
    <div className="space-y-6">
      {/* Radio Button Options */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="hasParentAccountYes"
            name="hasParentAccount"
            value="yes"
            checked={hasParentAccount === true}
            onChange={() => setValue('hasParentAccount', true)}
            className="w-4 h-4 text-[#FF6720] accent-[#FF6720] bg-transparent border-white"
          />
          <Label htmlFor="hasParentAccountYes" className="text-white font-[325]">
            Yes my company has a parent account
          </Label>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="radio"
            id="hasParentAccountNo"
            name="hasParentAccount"
            value="no"
            checked={hasParentAccount === false}
            onChange={() => setValue('hasParentAccount', false)}
            className="w-4 h-4 text-[#FF6720] accent-[#FF6720] bg-transparent border-white"
          />
          <Label htmlFor="hasParentAccountNo" className="text-white font-[325]">
            No, my company doesn't have a parent account
          </Label>
        </div>
      </div>

      {/* Conditional Fields - Show only if parent account is selected */}
      {hasParentAccount && (
        <div className="space-y-4 w-full flex flex-col items-center gap-6 justify-between flex-row">
          <div className="space-y-2 w-full">
            <Label htmlFor="parentaccountname" className="text-white font-[325]">
              Parent account name
            </Label>
            <Input
              id="parentaccountname"
              type="text"
              placeholder="Parent account name"
              {...register('parentaccountname')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
              readOnly
            />
            <div className="h-5"></div>
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="parentCRNumber" className="text-white font-[325]" required>
              Parent CR Number 
            </Label>
            <div className="relative">
              <Input
                id="parentCRNumber"
                type="text"
                placeholder="Placeholder"
                {...register('parentCrNumber')}
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
            <div className="h-5">
              {errors.parentCrNumber && (
                <p className="text-red-400 text-sm">{errors.parentCrNumber.message}</p>
              )}
              {errorMessage && isValid === false && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}
              {isValid === true && parentCrNumber && (
                <p className="text-green-400 text-sm">CR number is valid</p>
              )}
            </div>
          </div>

          {/* Hidden field for parentaccountid */}
          <input type="hidden" {...register('parentaccountid')} />
        </div>
      )}

    </div>
  );
};
