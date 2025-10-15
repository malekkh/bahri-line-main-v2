import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';

interface InvitationCodeStepProps {
  onNext?: () => void;
}

export const InvitationCodeStep: React.FC<InvitationCodeStepProps> = ({ onNext }) => {
  const [invitationCode, setInvitationCode] = useState('');
  const t = useTranslations('registration');

  return (
    <div className="space-y-6">
      {/* Invitation Code Field */}
      <div className="space-y-2">
        <Label htmlFor="invitation-code" className="text-white font-[325]">
          {t('fields.invitationCode')}
        </Label>
        <Input
          id="invitation-code"
          type="text"
          placeholder={t('placeholders.default')}
          value={invitationCode}
          onChange={(e) => setInvitationCode(e.target.value)}
          className="bg-transparent border-[#EDF1F3] focus:border-white text-white placeholder:text-white/60"
        />
      </div>
    </div>
  );
};
