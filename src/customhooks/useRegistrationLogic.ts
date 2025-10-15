/**
 * Registration Logic Hook
 * Handles multi-step registration form logic with React Query
 */

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { authRequests } from '@/services/requests/req';
import {
  invitationCodeSchema,
  contactDetailsSchema,
  parentAccountSchema,
  companyDetailsSchema,
  bankDetailsSchema,
  type InvitationCodeFormData,
  type ContactDetailsFormData,
  type ParentAccountFormData,
  type CompanyDetailsFormData,
  type BankDetailsFormData,
  type RegistrationFormData,
} from '@/schemas/auth.schema';

export interface UseRegistrationLogicReturn {
  // Form instances
  invitationCodeForm: UseFormReturn<InvitationCodeFormData>;
  contactDetailsForm: UseFormReturn<ContactDetailsFormData>;
  parentAccountForm: UseFormReturn<ParentAccountFormData>;
  companyDetailsForm: UseFormReturn<CompanyDetailsFormData>;
  bankDetailsForm: UseFormReturn<BankDetailsFormData>;
  
  // Step management
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  
  // API mutations
  validateInvitationMutation: any;
  updateContactMutation: any;
  registerMutation: any;
  
  // Loading states
  isInvitationValidating: boolean;
  isContactUpdating: boolean;
  isRegistering: boolean;
  
  // Actions
  handleInvitationValidation: (data: InvitationCodeFormData) => Promise<void>;
  handleContactUpdate: (data: ContactDetailsFormData) => Promise<void>;
  handleFinalRegistration: (data: RegistrationFormData) => Promise<void>;
}

export const useRegistrationLogic = (): UseRegistrationLogicReturn => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  const totalSteps = 5;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  // Form instances for each step
  const invitationCodeForm = useForm<InvitationCodeFormData>({
    resolver: zodResolver(invitationCodeSchema),
    mode: 'onChange',
  });

  const contactDetailsForm = useForm<ContactDetailsFormData>({
    resolver: zodResolver(contactDetailsSchema),
    mode: 'onChange',
  });

  const parentAccountForm = useForm<ParentAccountFormData>({
    resolver: zodResolver(parentAccountSchema),
    mode: 'onChange',
    defaultValues: {
      hasParentAccount: 'yes',
    },
  });

  const companyDetailsForm = useForm<CompanyDetailsFormData>({
    resolver: zodResolver(companyDetailsSchema),
    mode: 'onChange',
  });

  const bankDetailsForm = useForm<BankDetailsFormData>({
    resolver: zodResolver(bankDetailsSchema),
    mode: 'onChange',
  });

  // API Mutations
  const validateInvitationMutation = useMutation({
    mutationFn: (invitationCode: string) => authRequests.validateInvitation(invitationCode),
    onSuccess: (response) => {
      if (response.data.valid) {
        toast.success('Invitation code is valid!');
        nextStep();
      } else {
        toast.error(response.data.message || 'Invalid invitation code');
      }
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate invitation code';
      toast.error(errorMessage);
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: (contactData: ContactDetailsFormData) => authRequests.updateContact(contactData),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Contact information updated successfully!');
        nextStep();
      } else {
        toast.error(response.data.message || 'Failed to update contact information');
      }
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update contact information';
      toast.error(errorMessage);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (registrationData: RegistrationFormData) => {
      // First update contact, then register
      return authRequests.updateContact(registrationData.contactDetails).then(() => {
        return authRequests.register({
          name: `${registrationData.contactDetails.firstName} ${registrationData.contactDetails.lastName}`,
          email: registrationData.contactDetails.email,
          password: 'temp_password', // This should be generated or provided by user
        });
      });
    },
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Registration completed successfully!');
        router.push('/login');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      toast.error(errorMessage);
    },
  });

  // Step navigation
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Action handlers
  const handleInvitationValidation = async (data: InvitationCodeFormData) => {
    await validateInvitationMutation.mutateAsync(data.invitationCode);
  };

  const handleContactUpdate = async (data: ContactDetailsFormData) => {
    await updateContactMutation.mutateAsync(data);
  };

  const handleFinalRegistration = async (data: RegistrationFormData) => {
    await registerMutation.mutateAsync(data);
  };

  return {
    // Form instances
    invitationCodeForm,
    contactDetailsForm,
    parentAccountForm,
    companyDetailsForm,
    bankDetailsForm,
    
    // Step management
    currentStep,
    setCurrentStep,
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    
    // API mutations
    validateInvitationMutation,
    updateContactMutation,
    registerMutation,
    
    // Loading states
    isInvitationValidating: validateInvitationMutation.isPending,
    isContactUpdating: updateContactMutation.isPending,
    isRegistering: registerMutation.isPending,
    
    // Actions
    handleInvitationValidation,
    handleContactUpdate,
    handleFinalRegistration,
  };
};
