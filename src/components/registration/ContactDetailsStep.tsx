import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
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
      {/* Form Fields - Multi Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[400px] overflow-y-auto pe-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-white font-[325]" required>
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Placeholder"
              {...register('firstName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.firstName && (
                <p className="text-red-400 text-sm">{errors.firstName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white font-[325]" required>
              Business Phone
            </Label>
            <Input
              id="phone"
              type="text"
              placeholder="Placeholder"
              {...register('phone')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_fax" className="text-white font-[325]">
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
            <Label htmlFor="email" className="text-white font-[325]" required>
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Placeholder"
              {...register('email')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-white font-[325]" required>
              Last name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Placeholder"
              {...register('lastName')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.lastName && (
                <p className="text-red-400 text-sm">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobilePhone" className="text-white font-[325]" required>
              Mobile Phone
            </Label>
            <Input
              id="mobilePhone"
              type="text"
              placeholder="Placeholder"
              {...register('mobilePhone')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.mobilePhone && (
                <p className="text-red-400 text-sm">{errors.mobilePhone.message}</p>
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
            <Label htmlFor="street" className="text-white font-[325]" required>
              Street
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="Placeholder"
              {...register('street')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.street && (
                <p className="text-red-400 text-sm">{errors.street.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-white font-[325]" required>
              Job Title
            </Label>
            <Input
              id="jobTitle"
              type="text"
              placeholder="Placeholder"
              {...register('jobTitle')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.jobTitle && (
                <p className="text-red-400 text-sm">{errors.jobTitle.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthday" className="text-white font-[325]">
              Birthday
            </Label>
            <div className="relative">
              <Input
                id="birthday"
                type="date"
                placeholder="Placeholder"
                {...register('birthday')}
                className="bg-transparent border-[#EDF1F3] focus:border-white text-white [color-scheme:dark] cursor-pointer pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60 pointer-events-none" />
            </div>
            <div className="h-5">
              {errors.birthday && (
                <p className="text-red-400 text-sm">{errors.birthday.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address1_country" className="text-white font-[325]" required>
              Country
            </Label>
            <Input
              id="address1_country"
              type="text"
              placeholder="Placeholder"
              {...register('address1_country')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.address1_country && (
                <p className="text-red-400 text-sm">{errors.address1_country.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-white font-[325]" required>
              State/Province
            </Label>
            <Input
              id="state"
              type="text"
              placeholder="Placeholder"
              {...register('state')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.state && (
                <p className="text-red-400 text-sm">{errors.state.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Password Fields - Full Width */}
        <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white font-[325]" required>
              Password
            </Label>
            <PasswordInput
              id="password"
              placeholder="Placeholder"
              {...register('password')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.password && (
                <p className="text-red-400 text-sm">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white font-[325]" required>
              Confirm Password
            </Label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Placeholder"
              {...register('confirmPassword')}
              className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
            />
            <div className="h-5">
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
