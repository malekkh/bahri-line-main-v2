'use client';

/**
 * Offered Quotation Details/Steps Page
 * Multi-step page for viewing and processing offered quotations
 * This is a simplified version - full implementation would require step components migration
 */

import { useOfferedQuotationDetailsLogic } from '@/customhooks/useOfferedQuotationDetailsLogic';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VerticalStepper, type VerticalStepperStep } from '@/components/ui/vertical-stepper';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { formatDateShort } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { StatusBadge } from '@/components/ui/status-badge';

export default function OfferedQuotationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params.id as string;
  const locale = params.locale as string;

  const {
    quote,
    products,
    isLoading,
    error,
    refetch,
    updatePricingAcceptance,
    isUpdatingPricingAcceptance,
    updateShipment,
    isUpdatingShipment,
  } = useOfferedQuotationDetailsLogic(quoteId);

  const displayValue = (value: any) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    if (typeof value === 'object') {
      if ('label' in value) return String((value as any).label || '-');
      if ('name' in value) return String((value as any).name || '-');
      return JSON.stringify(value);
    }
    return String(value);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [shipmentForm, setShipmentForm] = useState({
    ntw_requestedetd: '',
    ntw_requestedeta: '',
    ntw_bookingreference: '',
    shipto_name: '',
    shipto_contactname: '',
    shipto_telephone: '',
    ntw_decidingpartyoption: '',
  });

  useEffect(() => {
    if (!quote) return;
    setCurrentStep(quote.ntw_ispricingaccepted ? 1 : 0);
    setShipmentForm({
      ntw_requestedetd: quote.ntw_requestedetd || quote.ntw_requestedshipmentdate || '',
      ntw_requestedeta: quote.ntw_requestedeta || '',
      ntw_bookingreference: quote.ntw_bookingreference || '',
      shipto_name: quote.shipto_name || '',
      shipto_contactname: quote.shipto_contactname || '',
      shipto_telephone: quote.shipto_telephone || '',
      ntw_decidingpartyoption: quote.ntw_decidingpartyoption || '',
    });
  }, [quote]);

  const handleBack = () => {
    router.push(`/${locale}/dashboard/quotation-requests`);
  };

  const handlePricingDecision = async (accepted: boolean) => {
    if (!quote?.quoteId) return;
    try {
      setFeedbackMessage(null);
      await updatePricingAcceptance({
        quoteId: quote.quoteId,
        ntw_ispricingaccepted: accepted,
      });
      setFeedbackMessage(accepted ? 'Pricing accepted.' : 'Pricing decision saved.');
      if (accepted) {
        setCurrentStep(1);
      }
    } catch (err: any) {
      setFeedbackMessage(err?.message || 'Unable to update pricing acceptance.');
    }
  };

  const handleShipmentSubmit = async () => {
    if (!quote?.quoteId) return;
    try {
      setFeedbackMessage(null);
      await updateShipment({
        quoteId: quote.quoteId,
        ...shipmentForm,
      });
      setFeedbackMessage('Shipment details saved.');
      setCurrentStep(Math.max(currentStep, 2));
    } catch (err: any) {
      setFeedbackMessage(err?.message || 'Unable to update shipment details.');
    }
  };

  const steps: VerticalStepperStep[] = useMemo(
    () => [
      { id: 'pricing', label: 'Pricing Details', stepNumber: 1 },
      { id: 'shipping', label: 'Shipping Application', stepNumber: 2 },
      { id: 'documents', label: 'Documents', stepNumber: 3 },
      { id: 'payment', label: 'Proof of Payment', stepNumber: 4 },
    ],
    []
  );

  const stepsWithState = useMemo(
    () =>
      steps.map((step, index) => ({
        ...step,
        completed:
          index < currentStep || (step.id === 'pricing' && Boolean(quote?.ntw_ispricingaccepted)),
        active: index === currentStep,
      })),
    [currentStep, quote, steps]
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const renderStepContent = () => {
    if (!quote) return null;

    switch (steps[currentStep].id) {
      case 'pricing':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Port of Loading</label>
                  <p className="text-base text-gray-900">
                    {quote['_ntw_loadingport_value@OData.Community.Display.V1.FormattedValue'] ||
                      quote.loadingPort?.name ||
                      '-'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Port of Discharge</label>
                  <p className="text-base text-gray-900">
                    {quote['_ntw_dischargeport_value@OData.Community.Display.V1.FormattedValue'] ||
                      quote.dischargeport?.name ||
                      '-'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Requested Shipment Date
                  </label>
                  <p className="text-base text-gray-900">
                    {formatDateShort(
                      quote.ntw_requestedshipmentdate || quote.requestShipmentDate || ''
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Valid From</label>
                  <p className="text-base text-gray-900">
                    {formatDateShort(quote.effectivefrom || quote.effectiveFrom || '')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Valid To</label>
                  <p className="text-base text-gray-900">
                    {formatDateShort(quote.effectiveto || quote.effectiveTo || '')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Total Amount</label>
                  <p className="text-base font-semibold text-gray-900">
                    {formatCurrency(quote.totalamount || quote.totalAmount || 0)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Booking Reference</label>
                  <p className="text-base text-gray-900">{quote.ntw_bookingreference || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Voyage Code</label>
                  <p className="text-base text-gray-900">{quote.ntw_voyagecode || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Targeted Vessel</label>
                  <p className="text-base text-gray-900">
                    {displayValue(
                      quote.ntw_Voyage?.[
                        '_ntw_vessel_value@OData.Community.Display.V1.FormattedValue'
                      ] ||
                        quote.ntw_Voyage?.name ||
                        quote.ntw_Voyage
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">ETD</label>
                    <p className="text-base text-gray-900">
                      {formatDateShort(quote.ntw_etd || '')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">ETA</label>
                    <p className="text-base text-gray-900">
                      {formatDateShort(quote.ntw_eta || '')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Liner Terms</label>
                  <p className="text-base text-gray-900">
                    {displayValue(
                      quote['ntw_linertermsoptions@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_linertermsoptions
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Shipping Terms</label>
                  <p className="text-base text-gray-900">
                    {displayValue(
                      quote['ntw_shippingtermscode@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_shippingtermscode
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Terms</label>
                  <p className="text-base text-gray-900">
                    {displayValue(
                      quote['paymenttermscode@OData.Community.Display.V1.FormattedValue'] ||
                        quote.paymenttermscode
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Movement Type (Export)
                  </label>
                  <p className="text-base text-gray-900">
                    {displayValue(
                      quote['ntw_movementtypeexport@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_movementtypeexport
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Movement Type (Import)
                  </label>
                  <p className="text-base text-gray-900">
                    {displayValue(
                      quote['ntw_movementtypeimport@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_movementtypeimport
                    )}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Voyage Status</label>
                  <p className="text-base text-gray-900">
                    {displayValue(
                      quote['ntw_voyagestatus@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_voyagestatus
                    )}
                  </p>
                </div>
              </div>
            </div>

            {products && products.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#003C71]">Lines & Charges</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Line
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Unit Price
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Charges
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.map((product, index) => {
                        const charges = product.charges || product.ntw_quoteCharges || [];
                        const chargesTotal = charges.reduce(
                          (sum, c) => sum + (c.total || c.amount || 0),
                          0
                        );
                        return (
                          <tr key={product.id || index}>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              <div className="font-medium">
                                {product.description || product.name || '-'}
                              </div>
                              <div className="text-xs text-gray-500">
                                {displayValue(product.cargotype || product.dimensionUnit || '')}
                              </div>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {product.quantity || '-'}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {formatCurrency(product.pricePerUnit || product.price || 0)}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">
                              {charges.length === 0 ? (
                                <span className="text-gray-500">No charges</span>
                              ) : (
                                <div className="space-y-1">
                                  {charges.map((charge, i) => (
                                    <div key={i} className="flex justify-between gap-2">
                                      <span className="text-xs text-gray-600">
                                        {charge.portName || charge.chargeType || 'Charge'}
                                      </span>
                                      <span className="text-xs font-medium">
                                        {formatCurrency(charge.total || charge.amount || 0)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-2 text-sm font-semibold text-gray-900">
                              {formatCurrency((product.lineBaseAmount || 0) + chargesTotal)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end text-sm text-gray-700">
                  <span className="font-semibold mr-2">Grand Total:</span>
                  <span>
                    {formatCurrency(
                      products.reduce((sum, p) => {
                        const charges = p.charges || p.ntw_quoteCharges || [];
                        const chargesTotal = charges.reduce(
                          (cSum, c) => cSum + (c.total || c.amount || 0),
                          0
                        );
                        return sum + (p.lineBaseAmount || 0) + chargesTotal;
                      }, 0)
                    )}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-3">
              <Button
                variant={quote.ntw_ispricingaccepted ? 'outline' : 'default'}
                onClick={() => handlePricingDecision(true)}
                disabled={isUpdatingPricingAcceptance}
                className="bg-[#003C71] hover:bg-[#003C71]/90 text-white"
              >
                {isUpdatingPricingAcceptance
                  ? 'Saving...'
                  : quote.ntw_ispricingaccepted
                    ? 'Reconfirm Pricing'
                    : 'Acknowledge & Accept'}
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePricingDecision(false)}
                disabled={isUpdatingPricingAcceptance}
              >
                {isUpdatingPricingAcceptance ? 'Saving...' : 'Request Changes'}
              </Button>
            </div>
          </div>
        );
      case 'shipping':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Requested ETD</label>
                <Input
                  type="date"
                  value={shipmentForm.ntw_requestedetd?.slice(0, 10) || ''}
                  onChange={(e) =>
                    setShipmentForm((prev) => ({ ...prev, ntw_requestedetd: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Requested ETA</label>
                <Input
                  type="date"
                  value={shipmentForm.ntw_requestedeta?.slice(0, 10) || ''}
                  onChange={(e) =>
                    setShipmentForm((prev) => ({ ...prev, ntw_requestedeta: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Booking Reference</label>
                <Input
                  placeholder="Enter booking reference"
                  value={shipmentForm.ntw_bookingreference}
                  onChange={(e) =>
                    setShipmentForm((prev) => ({ ...prev, ntw_bookingreference: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Deciding Party</label>
                <Input
                  placeholder="Consignee / Shipper"
                  value={shipmentForm.ntw_decidingpartyoption}
                  onChange={(e) =>
                    setShipmentForm((prev) => ({
                      ...prev,
                      ntw_decidingpartyoption: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Consignee Name</label>
                <Input
                  placeholder="Consignee name"
                  value={shipmentForm.shipto_name}
                  onChange={(e) =>
                    setShipmentForm((prev) => ({ ...prev, shipto_name: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Consignee Contact Name</label>
                <Input
                  placeholder="Contact person"
                  value={shipmentForm.shipto_contactname}
                  onChange={(e) =>
                    setShipmentForm((prev) => ({ ...prev, shipto_contactname: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Consignee Phone</label>
                <Input
                  placeholder="Phone number"
                  value={shipmentForm.shipto_telephone}
                  onChange={(e) =>
                    setShipmentForm((prev) => ({ ...prev, shipto_telephone: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleShipmentSubmit}
                disabled={isUpdatingShipment}
                className="bg-[#003C71] hover:bg-[#003C71]/90 text-white"
              >
                {isUpdatingShipment ? 'Saving...' : 'Save Shipping Details'}
              </Button>
              <p className="text-sm text-gray-500">
                These details update the shipping application on the quotation.
              </p>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#003C71]">Documents</h3>
            <p className="text-sm text-gray-700">
              Upload or review contract documents, invoices, and certificates. This step will be
              connected to the document service; for now please coordinate uploads via the support
              team.
            </p>
            <div className="p-4 border rounded-md bg-gray-50 text-sm text-gray-700">
              No documents linked yet. Once available, they will appear here with download links.
            </div>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#003C71]">Proof of Payment</h3>
            <p className="text-sm text-gray-700">
              Share proof of payment to finalize the booking. This section will integrate with
              payment confirmation in the next iteration.
            </p>
            <div className="p-4 border rounded-md bg-gray-50 text-sm text-gray-700">
              Payment confirmation is pending. Please send proof through your account manager until
              the upload flow is enabled.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#003C71]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg p-6 mx-6 bg-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading quotation: {error.message}</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="rounded-lg p-6 mx-6 bg-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Quotation not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <VerticalStepper
              steps={stepsWithState}
              currentStep={currentStep}
              onStepSelect={(index) => setCurrentStep(index)}
            />
          </div>

          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-[#003C71]">
                      {quote.name || quote.quotenumber || 'Quotation Details'}
                    </h1>
                    <p className="text-sm text-gray-500">Quote #{quote.quotenumber || quoteId}</p>
                  </div>
                </div>
                <StatusBadge
                  status={
                    quote.statusCode
                      ? {
                          value: quote.statusCode.value,
                          label: quote.statusCode.label || 'Unknown',
                        }
                      : undefined
                  }
                />
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Opportunity</p>
                    <p className="text-base font-semibold text-gray-900">
                      {quote.opportunity?.name || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-xl font-semibold text-[#003C71]">
                      {formatCurrency(quote.totalamount || quote.totalAmount || 0)}
                    </p>
                  </div>
                </div>

                {feedbackMessage && (
                  <div className="rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                    {feedbackMessage}
                  </div>
                )}

                {renderStepContent()}

                <div className="flex justify-between pt-4 border-t border-gray-200">
                  {!isFirstStep ? (
                    <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  ) : (
                    <div />
                  )}

                  {!isLastStep ? (
                    <Button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-[#003C71] hover:bg-[#003C71]/90 text-white"
                    >
                      Next: {steps[currentStep + 1]?.label}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
