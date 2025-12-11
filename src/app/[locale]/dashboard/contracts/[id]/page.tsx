'use client';

/**
 * Contract Details Page
 * Displays contract information and allows status updates
 */

import { useContractDetailsLogic } from '@/customhooks/useContractDetailsLogic';
import { contractsRequests } from '@/services/requests/req';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Download } from 'lucide-react';
import { formatDateShort } from '@/utils/formatDate';
import { formatCurrency } from '@/utils/formatCurrency';
import { useEffect, useMemo, useState } from 'react';
import { handleApiError } from '@/utils/handleApiError';

export default function ContractDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const contractId = params.id as string;
  const locale = (params.locale as string) || 'en';

  const {
    contract,
    isLoading,
    error,
    refetch,
    updateStatus,
    isUpdatingStatus,
    updateStatusError,
    updateStatusSuccess,
  } = useContractDetailsLogic(contractId);

  const [statusValue, setStatusValue] = useState<string>('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    if (contract?.status) {
      setStatusValue(contract.status.label || String(contract.status.value));
    }
  }, [contract?.status]);

  const statusOptions = useMemo(
    () => ['Draft', 'Active', 'Signed', 'Expired', 'Cancelled'],
    []
  );

  const handleBack = () => {
    router.push(`/${locale}/dashboard/contracts`);
  };

  const handleStatusUpdate = () => {
    if (!contract) return;
    updateStatus({ contractId: contract.contractId, status: statusValue || 'Active' });
  };

  const handleDownload = async (docId: string, docName: string) => {
    try {
      setDownloadingId(docId);
      setDownloadError(null);
      const response = await contractsRequests.downloadDocument(docId);
      const blob = response.data as any;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = docName || `contract-${docId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const normalized = handleApiError(err);
      setDownloadError(normalized.message || 'Failed to download document');
    } finally {
      setDownloadingId(null);
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
            <p className="text-red-500 mb-4">Error loading contract: {error.message}</p>
            <Button onClick={() => refetch()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="rounded-lg p-6 mx-6 bg-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-gray-500">Contract not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg p-6 mx-6 bg-white space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#003C71]">
              {contract.name || 'Contract Details'}
            </h1>
            <p className="text-sm text-gray-500">
              Contract #{contract.contractNumber || contract.contractId}
            </p>
          </div>
        </div>
        <StatusBadge status={contract.status} />
      </div>

      {/* Contract Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InfoRow label="Account" value={contract.accountName || '-'} />
          <InfoRow label="Valid From" value={formatDateShort(contract.effectiveFrom || '') || '-'} />
          <InfoRow label="Valid To" value={formatDateShort(contract.effectiveTo || '') || '-'} />
          <InfoRow
            label="Total Amount"
            value={formatCurrency(contract.totalAmount || 0) || '-'}
            emphasize
          />
        </div>
        <div className="space-y-4">
          <InfoRow label="Created On" value={formatDateShort(contract.createdOn || '') || '-'} />
          <InfoRow label="Contact Name" value={contract.contactName || '-'} />
          <InfoRow label="Contact Email" value={contract.contactEmail || '-'} />
          <InfoRow label="Contact Phone" value={contract.contactPhone || '-'} />
        </div>
      </div>

      {/* Status Update */}
      <div className="p-4 border border-gray-200 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Update Status</p>
            <p className="text-xs text-gray-500">
              Choose a new status and click update to sync with CRM
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={statusValue}
              onChange={(e) => setStatusValue(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003C71]"
            >
              <option value="">Select status</option>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Button
              onClick={handleStatusUpdate}
              disabled={isUpdatingStatus || !statusValue}
              className="bg-[#003C71] hover:bg-[#003C71]/90 text-white"
            >
              {isUpdatingStatus && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Update
            </Button>
          </div>
        </div>
        {updateStatusError && (
          <p className="text-sm text-red-500">
            Failed to update status: {updateStatusError.message}
          </p>
        )}
        {updateStatusSuccess && (
          <p className="text-sm text-green-600">Status updated successfully.</p>
        )}
      </div>

      {/* Documents */}
      {contract.documents && contract.documents.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[#003C71]">Documents</h2>
          <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
            {contract.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between px-4 py-3 gap-4 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.name || 'Document'}</p>
                  <p className="text-xs text-gray-500">{doc.contentType || 'File'}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(doc.id, doc.name || 'contract.pdf')}
                  disabled={downloadingId === doc.id}
                  className="flex items-center gap-2"
                >
                  {downloadingId === doc.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Download
                </Button>
              </div>
            ))}
          </div>
          {downloadError && <p className="text-sm text-red-500">{downloadError}</p>}
        </div>
      )}
    </div>
  );
}

const InfoRow = ({
  label,
  value,
  emphasize = false,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className={`text-base ${emphasize ? 'font-semibold text-gray-900' : 'text-gray-900'}`}>
      {value || '-'}
    </p>
  </div>
);

