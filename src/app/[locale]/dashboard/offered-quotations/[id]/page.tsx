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
import { ArrowLeft, ArrowRight, ChevronLeft, Loader2 } from 'lucide-react';
import { formatDateShort } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { StatusBadge } from '@/components/ui/status-badge';
import { Table, type Column } from '@/components/ui/table';
import { TableControls } from '@/components/ui/table-controls';
import { Pagination } from '@/components/ui/pagination';

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
  const [linesSearch, setLinesSearch] = useState('');
  const [chargesSearch, setChargesSearch] = useState('');
  const [linesPage, setLinesPage] = useState(1);
  const [chargesPage, setChargesPage] = useState(1);
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
            <h3 className="text-lg font-semibold text-[#003C71]">General</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Port of Loading</label>
                <Input
                  readOnly
                  value={
                    quote['_ntw_loadingport_value@OData.Community.Display.V1.FormattedValue'] ||
                    quote.loadingPort?.name ||
                    '-'
                  }
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Port of Discharge</label>
                <Input
                  readOnly
                  value={
                    quote['_ntw_dischargeport_value@OData.Community.Display.V1.FormattedValue'] ||
                    quote.dischargeport?.name ||
                    '-'
                  }
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Requested Shipment Date</label>
                <Input
                  readOnly
                  value={formatDateShort(
                    quote.ntw_requestedshipmentdate || quote.requestShipmentDate || ''
                  )}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Valid From</label>
                <Input
                  readOnly
                  value={formatDateShort(quote.effectivefrom || quote.effectiveFrom || '')}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Valid To</label>
                <Input
                  readOnly
                  value={formatDateShort(quote.effectiveto || quote.effectiveTo || '')}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Total Amount</label>
                <Input
                  readOnly
                  value={formatCurrency(quote.totalamount || quote.totalAmount || 0)}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626] font-semibold"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#003C71]">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Booking Reference</label>
                <Input
                  readOnly
                  value={quote.ntw_bookingreference || '-'}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Voyage Code</label>
                <Input
                  readOnly
                  value={quote.ntw_voyagecode || '-'}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Targeted Vessel</label>
                <Input
                  readOnly
                  value={displayValue(
                    quote.ntw_Voyage?.[
                      '_ntw_vessel_value@OData.Community.Display.V1.FormattedValue'
                    ] ||
                      quote.ntw_Voyage?.name ||
                      quote.ntw_Voyage
                  )}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Voyage Status</label>
                <Input
                  readOnly
                  value={displayValue(
                    quote['ntw_voyagestatus@OData.Community.Display.V1.FormattedValue'] ||
                      quote.ntw_voyagestatus
                  )}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Departure Estimated Time
                </label>
                <Input
                  readOnly
                  value={formatDateShort(quote.ntw_etd || '')}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Arrival Estimated Time</label>
                <Input
                  readOnly
                  value={formatDateShort(quote.ntw_eta || '')}
                  className="w-full bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#003C71]">Terms Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-200 pt-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Liner Terms</label>
                  <Input
                    readOnly
                    value={displayValue(
                      quote['ntw_linertermsoptions@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_linertermsoptions
                    )}
                    className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Shipping Terms</label>
                  <Input
                    readOnly
                    value={displayValue(
                      quote['ntw_shippingtermscode@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_shippingtermscode
                    )}
                    className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Terms</label>
                  <Input
                    readOnly
                    value={displayValue(
                      quote['paymenttermscode@OData.Community.Display.V1.FormattedValue'] ||
                        quote.paymenttermscode
                    )}
                    className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Movement Type (Export)
                  </label>
                  <Input
                    readOnly
                    value={displayValue(
                      quote['ntw_movementtypeexport@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_movementtypeexport
                    )}
                    className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Movement Type (Import)
                  </label>
                  <Input
                    readOnly
                    value={displayValue(
                      quote['ntw_movementtypeimport@OData.Community.Display.V1.FormattedValue'] ||
                        quote.ntw_movementtypeimport
                    )}
                    className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
                  />
                </div>
              </div>
            </div>

            {products && products.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#003C71]">Lines</h3>
                <Table
                  columns={
                    [
                      {
                        key: 'line',
                        label: 'Line',
                        className: 'text-center',
                        render: (_value, row) => (
                          <div className="text-center">
                            <div className="font-medium">{row.line}</div>
                          </div>
                        ),
                      },
                      { key: 'quantity', label: 'Quantity' },
                      {
                        key: 'unitPrice',
                        label: 'Unit Price',
                        render: (val) => formatCurrency(val || 0),
                      },
                      {
                        key: 'lineTotal',
                        label: 'Line Total',
                        render: (val) => (
                          <span className="font-semibold">{formatCurrency(val || 0)}</span>
                        ),
                      },
                    ] as Column<any>[]
                  }
                  data={products.map((product, index) => ({
                    line: index + 1,
                    subline:
                      product.description ||
                      product.name ||
                      displayValue(product.cargotype || product.dimensionUnit || ''),
                    quantity: product.quantity || '-',
                    unitPrice: product.pricePerUnit || product.price || 0,
                    lineTotal: product.lineBaseAmount || 0,
                  }))}
                  className="bg-white"
                />

                <h3 className="text-lg font-semibold text-[#003C71]">Charges</h3>
                <Table
                  columns={
                    [
                      {
                        key: 'lineId',
                        label: 'Line ID',
                        className: 'text-center',
                        render: (val) => <div className="text-center font-medium">{val}</div>,
                      },
                      {
                        key: 'charge',
                        label: 'Charge',
                        className: 'text-center',
                        render: (_val, row) => (
                          <div className="flex flex-wrap gap-1 justify-center flex-row">
                            {row.noCharge ? (
                              <div className="text-left whitespace-pre-wrap leading-5 bg-[#F5F5F5] rounded-[3px] px-3 py-2 text-[#262626DE]">
                                No charges
                              </div>
                            ) : (
                              (row.charges as { label: string; amount: number }[]).map((c, idx) => (
                                <div
                                  key={idx}
                                  className="text-left whitespace-pre-wrap leading-5 bg-[#F5F5F5] rounded-[3px] px-3 py-2 text-[#262626DE]"
                                >
                                  {c.label}: {formatCurrency(c.amount || 0)}
                                </div>
                              ))
                            )}
                          </div>
                        ),
                      },
                      {
                        key: 'amount',
                        label: 'Amount',
                        render: (val, row) =>
                          row.noCharge ? (
                            <span className="text-gray-500">-</span>
                          ) : (
                            <div className="text-center font-medium">
                              {formatCurrency(val || 0)}
                            </div>
                          ),
                      },
                    ] as Column<any>[]
                  }
                  data={products.map((product, pIndex) => {
                    const charges = product.charges || product.ntw_quoteCharges || [];
                    const mappedCharges = charges.map((c) => ({
                      label: c.portName || c.chargeType || 'Charge',
                      amount: c.total || c.amount || 0,
                    }));
                    const total = mappedCharges.reduce((sum, c) => sum + (c.amount || 0), 0);
                    const noCharge = mappedCharges.length === 0;
                    return {
                      lineId: pIndex + 1,
                      charges: mappedCharges,
                      amount: total,
                      noCharge,
                    };
                  })}
                  className="bg-white"
                />

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

                {(() => {
                  const detailAmount = products.reduce((sum, p) => {
                    const charges = p.charges || p.ntw_quoteCharges || [];
                    const chargesTotal = charges.reduce(
                      (cSum, c) => cSum + (c.total || c.amount || 0),
                      0
                    );
                    return sum + (p.lineBaseAmount || 0) + chargesTotal;
                  }, 0);
                  const discountPercentage =
                    quote.discountpercentage ?? quote.discountPercentage ?? null;
                  const commissionPercentage =
                    quote.ntw_commissionpercentage ?? quote.commissionPercentage ?? null;
                  const totalAmountStat = quote.totalamount || quote.totalAmount || detailAmount;

                  return (
                    <div className="flex flex-col gap-3 pt-2">
                      <div className="rounded-md bg-[#F5F5F5] px-4 py-3 text-base text-[#3B3B3B] flex items-center justify-between">
                        <span>Detail Amount:</span>
                        <span className="font-semibold text-[#3B3B3B]">
                          {formatCurrency(detailAmount || 0)}
                        </span>
                      </div>
                      <div className="rounded-md bg-[#F5F5F5] px-4 py-3 text-base text-[#3B3B3B] flex items-center justify-between">
                        <span>Discount Percentage:</span>
                        <span className="font-semibold text-[#3B3B3B]">
                          {discountPercentage != null ? `${discountPercentage}%` : '-'}
                        </span>
                      </div>
                      <div className="rounded-md bg-[#F5F5F5] px-4 py-3 text-base text-[#3B3B3B] flex items-center justify-between">
                        <span>Commission Percentage:</span>
                        <span className="font-semibold text-[#3B3B3B]">
                          {commissionPercentage != null ? `${commissionPercentage}%` : '-'}
                        </span>
                      </div>
                      <div className="rounded-md bg-[#F5F5F5] px-4 py-3 text-base text-[#3B3B3B] flex items-center justify-between">
                        <span>Total Amount:</span>
                        <span className="font-semibold text-[#3B3B3B]">
                          {formatCurrency(totalAmountStat || 0)}
                        </span>
                      </div>
                    </div>
                  );
                })()}
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
                  className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
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
                  className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
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
                  className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
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
                  className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
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
                  className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
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
                  className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
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
                  className="bg-[#F3F4F6] border-[#F3F4F6] text-[#262626]"
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
              <div className="flex items-center justify-start gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" onClick={handleBack} className="p-0 hover:bg-transparent">
                    <ChevronLeft
                      className="text-[#0277AA]"
                      style={{ width: '24px', height: '24px' }}
                    />
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold text-[#003C71]">
                      {quote.quotenumber || quoteId}
                    </h1>
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
