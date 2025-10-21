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
  const { isValidating, isValid, errorMessage, validateCR } = useCRValidation(500);
  
  const hasParentAccount = watch('hasParentAccount');
  const parentCrNumber = watch('parentCrNumber');

  // Watch CR number field for real-time validation and auto-fill
  useEffect(() => {
    if (parentCrNumber && parentCrNumber.length > 3) {
      validateCR(parentCrNumber);
      // Note: In a real implementation, you'd handle the API response
      // to auto-fill parentaccountname and parentaccountid
    }
  }, [parentCrNumber, validateCR]);

  return (
    <div className="space-y-6">
      {/* Toggle Options */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hasParentAccount"
              checked={hasParentAccount || false}
              onChange={(e) => setValue('hasParentAccount', e.target.checked)}
              className="w-4 h-4 text-[#FF6720] accent-[#E2622E] bg-transparent"
            />
            <Label htmlFor="hasParentAccount" className="mx-2 text-white font-[325]">
              Has Parent Account
            </Label>
          </div>
        </div>
      </div>

      {/* Conditional Fields - Show only if parent account is selected */}
      {hasParentAccount && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentaccountname" className="text-white font-[325]">
              Parent Account Name
            </Label>
            <Input
              id="parentaccountname"
              type="text"
              placeholder="Auto-filled from CR lookup"
              {...register('parentaccountname')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parentCRNumber" className="text-white font-[325]" required>
              Parent CR Number
            </Label>
            <div className="relative">
              <Input
                id="parentCRNumber"
                type="text"
                placeholder="Enter parent CR number"
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

          {/* Hidden field for parentaccountid */}
          <input type="hidden" {...register('parentaccountid')} />
        </div>
      )}

    </div>
  );
};
