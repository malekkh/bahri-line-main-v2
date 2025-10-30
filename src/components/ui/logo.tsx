'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

const Logo: React.FC<LogoProps> = ({ className, variant = 'default' }) => {
  const logoSrc = variant === 'light' ? '/images/lightlogo.svg' : '/images/logo.png';
  const params = useParams();
  const locale = (params as { locale?: string })?.locale || 'en';

  return (
    <Link href={`/${locale}`} aria-label="Go to home" className={cn('flex items-center gap-2', className)}>
      <Image
        src={logoSrc}
        alt="Bahri Line Logo"
        width={200}
        height={80}
        className="object-contain"
        priority
      />
    </Link>
  );
};

export { Logo };
