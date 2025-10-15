import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface StepperStep {
  id: string;
  label: string;
  completed?: boolean;
  active?: boolean;
}

interface StepperProps {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ 
  steps, 
  currentStep, 
  className 
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-start justify-center gap-0 relative flex-row">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              'flex flex-col items-center gap-2 relative flex-1',
              // Connector pseudo-element - only for non-last steps
              index < steps.length - 1 && [
                "after:content-['']",
                "after:absolute",
                // LTR: connector goes from right edge of current square to left edge of next
                "after:left-[calc(50%+9px)]",
                "after:right-[calc(-50%+9px)]",
                // RTL: connector goes from left edge of current square to right edge of next
                "rtl:after:left-[calc(-50%+9px)]",
                "rtl:after:right-[calc(50%+9px)]",
                "after:top-[9px]", // Vertically centered (half of 18px)
                "after:h-px", // 1px height
                "after:transition-all",
                "after:duration-300",
                "after:ease-in-out",
                "after:z-[1]",
                // Connector color logic
                step.completed ? "after:bg-white" : "after:bg-gray-400"
              ]
            )}
          >
            {/* Step Indicator */}
            <div className="w-[18px] h-[18px] flex items-center justify-center transition-all duration-300 relative z-[2]">
              {step.completed ? (
                // Completed step - green background with checkmark
                <div className="w-full h-full flex items-center justify-center bg-[#36B29D] border-none rounded-[3px]">
                  <Check className="w-3 h-3 text-white" />
                </div>
              ) : (
                // Empty square with border
                <div
                  className={cn(
                    'w-full h-full border-2 bg-transparent rounded-[3px]',
                    {
                      // Current step - white border
                      'border-white': step.active,
                      // Future steps - gray border
                      'border-gray-400': !step.active,
                    }
                  )}
                />
              )}
            </div>
            
            {/* Step Content */}
            <div className="flex flex-col items-center gap-1">
              {/* Step Label */}
              <span
                className={cn(
                  'text-gray-400 text-xs font-medium text-center whitespace-nowrap transition-all duration-300',
                  {
                    // Current step - white text, bold
                    'text-white font-semibold': step.active,
                    // Completed step - keep gray
                    'text-gray-400 font-medium': step.completed,
                  }
                )}
              >
                {step.label}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
