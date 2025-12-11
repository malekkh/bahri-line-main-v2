'use client';

/**
 * Vertical Stepper Component
 * Left sidebar stepper with ship background for multi-step forms
 */

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React from 'react';

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
  onStepSelect?: (index: number, step: VerticalStepperStep) => void;
}

export const VerticalStepper: React.FC<VerticalStepperProps> = ({
  steps,
  currentStep,
  className,
  onStepSelect,
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
          const isCompleted = step.completed ?? index < currentStep;
          const isActive = step.active ?? index === currentStep;
          const isFuture = !isActive && !isCompleted;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepSelect?.(index, step)}
              className="relative flex items-start gap-4 flex-1 text-left focus:outline-none group"
            >
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
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        isActive ? 'text-white' : 'text-gray-200'
                      )}
                    >
                      {step.stepNumber || index + 1}
                    </span>
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
                <span className="text-white text-[1rem] font-medium group-hover:underline">
                  {step.label}
                </span>
              </div>
            </button>
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

