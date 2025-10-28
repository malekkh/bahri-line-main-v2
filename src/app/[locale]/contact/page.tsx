'use client';

/**
 * Contact Us Page
 * Contact form for lead generation
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/ui/logo';
import { PhoneInputComponent } from '@/components/ui/phone-input';
import { 
  Phone, 
  Mail, 
  MapPin,
  ArrowLeft,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { createLead, LeadPayload } from '@/services/createLead';

export default function ContactPage() {
  const t = useTranslations('contact');
  const params = useParams();
  const locale = params.locale as string;

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    emailaddress1: '',
    telephone1: '',
    mobilephone: '',
    birthdate: '',
    companyname: '',
    websiteurl: '',
    address1_line1: '',
    address1_city: '',
    address1_country: '',
    jobtitle: '',
    subject: '',
    description: '',
    leadsourcecode: 1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: LeadPayload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        emailaddress1: formData.emailaddress1,
        telephone1: formData.telephone1,
        mobilephone: formData.mobilephone,
        companyname: formData.companyname,
        websiteurl: formData.websiteurl,
        address1_city: formData.address1_city,
        address1_country: formData.address1_country,
        jobtitle: formData.jobtitle,
        subject: formData.subject,
        description: formData.description,
        leadsourcecode: formData.leadsourcecode
      };

      await createLead(payload);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const topicOptions = [
    { value: 'General Inquiry', key: 'generalInquiry' },
    { value: 'Sales Question', key: 'salesQuestion' },
    { value: 'Technical Support', key: 'technicalSupport' },
    { value: 'Partnership', key: 'partnership' },
    { value: 'Media Inquiry', key: 'mediaInquiry' },
    { value: 'Other', key: 'other' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo variant="default" />

            {/* Contact Info */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#FF6720]" />
                <span className="text-[#1A3A5F] font-medium">(917) 855-2384</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#FF6720]" />
                <span className="text-[#1A3A5F] font-medium">sales@thenrcgroup.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FF6720]" />
                <span className="text-[#1A3A5F] font-medium">10 Averill Drive, Mahopac, NY 10541</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Get in Touch Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ArrowLeft className="w-6 h-6 text-[#1A3A5F]" />
              <h1 className="text-3xl font-bold text-[#1A3A5F]">{t('getInTouch')}</h1>
            </div>
            <p className="text-gray-600 text-lg">
              {t('description')}
            </p>
          </div>

          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1A3A5F] mb-2">{t('thankYou')}</h2>
              <p className="text-gray-600 mb-6">{t('successMessage')}</p>
              <Button
                onClick={() => {
                  setSubmitSuccess(false);
                  setFormData({
                    firstname: '',
                    lastname: '',
                    emailaddress1: '',
                    telephone1: '',
                    mobilephone: '',
                    birthdate: '',
                    companyname: '',
                    websiteurl: '',
                    address1_line1: '',
                    address1_city: '',
                    address1_country: '',
                    jobtitle: '',
                    subject: '',
                    description: '',
                    leadsourcecode: 1
                  });
                }}
                className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white"
              >
{t('sendAnother')}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Details Section */}
              <div>
                <h2 className="text-xl font-bold text-[#1A3A5F] mb-6">{t('contactDetails')}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstname" className="text-[#1A3A5F] font-medium">
                      {t('firstName')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstname"
                      type="text"
                      placeholder={t('firstName')}
                      value={formData.firstname}
                      onChange={(e) => handleInputChange('firstname', e.target.value)}
                      required
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastname" className="text-[#1A3A5F] font-medium">
                      {t('lastName')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="lastname"
                      type="text"
                      placeholder={t('lastName')}
                      value={formData.lastname}
                      onChange={(e) => handleInputChange('lastname', e.target.value)}
                      required
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailaddress1" className="text-[#1A3A5F] font-medium">
                      {t('email')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="emailaddress1"
                      type="email"
                      placeholder={t('email')}
                      value={formData.emailaddress1}
                      onChange={(e) => handleInputChange('emailaddress1', e.target.value)}
                      required
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telephone1" className="text-[#1A3A5F] font-medium">
                      {t('businessPhone')} <span className="text-red-500">*</span>
                    </Label>
                    <PhoneInputComponent
                      value={formData.telephone1}
                      onChange={(value) => handleInputChange('telephone1', value || '')}
                      placeholder={t('businessPhone')}
                      className="phone-input-contact mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mobilephone" className="text-[#1A3A5F] font-medium">
                      {t('mobilePhone')}
                    </Label>
                    <PhoneInputComponent
                      value={formData.mobilephone}
                      onChange={(value) => handleInputChange('mobilephone', value || '')}
                      placeholder={t('mobilePhone')}
                      className="phone-input-contact mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthdate" className="text-[#1A3A5F] font-medium">
                      {t('birthdate')}
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="birthdate"
                        type="date"
                        value={formData.birthdate}
                        onChange={(e) => handleInputChange('birthdate', e.target.value)}
                        onClick={(e) => e.currentTarget.showPicker?.()}
                        className="pr-10 bg-white text-black cursor-pointer"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details Section */}
              <div>
                <h2 className="text-xl font-bold text-[#1A3A5F] mb-6">{t('companyDetails')}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyname" className="text-[#1A3A5F] font-medium">
                      {t('companyName')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyname"
                      type="text"
                      placeholder={t('companyName')}
                      value={formData.companyname}
                      onChange={(e) => handleInputChange('companyname', e.target.value)}
                      required
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="websiteurl" className="text-[#1A3A5F] font-medium">
                      {t('website')}
                    </Label>
                    <Input
                      id="websiteurl"
                      type="url"
                      placeholder={t('website')}
                      value={formData.websiteurl}
                      onChange={(e) => handleInputChange('websiteurl', e.target.value)}
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address1_line1" className="text-[#1A3A5F] font-medium">
                      {t('address')}
                    </Label>
                    <Input
                      id="address1_line1"
                      type="text"
                      placeholder={t('address')}
                      value={formData.address1_line1}
                      onChange={(e) => handleInputChange('address1_line1', e.target.value)}
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address1_city" className="text-[#1A3A5F] font-medium">
                      {t('city')}
                    </Label>
                    <Input
                      id="address1_city"
                      type="text"
                      placeholder={t('city')}
                      value={formData.address1_city}
                      onChange={(e) => handleInputChange('address1_city', e.target.value)}
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address1_country" className="text-[#1A3A5F] font-medium">
                      {t('country')}
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="address1_country"
                        type="text"
                        placeholder={t('country')}
                        value={formData.address1_country}
                        onChange={(e) => handleInputChange('address1_country', e.target.value)}
                        className="pr-10 bg-white"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="jobtitle" className="text-[#1A3A5F] font-medium">
                      {t('jobTitle')}
                    </Label>
                    <Input
                      id="jobtitle"
                      type="text"
                      placeholder={t('jobTitle')}
                      value={formData.jobtitle}
                      onChange={(e) => handleInputChange('jobtitle', e.target.value)}
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                </div>
              </div>

              {/* Request Details Section */}
              <div>
                <h2 className="text-xl font-bold text-[#1A3A5F] mb-6">{t('requestDetails')}</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="subject" className="text-[#1A3A5F] font-medium">
                      {t('topic')} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder={t('topic')}
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                      className="mt-2 bg-white text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-[#1A3A5F] font-medium">
                      {t('message')} <span className="text-red-500">*</span>
                    </Label>
                    <textarea
                      id="description"
                      placeholder={t('message')}
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      required
                      rows={6}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6720] focus:border-transparent resize-none bg-white text-black"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FF6720] hover:bg-[#FF6720]/90 text-white px-8 py-3"
                >
                  {isSubmitting ? t('sending') : t('sendMessage')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
