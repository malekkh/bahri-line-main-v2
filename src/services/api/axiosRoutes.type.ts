/**
 * API Routes TypeScript Types
 * Type definitions for API endpoints
 */

import { User, CreateUserDto, UpdateUserDto, UsersResponse } from '@/types/user.types';
import { ContactDetailsFormData } from '@/schemas/auth.schema';

// Users API Types
export interface GetUsersParams {
  page?: number;
  limit?: number;
}

export interface SearchUsersParams {
  q: string;
}

export interface UsersApiTypes {
  getAll: {
    params: GetUsersParams;
    response: UsersResponse;
  };
  getById: {
    params: { id: number };
    response: User;
  };
  create: {
    body: CreateUserDto;
    response: User;
  };
  update: {
    params: { id: number };
    body: UpdateUserDto;
    response: User;
  };
  patch: {
    params: { id: number };
    body: Partial<UpdateUserDto>;
    response: User;
  };
  delete: {
    params: { id: number };
    response: void;
  };
  search: {
    params: SearchUsersParams;
    response: User[];
  };
  getCurrentUser: {
    response: User;
  };
}

// Auth API Types
export interface AuthApiTypes {
  login: {
    body: { email: string; encryptedPassword: string };
    response: { success: boolean; message: string };
  };
  register: {
    body: { name: string; email: string; password: string };
    response: { success: boolean; message: string };
  };
  logout: {
    response: { success: boolean; message: string };
  };
  refreshToken: {
    response: { token: string };
  };
  forgotPassword: {
    body: { email: string };
    response: { success: boolean; message: string };
  };
  resetPassword: {
    body: { token: string; password: string };
    response: { success: boolean; message: string };
  };
  getCurrentUser: {
    response: User;
  };
  validateInvitation: {
    params: { code: string };
    response: { valid: boolean; message: string };
  };
  updateContact: {
    body: ContactDetailsFormData;
    response: { success: boolean; message: string };
  };
}

