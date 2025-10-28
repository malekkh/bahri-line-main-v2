'use client';

/**
 * About Us Page
 * Company information and capabilities page
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { 
  Trophy, 
  Users, 
  Building2, 
  Ship,
  Shield,
  Droplet,
  Beaker,
  Package,
  Wheat,
  ShipWheel,
  Anchor,
  X
} from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('about');
  const params = useParams();
  const locale = params.locale as string;

  const statistics = [
    { icon: Trophy, value: t('years') },
    { icon: Users, value: t('employees') },
    { icon: Building2, value: t('fleetCapacity') },
    { icon: Ship, value: t('vessels') },
  ];

  const services = [
    { icon: Droplet, label: t('bahriOil') },
    { icon: Beaker, label: t('bahriChemicals') },
    { icon: Package, label: t('bahriIntegratedLogistics') },
    { icon: Wheat, label: t('bahriDryBulk') },
    { icon: ShipWheel, label: t('bahriShipMgmt') },
    { icon: Anchor, label: t('bahriMarine') },
  ];

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#F5F6F7] p-6">
        {/* Header */}
        <header className="relative z-10 w-full px-4 md:px-8 py-6 bg-[#1A3A5F] rounded-t-[20px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Logo variant="light" />

          {/* Navigation and Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href={`/${locale}/contact`}>
                Contact Us
              </Link>
            </Button>
            <Button
              className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white"
              asChild
            >
              <Link href={`/${locale}/login`}>
                Login
              </Link>
            </Button>
          </div>

         
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap items-center gap-4 justify-center">
          <Button
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:bg-white/10"
            asChild
          >
            <Link href={`/${locale}/contact`}>
              Contact Us
            </Link>
          </Button>
          <Button
            className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white"
            asChild
          >
            <Link href={`/${locale}/login`}>
              Login
            </Link>
          </Button>
        </nav>
      </header>

      {/* About Bahri Line Section */}
      <section className="relative bg-[#1A3A5F] py-12 md:py-16 rounded-b-[20px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className='max-[480px]:px-4'>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                About{' '}
                <span className="text-white">Bahri</span>{' '}
                <span className="text-[#FF6720]">{t('titleHighlight')}</span>
              </h1>
              
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 ">
                {t('description')}
              </p>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 gap-6">
                {statistics.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24 h-24 max-[480px]:w-16 max-[480px]:h-16 rounded-full bg-white border-4 max-[480px]:border-2 border-[#FF6720] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-12 h-12 max-[480px]:w-8 max-[480px]:h-8 text-[#FF6720]" />
                      </div>
                      <p className="text-white font-bold text-lg md:text-xl max-[480px]:text-sm">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Ship Image */}
            <div className="hidden md:block">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/shipabout.jpg"
                  alt="Bahri Line Ship"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Capabilities Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#1A3A5F]">{t('ourCapabilities').split(' ')[0]}</span>{' '}
              <span className="text-[#FF6720]">{t('ourCapabilities').split(' ')[1]}</span>
            </h2>
            <p className="text-[#1A3A5F] text-base md:text-lg">
              {t('capabilitiesDescription')}
            </p>
          </div>

          {/* Capability Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#1A3A5F] rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[#1A3A5F] font-bold text-xl mb-2">
                  {t('operationalFleet')}
                </h3>
                <p className="text-[#1A3A5F]/70 text-sm">
                  {t('operationalFleetDesc')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WorldWIDE Services Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#1A3A5F]">WorldWIDE</span>{' '}
              <span className="text-[#FF6720]">{t('worldwideServices').split(' ')[1]}</span>
            </h2>
            <p className="text-[#1A3A5F] text-base md:text-lg max-w-3xl">
              {t('servicesDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Services Grid */}
            <div className="grid grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-[#FF6720] rounded-full flex items-center justify-center mb-3">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-[#1A3A5F] font-medium text-xs md:text-sm">
                      {service.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* World Map */}
            <div className="hidden md:block">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="relative h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400 text-sm">World Map Visualization</p>
                  {/* Here you would add your world map component */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3A5F] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-gray-400 text-sm">
            {t('allRights')}
          </p>
        </div>
      </footer>
    </div>
  );
}

