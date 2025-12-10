'use client';

/**
 * DocuSign Return Page
 * This page is loaded in an iframe after DocuSign signing is complete
 * Sends a message to the parent window to notify completion
 */

import { useEffect } from 'react';
import { Logo } from '@/components/ui/logo';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function DocuSignReturnPage() {
  useEffect(() => {
    // Send message to parent window that DocuSign signing is complete
    if (typeof window !== 'undefined' && window.parent) {
      window.parent.postMessage({ type: 'DOCUSIGN_SIGNED' }, '*');
    }
  }, []);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 bg-gray-50">
      {/* Background Image - Optional, can be removed if not needed */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/images/ship.webp"
          alt="Bahri Line Ship"
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo variant="dark" className='w-[150] h-[38]'/>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Thank You for Signing!
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Your document has been successfully signed. You may now close this window or continue browsing.
          </p>

          {/* Close Button */}
          <button
            onClick={() => {
              // Try to close the window if it was opened as a popup
              if (window.opener) {
                window.close();
              }
            }}
            className="px-6 py-2 bg-[#003C71] text-white rounded-md hover:bg-[#003C71]/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


