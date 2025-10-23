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
import type { PrefilledContactData, ValidateInvitationResponse, CheckCRResponse, AuthApiTypes } from '@/services/api/axiosRoutes.type';
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
  validateCurrentStep: () => Promise<boolean>;
  isCurrentStepValid: boolean;
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
      hasParentAccount: false,
    },
  });

  const companyDetailsForm = useForm<CompanyDetailsFormData>({
    resolver: zodResolver(companyDetailsSchema),
    mode: 'onChange',
    defaultValues: {
      parentCompany: "",
      "parentaccountid@odata.bind": "",
      name: "",
      mobilephone: "",
      telephone1: "",
      address1_country: "",
      ntw_Country_odata_bind: "",
      territoryid_odata_bind: "",
      numberOfEmployees: "",
      address1_line1: "",
      address1_postalcode: "",
      address1_fax: "",
      websiteurl: "",
      businesstypecode: "",
      ntw_crnumber: "",
      ntw_vatnumber: "",
      address1_city: "",
      address1_stateorprovince: "",
    }
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
    mutationFn: (data: AuthApiTypes['updateContact']['body']) => 
      authRequests.updateContact(data),
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
      if (!data.value || data.value.length === 0) {
        toast.error('No company found with this CR number');
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
      
      // Map contact details to API field names
      const mappedContactDetails = {
        firstname: registrationData.contactDetails.firstName,
        lastname: registrationData.contactDetails.lastName,
        jobtitle: registrationData.contactDetails.jobTitle,
        emailaddress1: registrationData.contactDetails.email,
        telephone1: registrationData.contactDetails.phone,
        mobilephone: registrationData.contactDetails.mobilePhone,
        fax: registrationData.contactDetails.address1_fax,
        address1_city: registrationData.contactDetails.address1_city,
        address1_stateorprovince: registrationData.contactDetails.state,
        address1_country: registrationData.contactDetails.address1_country,
        ntw_portalnewpassword: registrationData.contactDetails.password,
      };
      
      // Map company details field names back to API format
      const { ntw_Country_odata_bind, territoryid_odata_bind, ...restCompanyDetails } = registrationData.companyDetails;
      const mappedCompanyDetails = {
        ...restCompanyDetails,
        "ntw_Country@odata.bind": ntw_Country_odata_bind,
        "territoryid@odata.bind": territoryid_odata_bind,
      };
      
      const mappedRegistrationData = {
        ...registrationData,
        companyDetails: mappedCompanyDetails,
      } as unknown as RegistrationFormData;
      
      // First update contact, then register
      return authRequests.updateContact({
        contactId: prefilledContactData.contactid,
        contactDetails: mappedContactDetails,
      }).then(() => {
        return authRequests.register(mappedRegistrationData);
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
    
    // Map form fields to API field names
    const mappedContactDetails = {
      firstname: data.firstName,
      lastname: data.lastName,
      jobtitle: data.jobTitle,
      emailaddress1: data.email,
      telephone1: data.phone,
      mobilephone: data.mobilePhone,
      fax: data.address1_fax,
      address1_city: data.address1_city,
      address1_stateorprovince: data.state,
      address1_country: data.address1_country,
      ntw_portalnewpassword: data.password,
      birthdate: data.birthday,
    };
    
    await updateContactMutation.mutateAsync({
      contactDetails: mappedContactDetails,
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
      phoneCountryCode: '+966', // Default to Saudi Arabia
      phone: data.telephone1,
      mobilePhoneCountryCode: '+966', // Default to Saudi Arabia
      faxCountryCode: '+966', // Default to Saudi Arabia
      jobTitle: data.jobTitle,
      address1_fax: data.address1_fax,
      address1_city: data.address1_city,
      street: data.address1_line1,
      state: data.address1_stateorprovince,
      birthday: data.birthdate,
      address1_country: data.address1_country,
      password: '',
      confirmPassword: '',
    });
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    switch (currentStep) {
      case 0: // Invitation Code
        const invitationValid = await invitationCodeForm.trigger();
        if (!invitationValid) {
          toast.error('Please enter a valid invitation code');
          return false;
        }
        return true;

      case 1: // Contact Details
        const contactValid = await contactDetailsForm.trigger();
        if (!contactValid) {
          toast.error('Please fill in all required contact details');
          return false;
        }
        return true;

      case 2: // Parent Account
        const parentValid = await parentAccountForm.trigger();
        if (!parentValid) {
          toast.error('Please complete the parent account selection');
          return false;
        }
        // Additional check: if hasParentAccount is true, ensure CR number is provided
        const parentData = parentAccountForm.getValues();
        if (parentData.hasParentAccount === true && (!parentData.parentCrNumber || parentData.parentCrNumber.length === 0)) {
          toast.error('Parent CR number is required when parent account is selected');
          return false;
        }
        return true;

      case 3: // Company Details
        const companyValid = await companyDetailsForm.trigger();
        if (!companyValid) {
          // Debug: Log validation errors
          const errors = companyDetailsForm.formState.errors;
          console.log('Company Details Validation Errors:', errors);
          
          // Log which fields are invalid
          Object.keys(errors).forEach(fieldName => {
            console.log(`❌ ${fieldName}:`, errors[fieldName as keyof typeof errors]?.message);
          });
          
          toast.error('Please fill in all required company details');
          return false;
        }
        return true;

      case 4: // Bank Details
        const bankValid = await bankDetailsForm.trigger();
        if (!bankValid) {
          toast.error('Please fill in all required bank details');
          return false;
        }
        return true;

      default:
        return false;
    }
  };

  // Check if current step is valid
  const isCurrentStepValid = (() => {
    switch (currentStep) {
      case 0:
        return invitationCodeForm.formState.isValid || false;
      case 1:
        return contactDetailsForm.formState.isValid || false;
      case 2:
        // For parent account step, check if hasParentAccount is selected
        const parentData = parentAccountForm.getValues();
        if (parentData.hasParentAccount === true) {
          // If yes, require CR number
          return (parentAccountForm.formState.isValid && parentData.parentCrNumber && parentData.parentCrNumber.length > 0) || false;
        } else {
          // If no, form is valid
          return true;
        }
      case 3:
        return companyDetailsForm.formState.isValid || false;
      case 4:
        return bankDetailsForm.formState.isValid || false;
      default:
        return false;
    }
  })();

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
    validateCurrentStep,
    isCurrentStepValid,
  };
};
