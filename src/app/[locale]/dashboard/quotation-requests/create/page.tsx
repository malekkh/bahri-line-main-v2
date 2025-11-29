'use client';

/**
 * Create Quotation Request Page
 * Multi-step form for creating a new quotation request
 */

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter as useNextRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerticalStepper, VerticalStepperStep } from '@/components/ui/vertical-stepper';
import { ProfileHeader } from '@/components/layout/profile-header';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { RequestInformationStep, LinesInformationStep, SummaryStep } from '@/components/quotation';

type Mode = 'upload' | 'manual' | 'view';

const QUOTATION_STEPS: VerticalStepperStep[] = [
  { id: 'requestInfo', label: 'Rate Request', stepNumber: 1 },
  { id: 'linesInfo', label: 'Cargo Details', stepNumber: 2 },
  { id: 'summary', label: 'Quote', stepNumber: 3 },
];

export default function CreateQuotationRequestPage() {
  const router = useNextRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<Mode>('upload');

  // Form data state
  const [formData, setFormData] = useState({
    loadPort: '',
    dischargePort: '',
    cargoReadyDate: '',
    lines: [] as any[],
    charges: [] as any[],
  });

  const stepsWithState = QUOTATION_STEPS.map((step, index) => ({
    ...step,
    completed: index < currentStep,
    active: index === currentStep,
  }));

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === QUOTATION_STEPS.length - 1;

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    // TODO: Implement API submission
    console.log('Submitting quotation request:', formData);
    // After successful submission, redirect to quotation requests list
    router.push(`/${locale}/dashboard/quotation-requests`);
  };

  const handleBack = () => {
    router.push(`/${locale}/dashboard/quotation-requests`);
  };

  const handleViewLines = () => {
    // TODO: Open modal or navigate to view lines page
    console.log('View added lines');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <RequestInformationStep
            loadPort={formData.loadPort}
            dischargePort={formData.dischargePort}
            cargoReadyDate={formData.cargoReadyDate}
            onLoadPortChange={(value) => setFormData({ ...formData, loadPort: value })}
            onDischargePortChange={(value) => setFormData({ ...formData, dischargePort: value })}
            onCargoReadyDateChange={(value) => setFormData({ ...formData, cargoReadyDate: value })}
          />
        );
      case 1:
        return (
          <LinesInformationStep mode={mode} onModeChange={setMode} onViewLines={handleViewLines} />
        );
      case 2:
        return (
          <SummaryStep
            loadPort={formData.loadPort}
            dischargePort={formData.dischargePort}
            cargoReadyDate={formData.cargoReadyDate}
            lines={formData.lines}
            charges={formData.charges}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-6">
            {/* Left Sidebar - Stepper */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <VerticalStepper steps={stepsWithState} currentStep={currentStep} />
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-lg md:p-4">
              {/* Back Button and Title */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <h1 className="text-2xl font-bold text-[#003C71]">
                  {currentStep === 0 && 'Request New Quotation'}
                  {currentStep === 1 && 'Cargo Details'}
                  {currentStep === 2 && 'Quote'}
                </h1>
              </div>

              {/* Step Content */}
              <div className="mb-8">{renderCurrentStep()}</div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                {!isFirstStep ? (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                ) : (
                  <div />
                )}

                {isLastStep ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-[#003C71] hover:bg-[#003C71]/90 text-white"
                  >
                    Next : {QUOTATION_STEPS[currentStep + 1]?.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
