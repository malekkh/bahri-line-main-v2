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
import type { PrefilledContactData, ValidateInvitationResponse, CheckCRResponse } from '@/services/api/axiosRoutes.type';
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
  checkCRMutation: any;
  
  // Loading states
  isInvitationValidating: boolean;
  isContactUpdating: boolean;
  isRegistering: boolean;
  isCRValidating: boolean;
  
  // Data state
  prefilledContactData: PrefilledContactData | null;
  invitationResponse: ValidateInvitationResponse | null;
  
  // Actions
  handleInvitationValidation: (data: InvitationCodeFormData) => Promise<void>;
  handleContactUpdate: (data: ContactDetailsFormData) => Promise<void>;
  handleFinalRegistration: (data: RegistrationFormData) => Promise<void>;
  handleCRValidation: (crNumber: string) => Promise<CheckCRResponse>;
  populateContactForm: (data: PrefilledContactData) => void;
}

export const useRegistrationLogic = (): UseRegistrationLogicReturn => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [prefilledContactData, setPrefilledContactData] = useState<PrefilledContactData | null>(null);
  const [invitationResponse, setInvitationResponse] = useState<ValidateInvitationResponse | null>(null);
  
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
      const data: ValidateInvitationResponse = response.data;
      
      if (!data.success) {
        toast.error(data.message || 'Invalid invitation code');
        return;
      }
      
      // Check status codes for redeemed/expired invitations
      // You may need to adjust these status codes based on your backend implementation
      if (data.invitationStatusCode === 876490004) { // Assuming this is "redeemed" status
        toast.error('This invitation has already been used');
        return;
      }
      
      if (data.invitationStatusCode === 876490003) { // Assuming this is "expired" status
        toast.error('This invitation has expired');
        return;
      }
      
      // Store prefilled data and invitation response
      setPrefilledContactData(data.contact);
      setInvitationResponse(data);
      
      // Populate contact form with prefilled data
      populateContactForm(data.contact);
      
      toast.success(data.message || 'Invitation code is valid!');
      nextStep();
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate invitation code';
      toast.error(errorMessage);
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: (data: { contactDetails: ContactDetailsFormData; contactId: string }) => 
      authRequests.updateContact({
        contactId: data.contactId,
        contactDetails: data.contactDetails,
      }),
    onSuccess: (response) => {
      if (response.data.success) {
        toast.success('Contact information updated successfully!');
        nextStep();
      } else {
        toast.error('Failed to update contact information');
      }
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update contact information';
      toast.error(errorMessage);
    },
  });

  const checkCRMutation = useMutation({
    mutationFn: (crNumber: string) => authRequests.checkCR(crNumber),
    onSuccess: (response) => {
      const data: CheckCRResponse = response.data;
      if (!data.valid) {
        toast.error(data.message || 'Invalid CR number');
      }
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to validate CR number';
      toast.error(errorMessage);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (registrationData: RegistrationFormData) => {
      if (!prefilledContactData?.contactid) {
        throw new Error('Contact ID not found. Please restart the registration process.');
      }
      
      // First update contact, then register
      return authRequests.updateContact({
        contactId: prefilledContactData.contactid,
        contactDetails: registrationData.contactDetails,
      }).then(() => {
        return authRequests.register(registrationData);
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
    if (!prefilledContactData?.contactid) {
      toast.error('Contact ID not found. Please restart the registration process.');
      return;
    }
    
    await updateContactMutation.mutateAsync({
        contactDetails: data,
      contactId: prefilledContactData.contactid,
    });
  };

  const handleFinalRegistration = async (data: RegistrationFormData) => {
    await registerMutation.mutateAsync(data);
  };

  const handleCRValidation = async (crNumber: string): Promise<CheckCRResponse> => {
    const response = await checkCRMutation.mutateAsync(crNumber);
    return response.data;
  };

  const populateContactForm = (data: PrefilledContactData) => {
    contactDetailsForm.reset({
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.emailaddress1,
      mobilePhone: data.mobilephone,
      businessPhone: data.telephone1,
      street: data.address1_line1,
      city: data.address1_city,
      country: data.address1_country,
      stateProvince: data.address1_stateorprovince,
      jobTitle: data.jobtitle,
      birthday: data.birthdate,
    });
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
    checkCRMutation,
    
    // Loading states
    isInvitationValidating: validateInvitationMutation.isPending,
    isContactUpdating: updateContactMutation.isPending,
    isRegistering: registerMutation.isPending,
    isCRValidating: checkCRMutation.isPending,
    
    // Data state
    prefilledContactData,
    invitationResponse,
    
    // Actions
    handleInvitationValidation,
    handleContactUpdate,
    handleFinalRegistration,
    handleCRValidation,
    populateContactForm,
  };
};
