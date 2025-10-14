'use client';

import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Button } from './button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const switchLocale = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-lg p-1 border border-white/20">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('en')}
        className={`text-xs font-medium transition-all ${
          currentLocale === 'en'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        <Globe className="h-3 w-3 mr-1" />
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('ar')}
        className={`text-xs font-medium transition-all ${
          currentLocale === 'ar'
            ? 'bg-white/20 text-white'
            : 'text-white/70 hover:text-white hover:bg-white/10'
        }`}
      >
        <Globe className="h-3 w-3 mr-1" />
        AR
      </Button>
    </div>
  );
}

