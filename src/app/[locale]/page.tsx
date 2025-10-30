'use client';

/**
 * Home Page
 * Landing page for Bahri Line with hero section
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Linkedin, Twitter, Instagram, User2 } from 'lucide-react';
import { authRequests } from '@/services/requests/req';

export default function HomePage() {
  const t = useTranslations('home');
  const params = useParams();
  const locale = params.locale as string;
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;
    authRequests
      .checkSession()
      .then((res) => {
        if (!isMounted) return;
        setIsAuthenticated(Boolean(res?.data?.sessionActive));
      })
      .catch(() => {
        if (isMounted) setIsAuthenticated(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ship.webp"
          alt="Bahri Line Ship"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Filter Overlay */}
        <div className="absolute inset-0 bg-[#00000080]" />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Logo variant="light" />

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href={`/${locale}/about`}
              className="text-white hover:text-[#FF6720] transition-colors font-medium"
            >
              {t('aboutUs')}
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="text-white hover:text-[#FF6720] transition-colors font-medium"
            >
              {t('contactUs')}
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href={`/${locale}/tracker`}>
                {t('bookingTracker')}
              </Link>
            </Button>
            {isAuthenticated ? (
              <Link
                href={`/${locale}/profile`}
                aria-label="Profile"
                className="w-10 h-10 rounded-md bg-[#FF6720] hover:bg-[#FF6720]/90 text-white flex items-center justify-center"
              >
                <User2 className="w-5 h-5" />
              </Link>
            ) : (
              <Button
                className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white"
                asChild
              >
                <Link href={`/${locale}/login`}>
                  {t('login')}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button & Language Switcher */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
          </div>

          {/* Desktop Language Switcher */}
          <div className="hidden md:block ml-3">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex items-center gap-4 justify-center">
          <Link 
            href={`/${locale}/about`}
            className="text-white hover:text-[#FF6720] transition-colors text-sm"
          >
            {t('aboutUs')}
          </Link>
          <Link 
            href={`/${locale}/contact`}
            className="text-white hover:text-[#FF6720] transition-colors text-sm"
          >
            {t('contactUs')}
          </Link>
          <Link 
            href={`/${locale}/tracker`}
            className="text-white hover:text-[#FF6720] transition-colors text-sm"
          >
            {t('bookingTracker')}
          </Link>
          {isAuthenticated ? (
            <Link
              href={`/${locale}/profile`}
              aria-label="Profile"
              className="w-9 h-9 rounded-md bg-[#FF6720] hover:bg-[#FF6720]/90 text-white flex items-center justify-center"
            >
              <User2 className="w-5 h-5" />
            </Link>
          ) : (
            <Link 
              href={`/${locale}/login`}
              className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              {t('login')}
            </Link>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center px-4 md:px-8 py-12 md:py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-[#FF6720]">{t('headlinePart1')}</span>{' '}
              <br />
              {t('headlinePart2')}
              <br />
              {t('headlinePart3')}
            </h1>

            {/* Description */}
            <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed">
              {t('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-gray-900 border-0 hover:bg-gray-100 rounded-md h-14 px-8 font-semibold"
                asChild
              >
                <Link href={`/${locale}/fleet`}>
                  {t('fleetInfo')}
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-md h-14 px-8 font-semibold"
                asChild
              >
                <Link href={`/${locale}/vessels-schedule`}>
                  {t('vesselSchedule')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Social Media Icons */}
      <div className="relative z-10 px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <a 
            href="https://www.linkedin.com/company/bahri" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-md bg-[#FF6720] flex items-center justify-center hover:bg-[#FF6720]/90 transition-colors"
          >
            <Linkedin className="w-5 h-5 text-white" />
          </a>
          <a 
            href="https://twitter.com/bahri" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-md bg-[#FF6720] flex items-center justify-center hover:bg-[#FF6720]/90 transition-colors"
          >
            <Twitter className="w-5 h-5 text-white" />
          </a>
          <a 
            href="https://www.instagram.com/bahri" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-md bg-[#FF6720] flex items-center justify-center hover:bg-[#FF6720]/90 transition-colors"
          >
            <Instagram className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
