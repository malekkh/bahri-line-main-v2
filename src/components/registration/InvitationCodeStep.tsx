import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { InvitationCodeFormData } from '@/schemas/auth.schema';

interface InvitationCodeStepProps {
  form: UseFormReturn<InvitationCodeFormData>;
}

export const InvitationCodeStep: React.FC<InvitationCodeStepProps> = ({ form }) => {
  const t = useTranslations('registration');
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      {/* Invitation Code Field */}
      <div className="space-y-2">
        <Label htmlFor="invitationCode" className="text-white font-[325]">
          {t('fields.invitationCode')}
        </Label>
        <Input
          id="invitationCode"
          type="text"
          placeholder={t('placeholders.default')}
          {...register('invitationCode')}
          className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
        />
        {errors.invitationCode && (
          <p className="text-red-400 text-sm">{errors.invitationCode.message}</p>
        )}
      </div>
    </div>
  );
};
