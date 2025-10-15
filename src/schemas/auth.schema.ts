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
  jobTitle: z
    .string()
    .min(1, 'Job title is required'),
  businessPhone: z
    .string()
    .min(1, 'Business phone is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  mobilePhone: z
    .string()
    .min(1, 'Mobile phone is required')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  fax: z
    .string()
    .optional(),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  birthday: z
    .string()
    .optional(),
  city: z
    .string()
    .min(1, 'City is required'),
  street: z
    .string()
    .min(1, 'Street is required'),
  country: z
    .string()
    .min(1, 'Country is required'),
  stateProvince: z
    .string()
    .min(1, 'State/Province is required'),
});

export type ContactDetailsFormData = z.infer<typeof contactDetailsSchema>;

// Step 3: Parent Account
export const parentAccountSchema = z.object({
  hasParentAccount: z
    .enum(['yes', 'no']),
  parentAccountName: z
    .string()
    .optional(),
  parentCRNumber: z
    .string()
    .optional(),
}).refine((data) => {
  if (data.hasParentAccount === 'yes') {
    return data.parentAccountName && data.parentAccountName.length > 0;
  }
  return true;
}, {
  message: "Parent account name is required when 'Yes' is selected",
  path: ['parentAccountName'],
}).refine((data) => {
  if (data.hasParentAccount === 'yes') {
    return data.parentCRNumber && data.parentCRNumber.length > 0;
  }
  return true;
}, {
  message: "Parent CR number is required when 'Yes' is selected",
  path: ['parentCRNumber'],
});

export type ParentAccountFormData = z.infer<typeof parentAccountSchema>;

// Step 4: Company Details
export const companyDetailsSchema = z.object({
  parentCompany: z
    .string()
    .optional(),
  crNumber: z
    .string()
    .min(1, 'CR Number is required'),
  businessType: z
    .string()
    .min(1, 'Business type is required'),
  companyName: z
    .string()
    .min(1, 'Company name is required'),
  vatNumber: z
    .string()
    .min(1, 'VAT Number is required'),
  numberOfEmployees: z
    .string()
    .optional(),
  phone: z
    .string()
    .min(1, 'Phone is required'),
  territory: z
    .string()
    .min(1, 'Territory is required'),
});

export type CompanyDetailsFormData = z.infer<typeof companyDetailsSchema>;

// Step 5: Bank Details
export const bankDetailsSchema = z.object({
  bankName: z
    .string()
    .min(1, 'Bank name is required'),
  accountType: z
    .string()
    .min(1, 'Account type is required'),
  accountNumber: z
    .string()
    .min(1, 'Account number is required'),
  beneficiaryName: z
    .string()
    .min(1, 'Beneficiary name is required'),
  bankAddress: z
    .string()
    .min(1, 'Bank address is required'),
  bankPhone: z
    .string()
    .min(1, 'Bank phone is required'),
  bankCity: z
    .string()
    .min(1, 'Bank city is required'),
  bankState: z
    .string()
    .min(1, 'Bank state is required'),
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

