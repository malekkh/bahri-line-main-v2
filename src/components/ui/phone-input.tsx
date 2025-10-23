import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from '@/lib/utils';

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = "Enter phone number",
  className,
  disabled = false,
  id,
  name,
}) => {
  return (
    <PhoneInput
      id={id}
      name={name}
      value={value}
      onChange={(value: string | undefined) => onChange?.(value || undefined)}
      placeholder={placeholder}
      disabled={disabled}
      defaultCountry="SA" // Default to Saudi Arabia
      international
      countryCallingCodeEditable={false}
      className={cn(
        "phone-input-custom",
        className
      )}
      style={{
        '--PhoneInput-color--focus': '#ffffff',
        '--PhoneInput-color--focus-ring': '#FF6720',
        '--PhoneInput-color--focus-ring-opacity': '0.2',
      } as React.CSSProperties}
    />
  );
};
