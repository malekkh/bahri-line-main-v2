'use client';

/**
 * Voyage Routes Modal Component
 * Displays voyage routes in a table within a modal
 */

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/ui/modal';
import { Table, Column, SortConfig } from '@/components/ui/table';
import { StatusBadge } from '@/components/ui/status-badge';
import { useVoyageRoutesLogic } from '@/customhooks/useVoyageRoutesLogic';
import { sortData } from '@/utils/sortData';
import { formatDateShort } from '@/utils/formatDate';
import type { VoyageRoute } from '@/types/voyage.types';

interface VoyageRoutesModalProps {
  isOpen: boolean;
  onClose: () => void;
  voyageId: string | null;
  voyageNo?: string;
}

export function VoyageRoutesModal({
  isOpen,
  onClose,
  voyageId,
  voyageNo,
}: VoyageRoutesModalProps) {
  const t = useTranslations('vesselsSchedule');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    order: null,
  });

  const { routes, isLoading, error } = useVoyageRoutesLogic(voyageId, isOpen);

  const handleSort = (column: string) => {
    setSortConfig((prev) => {
      if (prev.column === column) {
        if (prev.order === 'asc') {
          return { column, order: 'desc' };
        } else if (prev.order === 'desc') {
          return { column: null, order: null };
        }
      }
      return { column, order: 'asc' };
    });
  };

  const columns: Column<VoyageRoute>[] = [
    {
      key: 'seqNumber',
      label: 'Seq NO',
      sortable: true,
      sortType: 'number',
      render: (value) => value,
    },
    {
      key: 'port.name',
      label: 'Port',
      sortable: true,
      sortType: 'string',
      render: (value, row) => row.port?.name || '-',
    },
    {
      key: 'eta',
      label: 'Arrival Estimated Time',
      sortable: true,
      sortType: 'date',
      render: (value, row) => formatDateShort(row.eta?.raw || row.eta?.formatted || ''),
    },
    {
      key: 'voyageNo',
      label: 'Voyage Number',
      sortable: true,
      sortType: 'string',
      render: () => voyageNo || '-',
    },
    {
      key: 'status.label',
      label: 'Status',
      sortable: false, // Status column not sortable in screenshot
      render: (value, row) => <StatusBadge status={row.status} />,
    },
  ];

  // Sort data
  const sortedRoutes = useMemo(() => {
    if (!sortConfig.column || !sortConfig.order) {
      return routes;
    }

    const column = columns.find((col) => col.key === sortConfig.column);
    const sortType = column?.sortType || 'string';
    return sortData(routes, sortConfig.column, sortType, sortConfig.order);
  }, [routes, sortConfig, columns]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Voyage Routes"
      className="max-w-5xl"
    >
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-600">Loading voyage routes...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      ) : sortedRoutes.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-500">No voyage routes available</div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={sortedRoutes}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      )}
    </Modal>
  );
}

