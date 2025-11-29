'use client';

/**
 * Vertical Stepper Component
 * Left sidebar stepper with ship background for multi-step forms
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';

export interface VerticalStepperStep {
  id: string;
  label: string;
  stepNumber?: number;
  completed?: boolean;
  active?: boolean;
}

interface VerticalStepperProps {
  steps: VerticalStepperStep[];
  currentStep: number;
  className?: string;
}

export const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative bg-[#53565A] rounded-lg p-6 min-h-[600px] flex flex-col',
        className
      )}
    >
      {/* Steps */}
      <div className="flex flex-col justify-between h-full relative z-10 flex-1">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isFuture = index > currentStep;
          
          return (
            <div key={step.id} className="relative flex items-start gap-4 flex-1">
              {/* Connector Line - positioned between steps */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute left-4 w-0.5 transition-colors z-0',
                    isCompleted ? 'bg-white' : 'bg-gray-500'
                  )}
                  style={{
                    top: '32px',
                    bottom: '0',
                  }}
                />
              )}

              {/* Step Indicator */}
              <div className="flex-shrink-0 relative z-10">
                {isCompleted ? (
                  <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                ) : (
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full border-2 flex items-center justify-center',
                      {
                        'border-white bg-transparent': isActive,
                        'border-gray-400 bg-transparent': isFuture,
                      }
                    )}
                  >
                   
                  </div>
                )}
              </div>

              {/* Step Label */}
              <div className="flex flex-col">
                <span
                  className={cn('text-white text-sm font-small')}
                >
                  Step {step.stepNumber || index + 1} 
                </span>
                <span className="text-white text-[1rem] font-medium">{step.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ship Background Image */}
      <div className="absolute bottom-0 left-0 right-0 h-full rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/ship.webp')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-[#000000B2]" />
      </div>
    </div>
  );
};

