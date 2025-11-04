'use client';

/**
 * Profile Page
 * User profile page with company details, contact details, and bank details tabs
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useContactDetailsLogic } from '@/customhooks/useContactDetailsLogic';
import { ProfileHeader } from '@/components/layout/profile-header';
import { ProfileBanner } from '@/components/layout/profile-banner';
import { Tabs, Tab } from '@/components/ui/tabs';
import { ReadonlyField } from '@/components/ui/readonly-field';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const [activeTab, setActiveTab] = useState('company');
  const { contactDetails, isLoading, error } = useContactDetailsLogic();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProfileHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-gray-600">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (error || !contactDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProfileHeader />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">{t('error')}: {error?.message || 'Failed to load profile'}</div>
        </div>
      </div>
    );
  }

  const { contact, account } = contactDetails;
  const fullName = `${contact.firstName} ${contact.lastName}`;

  // Company Details Tab Content
  const companyDetailsContent = (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-[#003C71] mb-6">{t('tabs.companyDetails.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReadonlyField label={t('fields.parentAccount')} value={account?.parentAccount || ''} />
        <ReadonlyField label={t('fields.companyName')} value={account?.name || ''} />
        <ReadonlyField label={t('fields.crNumber')} value={account?.crNumber || ''} />
        <ReadonlyField label={t('fields.vatNumber')} value={account?.taxRegistrationNo || ''} />
        <ReadonlyField label={t('fields.businessType')} value={account?.businessTypeLabel || ''} />
        <ReadonlyField label={t('fields.numberOfEmployees')} value={account?.allowCreditApps ? '11-50' : ''} />
        <ReadonlyField label={t('fields.territory')} value={account?.territory || ''} />
        <ReadonlyField label={t('fields.phone')} value={account?.phone || ''} />
        <ReadonlyField label={t('fields.website')} value={account?.websiteUrl || ''} />
        <ReadonlyField label={t('fields.country')} value={account?.country || ''} />
        <ReadonlyField label={t('fields.zipCode')} value={account?.zipCode || ''} />
        <ReadonlyField label={t('fields.street')} value={account?.street || ''} />
        <ReadonlyField label={t('fields.state')} value={account?.state || ''} />
        <ReadonlyField label={t('fields.city')} value={account?.city || contact.city || ''} />
      </div>
    </div>
  );

  // Contact Details Tab Content
  const contactDetailsContent = (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-[#003C71] mb-6">{t('tabs.contactDetails.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReadonlyField label={t('fields.fullName')} value={fullName} />
        <ReadonlyField label={t('fields.jobTitle')} value={contact.jobTitle || ''} />
        <ReadonlyField label={t('fields.street')} value={contact.street || ''} />
        <ReadonlyField label={t('fields.city')} value={contact.city || ''} />
        <ReadonlyField label={t('fields.country')} value={contact.country || ''} />
        <ReadonlyField label={t('fields.state')} value={contact.state || ''} />
        <ReadonlyField label={t('fields.zipCode')} value={contact.zipCode || ''} />
        <ReadonlyField label={t('fields.fax')} value={contact.whatsAppNumber || ''} />
      </div>
    </div>
  );

  // Bank Details Tab Content
  const bankDetailsContent = (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-[#003C71] mb-6">{t('tabs.bankDetails.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReadonlyField label={t('fields.bankName')} value={account?.bahriBankName || ''} />
        <ReadonlyField label={t('fields.beneficiaryName')} value={account?.bahriBeneficiaryName || ''} />
        <ReadonlyField label={t('fields.accountNumber')} value={account?.bahriIBAN || ''} />
        <ReadonlyField label={t('fields.bankCity')} value={account?.bankCity || ''} />
        <ReadonlyField label={t('fields.bankState')} value={account?.bankStateProvince || ''} />
        <ReadonlyField label={t('fields.bankAddress')} value={account?.bankStreet || ''} />
        <ReadonlyField label={t('fields.postalCode')} value={account?.bankZipPostalCode || ''} />
        <ReadonlyField label={t('fields.swiftCode')} value={account?.bahriSWIFT || ''} />
      </div>
    </div>
  );

  const tabs: Tab[] = [
    {
      id: 'company',
      label: t('tabs.companyDetails.label'),
      content: companyDetailsContent,
    },
    {
      id: 'contact',
      label: t('tabs.contactDetails.label'),
      content: contactDetailsContent,
    },
    {
      id: 'bank',
      label: t('tabs.bankDetails.label'),
      content: bankDetailsContent,
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <ProfileHeader userImage={contact.imageBase64} />
        
        <ProfileBanner
          userImage={contact.imageBase64}
          firstName={contact.firstName}
          lastName={contact.lastName}
          companyName={account?.name}
        />

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </ProtectedRoute>
  );
}

