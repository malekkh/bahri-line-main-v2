'use client';

/**
 * Offered Quotation Details/Steps Page
 * Multi-step page for viewing and processing offered quotations
 * This is a simplified version - full implementation would require step components migration
 */

import { useOfferedQuotationDetailsLogic } from '@/customhooks/useOfferedQuotationDetailsLogic';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { formatDateShort } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { StatusBadge } from '@/components/ui/status-badge';

export default function OfferedQuotationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params.id as string;
  const locale = params.locale as string;

  const { quote, products, isLoading, error, refetch } = useOfferedQuotationDetailsLogic(quoteId);

  const handleBack = () => {
    router.push(`/${locale}/dashboard/quotation-requests`);
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

  const loadingPortName =
    quote['_ntw_loadingport_value@OData.Community.Display.V1.FormattedValue'] ||
    quote.loadingPort?.name ||
    '-';
  const dischargePortName =
    quote['_ntw_dischargeport_value@OData.Community.Display.V1.FormattedValue'] ||
    quote.dischargeport?.name ||
    '-';

  return (
    <div className="rounded-lg p-6 mx-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
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
              ? { value: quote.statusCode.value, label: quote.statusCode.label || 'Unknown' }
              : undefined
          }
        />
      </div>

      {/* Quotation Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Port of Loading</label>
            <p className="text-base text-gray-900">{loadingPortName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Port of Discharge</label>
            <p className="text-base text-gray-900">{dischargePortName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Requested Shipment Date</label>
            <p className="text-base text-gray-900">
              {formatDateShort(quote.ntw_requestedshipmentdate || quote.requestShipmentDate || '')}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Valid From</label>
            <p className="text-base text-gray-900">
              {formatDateShort(quote.effectivefrom || quote.effectiveFrom || '')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Valid To</label>
            <p className="text-base text-gray-900">
              {formatDateShort(quote.effectiveto || quote.effectiveTo || '')}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Total Amount</label>
            <p className="text-base font-semibold text-gray-900">
              {formatCurrency(quote.totalamount || quote.totalAmount || 0)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Pricing Accepted</label>
            <p className="text-base text-gray-900">{quote.ntw_ispricingaccepted ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <p className="text-base text-gray-900">{quote.statusCode?.label || '-'}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      {products && products.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#003C71] mb-4">Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price per Unit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.description || product.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.quantity || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(product.pricePerUnit || product.price || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(product.lineBaseAmount || 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Note about full implementation */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This is a basic quotation details view. The full multi-step
          implementation (Pricing Details, Shipping Application, Documents, Proof of Payment)
          requires migrating the step components from the old app. This will be completed in a
          subsequent phase.
        </p>
      </div>
    </div>
  );
}
