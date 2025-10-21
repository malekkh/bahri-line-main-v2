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
  const crNumber = watch('ntw_crnumber');
  const addressCountry = watch('addressCountry');

  useEffect(() => {
    if (crNumber && crNumber.length >= 3) {
      validateCR(crNumber);
    }
  }, [crNumber, validateCR]);

  return (
    <div className="space-y-6">
      {/* Form Fields - Multi Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[400px] overflow-y-auto pe-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-[325]" required>
              Company Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter company name"
              {...register('name')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ntw_companynameascr" className="text-white font-[325]">
              Company Name as per CR
            </Label>
            <Input
              id="ntw_companynameascr"
              type="text"
              placeholder="Auto-filled from parent"
              {...register('ntw_companynameascr')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone1CountryCode" className="text-white font-[325]" required>
              Company Phone Country Code
            </Label>
            <Input
              id="telephone1CountryCode"
              type="text"
              placeholder="+966"
              {...register('telephone1CountryCode')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.telephone1CountryCode && (
              <p className="text-red-400 text-sm">{errors.telephone1CountryCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="telephone1" className="text-white font-[325]" required>
              Company Phone Number
            </Label>
            <Input
              id="telephone1"
              type="text"
              placeholder="Enter company phone number"
              {...register('telephone1')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.telephone1 && (
              <p className="text-red-400 text-sm">{errors.telephone1.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="addressCountry" className="text-white font-[325]" required>
              Company Address Country
            </Label>
            <div className="relative">
              <Input
                id="addressCountry"
                type="text"
                placeholder="Select country"
                {...register('addressCountry')}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
            {errors.addressCountry && (
              <p className="text-red-400 text-sm">{errors.addressCountry.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="territoryid" className="text-white font-[325]" required>
              Business Territory
            </Label>
            <div className="relative">
              <Input
                id="territoryid"
                type="text"
                placeholder="Select territory"
                {...register('territoryid')}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
            {errors.territoryid && (
              <p className="text-red-400 text-sm">{errors.territoryid.message}</p>
            )}
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="numberOfEmployees" className="text-white font-[325]">
              Number of Employees
            </Label>
            <Input
              id="numberOfEmployees"
              type="number"
              placeholder="Enter number of employees"
              {...register('numberOfEmployees')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="text-white font-[325]" required>
              Company Street Address
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="Enter street address"
              {...register('street')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.street && (
              <p className="text-red-400 text-sm">{errors.street.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_postalcode" className="text-white font-[325]" required>
              Postal/ZIP Code
            </Label>
            <Input
              id="address1_postalcode"
              type="text"
              placeholder="Enter postal/ZIP code"
              {...register('address1_postalcode')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.address1_postalcode && (
              <p className="text-red-400 text-sm">{errors.address1_postalcode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_fax" className="text-white font-[325]">
              Company Fax
            </Label>
            <Input
              id="address1_fax"
              type="text"
              placeholder="Enter company fax (optional)"
              {...register('address1_fax')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteurl" className="text-white font-[325]" required>
              Company Website URL
            </Label>
            <Input
              id="websiteurl"
              type="url"
              placeholder="https://example.com"
              {...register('websiteurl')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.websiteurl && (
              <p className="text-red-400 text-sm">{errors.websiteurl.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businesstypecode" className="text-white font-[325]" required>
              Business Type Code
            </Label>
            <div className="relative">
              <Input
                id="businesstypecode"
                type="text"
                placeholder="Select business type"
                {...register('businesstypecode')}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60 pr-10"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            </div>
            {errors.businesstypecode && (
              <p className="text-red-400 text-sm">{errors.businesstypecode.message}</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="ntw_crnumber" className="text-white font-[325]" required>
                Company CR Number
              </Label>
              <Info className="h-3 w-3 text-white/60" />
            </div>
            <div className="relative">
              <Input
                id="ntw_crnumber"
                type="text"
                placeholder="Enter CR number"
                {...register('ntw_crnumber')}
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
            {errors.ntw_crnumber && (
              <p className="text-red-400 text-sm">{errors.ntw_crnumber.message}</p>
            )}
            {errorMessage && isValid === false && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
            {isValid === true && crNumber && (
              <p className="text-green-400 text-sm">CR number is valid</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="ntw_vatnumber" className="text-white font-[325]" required>
                VAT Number
              </Label>
              <Info className="h-3 w-3 text-white/60" />
            </div>
            <Input
              id="ntw_vatnumber"
              type="text"
              placeholder="Enter VAT number"
              {...register('ntw_vatnumber')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.ntw_vatnumber && (
              <p className="text-red-400 text-sm">{errors.ntw_vatnumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city" className="text-white font-[325]" required>
              Company City
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Enter company city"
              {...register('city')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.city && (
              <p className="text-red-400 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-white font-[325]" required>
              Company State
            </Label>
            <Input
              id="state"
              type="text"
              placeholder="Enter company state"
              {...register('state')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            {errors.state && (
              <p className="text-red-400 text-sm">{errors.state.message}</p>
            )}
          </div>

          {/* File Upload Fields for Saudi Arabia */}
          {addressCountry && addressCountry.toLowerCase() === 'saudi arabia' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="crAttachment" className="text-white font-[325]" required>
                  CR Document
                </Label>
                <Input
                  id="crAttachment"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register('crAttachment')}
                  className="bg-transparent border-[#EDF1F3] focus:border-white text-white"
                />
                {errors.crAttachment && (
                  <p className="text-red-400 text-sm">CR document is required</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatAttachment" className="text-white font-[325]" required>
                  VAT Document
                </Label>
                <Input
                  id="vatAttachment"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register('vatAttachment')}
                  className="bg-transparent border-[#EDF1F3] focus:border-white text-white"
                />
                {errors.vatAttachment && (
                  <p className="text-red-400 text-sm">VAT document is required</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
