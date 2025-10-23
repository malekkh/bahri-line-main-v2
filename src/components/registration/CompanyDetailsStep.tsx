import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhoneInputComponent } from '@/components/ui/phone-input';
import { ChevronDown, Info, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { CompanyDetailsFormData, ParentAccountFormData } from '@/schemas/auth.schema';
import { useCompanyCRValidation } from '@/customhooks/useCompanyCRValidation';
import { useTerritories } from '@/customhooks/useTerritories';
import { useCountries } from '@/customhooks/useCountries';

const BUSINESS_TYPE_OPTIONS = [
  { value: "1", label: "Sole Proprietorship" },
  { value: "269340001", label: "Partnership" },
  { value: "876490001", label: "LLC" },
  { value: "876490002", label: "Corporation" },
];

interface CompanyDetailsStepProps {
  form: UseFormReturn<CompanyDetailsFormData>;
  parentAccountForm?: UseFormReturn<ParentAccountFormData>;
}

export const CompanyDetailsStep: React.FC<CompanyDetailsStepProps> = ({ form, parentAccountForm }) => {
  const t = useTranslations('registration');
  const { register, formState: { errors }, watch, setValue } = form;
  const { isValidating, isValid, errorMessage, validateCR } = useCompanyCRValidation(500);

  // Fetch territories using custom hook
  const { territories, isLoading: isLoadingTerritories } = useTerritories();

  // Fetch countries using custom hook
  const { countries, isLoading: isLoadingCountries } = useCountries();

  // Watch CR number field for real-time validation
  const crNumber = watch('ntw_crnumber');
  const addressCountry = watch('address1_country');

  useEffect(() => {
    if (crNumber && crNumber.length >= 3) {
      validateCR(crNumber);
    }
  }, [crNumber, validateCR]);

  // Auto-fill parent company from previous step data
  useEffect(() => {
    // Get the parent account data from the registration form context
    // This would come from the registration logic hook that manages all form data
    const parentAccountName = (form as any).parentAccountForm?.getValues?.('parentaccountname');
    const parentAccountId = (form as any).parentAccountForm?.getValues?.('parentaccountid');
    
    if (parentAccountName) {
      setValue('parentCompany' as any, parentAccountName);
    }
    if (parentAccountId) {
      setValue('parentaccountid@odata.bind' as any, `/accounts(${parentAccountId})`);
    }
  }, [setValue]);

  return (
    <div className="space-y-6">
      {/* Form Fields - Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="parentCompany" className="text-white font-[325]">
              Parent Company
            </Label>
            <Input
              id="parentCompany"
              type="text"
              placeholder="Auto-filled from parent account"
              value={parentAccountForm?.getValues('parentaccountname')}
              {...register('parentaccountid@odata.bind')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
              readOnly
            />
            <div className="h-5"></div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <Label htmlFor="ntw_crnumber" className="text-white font-[325]" required>
                CR Number
              </Label>
              <Info className="h-3 w-3 text-white/60" />
            </div>
            <div className="relative">
              <Input
                id="ntw_crnumber"
                type="text"
                placeholder="Placeholder"
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
            <div className="h-5">
              {errors.ntw_crnumber && (
                <p className="text-red-400 text-sm">{errors.ntw_crnumber.message}</p>
              )}
              {errorMessage && isValid === false && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}
              {isValid === true && crNumber && (
                <p className="text-green-400 text-sm">CR number is available</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businesstypecode" className="text-white font-[325]" required>
              Business Type
            </Label>
            <div className="relative">
              <select
                id="businesstypecode"
                {...register('businesstypecode')}
                className="flex h-9 w-full rounded-md border border-[#EDF1F3] bg-transparent px-3 py-1 mt-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white focus:border-white pr-10 appearance-none cursor-pointer"
              >
                <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                  Select Business Type
                </option>
                {BUSINESS_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
            </div>
            <div className="h-5">
              {errors.businesstypecode && (
                <p className="text-red-400 text-sm">{errors.businesstypecode.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="territoryid@odata.bind" className="text-white font-[325]" required>
              Territory
            </Label>
            <div className="relative">
              <select
                id="territoryid@odata.bind"
                className="flex h-9 w-full rounded-md border border-[#EDF1F3] bg-transparent px-3 py-1 mt-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white focus:border-white pr-10 appearance-none cursor-pointer"
                disabled={isLoadingTerritories}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  const formattedValue = selectedValue ? `/territories(${selectedValue})` : '';
                  setValue('territoryid_odata_bind' as any, formattedValue, { shouldValidate: true });
                }}
              >
                <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                  {isLoadingTerritories ? 'Loading territories...' : 'Select Territory'}
                </option>
                {territories.map((territory) => (
                  <option key={territory.value} value={territory.value} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {territory.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
              {/* Hidden input for territoryid_odata_bind validation */}
              <input
                type="hidden"
                {...register('territoryid_odata_bind')}
                value={watch('territoryid_odata_bind') || ''}
              />
            </div>
            <div className="h-5">
              {errors['territoryid_odata_bind'] && (
                <p className="text-red-400 text-sm">{errors['territoryid_odata_bind'].message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white font-[325]" required>
              Company Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Placeholder"
              {...register('name')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name.message}</p>
              )}
            </div>
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
              placeholder="Placeholder"
              {...register('ntw_vatnumber')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.ntw_vatnumber && (
                <p className="text-red-400 text-sm">{errors.ntw_vatnumber.message}</p>
              )}
            </div>
          </div>

          

          <div className="space-y-2">
            <Label htmlFor="mobilephone" className="text-white font-[325]" required>
              Mobile Phone
            </Label>
            <PhoneInputComponent
              id="mobilephone"
              value={watch('mobilephone')}
              onChange={(value) => setValue('mobilephone', value || '')}
              placeholder="Enter mobile phone number"
              className="w-full"
            />
            <div className="h-5">
              {errors.telephone1 && (
                <p className="text-red-400 text-sm">{errors.telephone1.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessPhone" className="text-white font-[325]" required>
              Business Phone
            </Label>
            <PhoneInputComponent
              id="businessPhone"
              value={watch('telephone1')}
              onChange={(value) => setValue('telephone1', value || '')}
              placeholder="Enter business phone number"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Additional Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street" className="text-white font-[325]" required>
              Street
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="Placeholder"
              {...register('address1_line1')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.address1_line1 && (
                <p className="text-red-400 text-sm">{errors.address1_line1.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_stateorprovince" className="text-white font-[325]" required>
              State
            </Label>
            <Input
              id="address1_stateorprovince"
              type="text"
              placeholder="Placeholder"
              {...register('address1_stateorprovince')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.address1_stateorprovince && (
                <p className="text-red-400 text-sm">{errors.address1_stateorprovince.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_city" className="text-white font-[325]" required>
              City
            </Label>
            <Input
              id="address1_city"
              type="text"
              placeholder="Placeholder"
              {...register('address1_city')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.address1_city && (
                <p className="text-red-400 text-sm">{errors.address1_city.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="websiteurl" className="text-white font-[325]" required>
              Website
            </Label>
            <Input
              id="websiteurl"
              type="url"
              placeholder="Placeholder"
              {...register('websiteurl')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.websiteurl && (
                <p className="text-red-400 text-sm">{errors.websiteurl.message}</p>
              )}
            </div>
          </div>
          
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address1_country" className="text-white font-[325]" required>
              Country
            </Label>
            <div className="relative">
              <select
                id="address1_country"
                className="flex h-9 w-full rounded-md border border-[#EDF1F3] bg-transparent px-3 py-1 mt-2 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white focus:border-white pr-10 appearance-none cursor-pointer"
                disabled={isLoadingCountries}
                onChange={(e) => {
                  const selectedCountry = countries.find(country => country.countryid === e.target.value);
                  if (selectedCountry) {
                    // Set the country name for address1_country field
                    setValue('address1_country', selectedCountry.name, { shouldValidate: true });
                    // Set the odata.bind format for ntw_Country_odata_bind field
                    setValue('ntw_Country_odata_bind' as any, `/ntw_countries(${selectedCountry.countryid})`, { shouldValidate: true });
                  } else {
                    setValue('address1_country', '', { shouldValidate: true });
                    setValue('ntw_Country_odata_bind' as any, '', { shouldValidate: true });
                  }
                }}
              >
                <option value="" style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                  {isLoadingCountries ? 'Loading countries...' : 'Select Country'}
                </option>
                {countries.map((country) => (
                  <option key={country.countryid} value={country.countryid} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                    {country.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
              {/* Hidden input for ntw_Country_odata_bind validation */}
              <input
                type="hidden"
                {...register('ntw_Country_odata_bind')}
                value={watch('ntw_Country_odata_bind') || ''}
              />
            </div>
            <div className="h-5">
              {errors.address1_country && (
                <p className="text-red-400 text-sm">{errors.address1_country.message}</p>
              )}
              {errors['ntw_Country_odata_bind'] && (
                <p className="text-red-400 text-sm">{errors['ntw_Country_odata_bind'].message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_postalcode" className="text-white font-[325]" required>
              Zip Code
            </Label>
            <Input
              id="address1_postalcode"
              type="text"
              placeholder="Placeholder"
              {...register('address1_postalcode')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.address1_postalcode && (
                <p className="text-red-400 text-sm">{errors.address1_postalcode.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_fax" className="text-white font-[325]" required>
              Fax
            </Label>
            <Input
              id="address1_fax"
              type="text"
              placeholder="Placeholder"
              {...register('address1_fax')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.address1_fax && (
                <p className="text-red-400 text-sm">{errors.address1_fax.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="numberOfEmployees" className="text-white font-[325]">
              Number of Employee
            </Label>
            <Input
              id="numberOfEmployees"
              type="number"
              placeholder="Placeholder"
              {...register('numberOfEmployees')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
