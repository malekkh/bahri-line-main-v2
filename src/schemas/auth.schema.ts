/**
 * Authentication Schemas
 * Zod validation schemas for authentication forms
 */

import { z } from 'zod';

/**
 * Login Schema
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register Schema
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

/**
 * Forgot Password Schema
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

/**
 * Reset Password Schema
 */
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

/**
 * Registration Step Schemas
 */

// Step 1: Invitation Code Validation
export const invitationCodeSchema = z.object({
  invitationCode: z
    .string()
    .min(1, 'Invitation code is required')
    .min(6, 'Invitation code must be at least 6 characters'),
});

export type InvitationCodeFormData = z.infer<typeof invitationCodeSchema>;

// Step 2: Contact Details
export const contactDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phoneCountryCode: z
    .string()
    .min(1, 'Phone country code is required'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  mobilePhoneCountryCode: z
    .string()
    .min(1, 'Mobile phone country code is required'),
  mobilePhone: z
    .string()
    .min(1, 'Mobile phone is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid mobile phone number'),
  faxCountryCode: z
    .string()
    .min(1, 'Fax country code is required'),
  address1_fax: z
    .string()
    .optional(),
  jobTitle: z
    .string()
    .min(1, 'Job title is required'),
  address1_city: z
    .string()
    .min(1, 'City is required'),
  street: z
    .string()
    .min(1, 'Street address is required'),
  state: z
    .string()
    .min(1, 'State/Province is required'),
  birthday: z
    .string()
    .min(1, 'Date of birth is required'),
  address1_country: z
    .string()
    .min(1, 'Country is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type ContactDetailsFormData = z.infer<typeof contactDetailsSchema>;

// Step 3: Parent Account
export const parentAccountSchema = z.object({
  hasParentAccount: z
    .boolean(),
  parentaccountname: z
    .string()
    .optional(),
  parentaccountid: z
    .string()
    .optional(),
  parentCrNumber: z
    .string()
    .optional(),
}).refine((data) => {
  // Only require CR number if hasParentAccount is explicitly true
  if (data.hasParentAccount === true) {
    return data.parentCrNumber && data.parentCrNumber.length > 0;
  }
  // If hasParentAccount is false or undefined, validation passes
  return true;
}, {
  message: "Parent CR number is required when parent account is selected",
  path: ['parentCrNumber'],
});

export type ParentAccountFormData = z.infer<typeof parentAccountSchema>;

// Step 4: Company Details
export const companyDetailsSchema = z.object({
  parentCompany: z
    .string()
    .optional(),
  "parentaccountid@odata.bind": z
    .string()
    .optional(),
  name: z
    .string()
    .min(1, 'Company name is required'),
 mobilephone: z
    .string()
    .min(1, 'Mobile phone number is required'),

  telephone1: z
    .string()
    .min(1, 'business phone number is required'),
  address1_country: z
    .string()
    .min(1, 'Company address country is required'),
  ntw_Country_odata_bind: z
    .string()
    .min(1, 'Country is required'),
  territoryid_odata_bind: z
    .string()
    .min(1, 'Business territory is required'),
  numberOfEmployees: z
    .string()
    .optional(),
  address1_line1: z
    .string()
    .min(1, 'Company street address is required'),
  address1_postalcode: z
    .string()
    .min(1, 'Postal/ZIP code is required'),
  address1_stateorprovince: z
    .string()
    .min(1, 'State/Province is required'),
  address1_city: z
    .string()
    .min(1, 'City is required'),
  address1_fax: z
    .string()
    .optional(),
  websiteurl: z
    .string()
    .min(1, 'Company website URL is required')
    .url('Please enter a valid URL'),
  businesstypecode: z
    .string()
    .min(1, 'Business type code is required'),
  ntw_crnumber: z
    .string()
    .min(1, 'Company CR number is required'),
  ntw_vatnumber: z
    .string()
    .min(1, 'VAT number is required'),
  
  
  crAttachment: z
    .any()
    .optional(),
  vatAttachment: z
    .any()
    .optional(),
});

export type CompanyDetailsFormData = z.infer<typeof companyDetailsSchema>;

// Step 5: Bank Details
export const bankDetailsSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Bank name is required'),
  beneficiaryName: z
    .string()
    .min(1, 'Account beneficiary name is required'),
  accountNumber: z
    .string()
    .min(1, 'Bank account number is required'),
  w_typeofbankaccount: z
    .string()
    .min(1, 'Account type is required'),
  bankCountry: z
    .string()
    .min(1, 'Bank country is required'),
  bankCity: z
    .string()
    .min(1, 'Bank city is required'),
  bankState: z
    .string()
    .min(1, 'Bank state/province is required'),
  bankAddress: z
    .string()
    .min(1, 'Bank address is required'),
  bankPhoneCountryCode: z
    .string()
    .min(1, 'Bank phone country code is required'),
  bankPhoneNumber: z
    .string()
    .min(1, 'Bank phone number is required'),
  bankZipCode: z
    .string()
    .min(1, 'Bank postal code is required'),
  ntw_swift: z
    .string()
    .min(1, 'SWIFT code is required'),
  ntw_ibannocurrency: z
    .string()
    .min(1, 'IBAN with currency is required')
    .regex(
      /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/,
      'Please enter a valid IBAN format'
    ),
});

export type BankDetailsFormData = z.infer<typeof bankDetailsSchema>;

// Combined registration schema
export const registrationSchema = z.object({
  invitationCode: invitationCodeSchema.shape.invitationCode,
  contactDetails: contactDetailsSchema,
  parentAccount: parentAccountSchema,
  companyDetails: companyDetailsSchema,
  bankDetails: bankDetailsSchema,
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

