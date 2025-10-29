'use client';

/**
 * Vessels Schedule Page
 * Display vessel schedule with sortable table and pagination
 */

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useVoyagesLogic } from '@/customhooks/useVoyagesLogic';
import { Table, Column, SortConfig, SortType } from '@/components/ui/table';
import { TableTitle } from '@/components/ui/table-title';
import { Pagination } from '@/components/ui/pagination';
import { StatusBadge } from '@/components/ui/status-badge';
import { Logo } from '@/components/ui/logo';
import { sortData } from '@/utils/sortData';
import type { Voyage } from '@/types/voyage.types';

const ITEMS_PER_PAGE = 10;

export default function VesselsSchedulePage() {
  const t = useTranslations('vesselsSchedule');
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    order: null,
  });

  // Fetch all voyages (we'll paginate and sort on frontend)
  // Note: If API supports pagination, you might want to fetch all data first
  // For now, we'll fetch page by page but sort only current page
  const { voyages: allVoyages, isLoading, error } = useVoyagesLogic(1, 1000); // Fetch large limit or all

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
    // Reset to first page when sorting changes
    setPage(1);
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
      sortType: 'string',
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
      key: 'vessel.name',
      label: t('columns.vessel'),
      sortable: true,
      sortType: 'string',
      render: (value, row) => row.vessel?.name || '-',
    },
    {
      key: 'service.name',
      label: t('columns.voyageService'),
      sortable: true,
      sortType: 'string',
      render: (value, row) => row.service?.name || '-',
    },
    {
      key: 'service.startingPort.name',
      label: t('columns.portOfLoad'),
      sortable: true,
      sortType: 'string',
      render: (value, row) => row.service?.startingPort?.name || '-',
    },
    {
      key: 'service.dischargePort.name',
      label: t('columns.portOfDischarge'),
      sortable: true,
      sortType: 'string',
      render: (value, row) => row.service?.dischargePort?.name || row.service?.startingPort?.name || '-',
    },
    {
      key: 'etd',
      label: t('columns.departureEstimatedTime'),
      sortable: true,
      sortType: 'date',
      render: (value, row) => row.etd?.formatted || row.etd?.raw || '-',
    },
    {
      key: 'eta',
      label: t('columns.arrivalEstimatedTime'),
      sortable: true,
      sortType: 'date',
      render: (value, row) => row.eta?.formatted || row.eta?.raw || '-',
    },
    {
      key: 'status.label',
      label: t('columns.status'),
      sortable: true,
      sortType: 'string',
      render: (value, row) => <StatusBadge status={row.voyageStatus?.label} />,
    },
  ];

  // Sort and paginate data on frontend
  const { sortedData, paginatedData, totalPages } = useMemo(() => {
    let processedData = [...allVoyages];

    // Apply sorting if configured
    if (sortConfig.column && sortConfig.order) {
      const column = columns.find((col) => col.key === sortConfig.column);
      const sortType = column?.sortType || 'string';
      processedData = sortData(processedData, sortConfig.column, sortType, sortConfig.order);
    }

    // Calculate pagination
    const total = processedData.length;
    const totalPagesCount = Math.ceil(total / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = processedData.slice(startIndex, endIndex);

    return {
      sortedData: processedData,
      paginatedData: paginated,
      totalPages: totalPagesCount,
    };
  }, [allVoyages, sortConfig, page, columns]);

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-100 py-6">
          <div className="container mx-auto px-8">
            <Logo className="justify-center" />
          </div>
        </div>
        <div className="container mx-auto p-8">
          <TableTitle title={t('title')} showBackButton />
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-lg text-gray-600">{t('loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-100 py-6">
          <div className="container mx-auto px-8">
            <Logo className="justify-center" />
          </div>
        </div>
        <div className="container mx-auto p-8">
          <TableTitle title={t('title')} showBackButton />
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-red-500">{t('error')}: {error.message}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Logo Section */}
      <div className="py-6">
        <div className="container mx-auto px-8">
          <Logo className="justify-start" />
        </div>
      </div>

      {/* Table Container */}
        <div className="rounded-lg p-6 mx-6 bg-white">
          <TableTitle title={t('title')} showBackButton className='text-navy-blue'/>
          
          <Table
            columns={columns}
            data={paginatedData}
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

