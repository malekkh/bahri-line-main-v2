'use client';

/**
 * Registration Page
 * Multi-step account creation form with stepper
 * Designed to match the Figma design with ship background
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Stepper, StepperStep } from '@/components/ui/stepper';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

// Import step components
import {
  InvitationCodeStep,
  ContactDetailsStep,
  ParentAccountStep,
  CompanyDetailsStep,
  BankDetailsStep,
} from '@/components/registration';

const REGISTRATION_STEPS: StepperStep[] = [
  { id: 'invitationCode', label: 'Invitation code' },
  { id: 'contactDetails', label: 'Contact Details' },
  { id: 'parentAccount', label: 'Parent Account' },
  { id: 'companyDetails', label: 'Company Details' },
  { id: 'bankDetails', label: 'Bank Details' },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const t = useTranslations('registration');

  // Calculate step states with translations
  const stepsWithState = REGISTRATION_STEPS.map((step, index) => ({
    ...step,
    label: t(`steps.${step.id}` as any),
    completed: index < currentStep,
    active: index === currentStep,
  }));

  const handleNext = () => {
    if (currentStep < REGISTRATION_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    // Handle close action
    window.history.back();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <InvitationCodeStep onNext={handleNext} />;
      case 1:
        return (
          <ContactDetailsStep 
            onNext={handleNext} 
            onPrevious={handlePrevious}
          />
        );
      case 2:
        return (
          <ParentAccountStep 
            onNext={handleNext} 
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <CompanyDetailsStep 
            onNext={handleNext} 
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <BankDetailsStep 
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background Image - Same as login */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ship.webp"
          alt="Bahri Line Ship"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#00000080]" />
      </div>

      {/* Language Switcher - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageSwitcher />
      </div>

      {/* Registration Modal */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-[#D4D4D41A] backdrop-blur-lg rounded-lg border border-white/20 p-8 relative min-h-[600px]">
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 left-4 text-white hover:text-white/80 transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Logo variant="light" className="w-[150px] h-[38px]" />
          </div>

          {/* Title and Subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-sm text-white">
              {t('subtitle')}
            </p>
          </div>

          {/* Stepper Progress Only */}
          <div className="mb-8">
            <Stepper 
              steps={stepsWithState} 
              currentStep={currentStep}
              className="px-4"
            />
          </div>

          {/* Step Content */}
          <div className="flex-1 mb-8">
            {renderCurrentStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {/* Previous Button */}
            {currentStep > 0 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="bg-transparent border-[#FF6720] text-white hover:bg-[#FF6720]/10"
              >
                {t('buttons.previous')}: {stepsWithState[currentStep - 1]?.label}
              </Button>
            )}

            {/* Spacer for first step */}
            {currentStep === 0 && <div />}

            {/* Next/Complete Button */}
            {currentStep === REGISTRATION_STEPS.length - 1 ? (
              <Button
                onClick={() => console.log('Registration completed')}
                className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold"
              >
                {t('buttons.complete')}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white font-semibold"
              >
                {t('buttons.next')}: {stepsWithState[currentStep + 1]?.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
