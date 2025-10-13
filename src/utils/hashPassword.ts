/**
 * Password Encryption Utility
 * 
 * Encrypts passwords using RSA-OAEP before sending to backend
 * Backend decrypts using private key, then verifies with PBKDF2
 */

import forge from 'node-forge';
import axios from 'axios';
import { env } from '@/config/env';

/**
 * Fetch RSA Public Key from backend API
 * This is more secure than storing it in environment variables
 */
export const fetchPublicKey = async (): Promise<string> => {
  try {
    const response = await axios.get<string>(`${env.apiUrl}/auth/pubkey`, {
      responseType: 'text',
    });
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching public key from server:', error);
    throw new Error('Failed to fetch encryption key from server');
  }
};

/**
 * Encrypt password using RSA-OAEP with public key from server
 * Returns base64 encoded encrypted password
 */
export const encryptPasswordWithKey = (password: string, publicKeyPem: string): string => {
  try {
    // Parse the PEM formatted public key
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    
    // Encrypt the password using RSA-OAEP
    const encryptedBytes = publicKey.encrypt(password, 'RSA-OAEP');
    
    // Encode to base64
    const encryptedBase64 = forge.util.encode64(encryptedBytes);
    
    return encryptedBase64;
  } catch (error) {
    console.error('❌ Error encrypting password:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid PEM')) {
        throw new Error('Invalid RSA Public Key format from server');
      }
    }
    
    throw new Error('Failed to encrypt password');
  }
};

/**
 * Complete encryption flow: fetch key + encrypt
 */
export const encryptPassword = async (password: string): Promise<string> => {
  const publicKeyPem = await fetchPublicKey();
  return encryptPasswordWithKey(password, publicKeyPem);
};

export default encryptPassword;

