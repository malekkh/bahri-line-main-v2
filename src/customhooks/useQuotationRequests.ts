import { quotationRequestsRequests } from "@/services/requests/req";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

const useQuotationRequests = () => {
    const [sortConfig, setSortConfig] = useState<{ column: string | null; order: 'asc' | 'desc' | null }>({ column: null, order: null });
 
    const getQuotationRequests = async () => {
        const response = await quotationRequestsRequests.getAll();
        return response.data;
    };

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['quotationRequests'],
        queryFn: () => getQuotationRequests(),
    });
    const {paginatedData, totalPages} = useMemo(() => {
        const total = data?.opportunities.length || 0;
        const totalPages = Math.ceil(total / 10);
        const paginatedData = data?.opportunities?.slice(0, 10) || [];
        return { paginatedData, totalPages };
    }, [data]);
    const columns = [
        {
            key: 'requestId',
            label: 'Request ID',
            className:'max-w-24'
        },
        {
            key: 'dischargePort',
            label: 'Discharge Port',
            className:'max-w-24'

        },
        {
            key: 'loadingPort',
            label: 'Loading Port',
            className:'max-w-24'

        },
        {
            key: 'requestedShipmentDate',
            label: 'requestedShipmentDate',
            className:'max-w-24'

        },
        {
            key: 'totalamountFormatted',
            label: 'Total Amount',
            className:'max-w-24'

        },
        {
            key: 'status',
            label: 'Status',
            className:'max-w-24'

        },
    ];

    return {
        data: paginatedData || [],
        totalPages,
        isLoading,
        error,
        refetch,
        columns,
    };
};

export default useQuotationRequests;