import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  variant = 'default'
}) => {
  const logoSrc = variant === 'light' ? '/images/lightlogo.svg' : '/images/logo.png';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo Image */}
      <Image
        src={logoSrc}
        alt="Bahri Line Logo"
        width={200}
        height={80}
        className="object-contain"
        priority
      />
    </div>
  );
};

export { Logo };
