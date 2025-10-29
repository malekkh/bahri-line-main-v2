'use client';

/**
 * Vessels Schedule Page
 * Display vessel schedule with sortable table and pagination
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useVoyagesLogic } from '@/customhooks/useVoyagesLogic';
import { Table, Column, SortConfig } from '@/components/ui/table';
import { TableTitle } from '@/components/ui/table-title';
import { Pagination } from '@/components/ui/pagination';
import { StatusBadge } from '@/components/ui/status-badge';
import type { Voyage } from '@/types/voyage.types';

const ITEMS_PER_PAGE = 10;

export default function VesselsSchedulePage() {
  const t = useTranslations('vesselsSchedule');
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    order: null,
  });

  const { voyages, totalPages, isLoading, error } = useVoyagesLogic(
    page,
    ITEMS_PER_PAGE,
    sortConfig.column || undefined,
    sortConfig.order || 'asc'
  );

  const handleSort = (column: string) => {
    setSortConfig((prev) => {
      if (prev.column === column) {
        // Cycle through: asc -> desc -> null
        if (prev.order === 'asc') {
          return { column, order: 'desc' };
        } else if (prev.order === 'desc') {
          return { column: null, order: null };
        }
      }
      return { column, order: 'asc' };
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const columns: Column<Voyage>[] = [
    {
      key: 'voyageNo',
      label: t('columns.voyageNumber'),
      sortable: true,
      render: (value, row) => (
        <button
          className="text-blue-600 hover:text-blue-800 underline text-left"
          onClick={() => {
            // Handle voyage click - you can navigate to voyage details
            console.log('Voyage clicked:', row.voyageNo);
          }}
        >
          {value}
        </button>
      ),
    },
    {
      key: 'vessel',
      label: t('columns.vessel'),
      sortable: true,
      render: (value) => value?.name || '-',
    },
    {
      key: 'service',
      label: t('columns.voyageService'),
      sortable: true,
      render: (value) => value?.name || '-',
    },
    {
      key: 'portOfLoad',
      label: t('columns.portOfLoad'),
      sortable: true,
      render: (value, row) => row.service?.startingPort?.name || '-',
    },
    {
      key: 'portOfDischarge',
      label: t('columns.portOfDischarge'),
      sortable: true,
      render: (value, row) => row.service?.dischargePort?.name || row.service?.startingPort?.name || '-',
    },
    {
      key: 'etd',
      label: t('columns.departureEstimatedTime'),
      sortable: true,
      render: (value) => value?.formatted || value?.raw || '-',
    },
    {
      key: 'eta',
      label: t('columns.arrivalEstimatedTime'),
      sortable: true,
      render: (value) => value?.formatted || value?.raw || '-',
    },
    {
      key: 'status',
      label: t('columns.status'),
      sortable: true,
      render: (value) => <StatusBadge status={value} showArrow />,
    },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <TableTitle title={t('title')} showBackButton />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-lg text-gray-600">{t('loading')}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <TableTitle title={t('title')} showBackButton />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-red-500">{t('error')}: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <TableTitle title={t('title')} showBackButton />
        
        <Table
          columns={columns}
          data={voyages}
          sortConfig={sortConfig}
          onSort={handleSort}
          rowClassName="hover:bg-blue-50"
        />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

