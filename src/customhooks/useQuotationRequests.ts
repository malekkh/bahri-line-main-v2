import React from "react";
import { quotationRequestsRequests } from "@/services/requests/req";
import { useQuery } from "@tanstack/react-query";
import { StatusBadge } from "@/components/ui/status-badge";

const useQuotationRequests = () => {
    const getQuotationRequests = async () => {
        const response = await quotationRequestsRequests.getAll();
        return response.data;
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['quotationRequests'],
        queryFn: () => getQuotationRequests(),
    });

    const columns = [
        {
            key: 'requestId',
            label: 'Request ID',
            className: 'max-w-24',
            sortable: true,
        },
        {
            key: 'dischargePort',
            label: 'Discharge Port',
            className: 'max-w-24',
            sortable: true,
        },
        {
            key: 'loadingPort',
            label: 'Loading Port',
            className: 'max-w-24',
            sortable: true,
        },
        {
            key: 'requestedShipmentDate',
            label: 'Requested Shipment Date',
            className: 'max-w-24',
            sortable: true,
            sortType: 'date' as const,
        },
        {
            key: 'totalamountFormatted',
            label: 'Total Amount',
            className: 'max-w-24',
            sortable: true,
            sortType: 'number' as const,
        },
        {
            key: 'status',
            label: 'Status',
            className: 'max-w-24',
            sortable: false,
            render: (value: any, row: any) => React.createElement(StatusBadge, { status: value || row.status }),
        },
    ];

    return {
        data: data?.opportunities || [],
        isLoading,
        error,
        refetch,
        columns,
    };
};

export default useQuotationRequests;