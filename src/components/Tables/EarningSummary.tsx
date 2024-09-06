import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function EarningSummary({ data }: any) {
    console.log("🚀 ~ EarningSummary ~ data:", data);

    const tableData = data && data.map((item: any, index: number) => ({
        id: item.id,
        '#': index + 1, // Sequential numbering
        callReadings: item.callReadings || 0,
        'chat readings': item.chatReadings || 0,
        totalReadings: item.totalReadings || 0,
        totalRefunds: item.refunds || 0,
        netEarnings: item.netEarnings || 0,
        'bank transfer fees': item.bankTransferFees || 0,
        paidEarnings: item.paidEarnings || 0,
    }));

    const columns: GridColDef[] = [
        { field: '#', headerName: '#', width: 50 },
        { field: 'callReadings', headerName: 'Call Readings', width: 120, type: 'number' },
        { field: 'chat readings', headerName: 'Chat Readings', width: 120, type: 'number' },
        { field: 'totalReadings', headerName: 'Total Readings', width: 120, type: 'number' },
        { field: 'totalRefunds', headerName: 'Total Refunds', width: 120, type: 'number' },
        { field: 'netEarnings', headerName: 'Net Earnings (NZ$)', width: 150, type: 'number' },
        { field: 'bank transfer fees', headerName: 'Bank Transfer Fees (NZ$)', width: 180, type: 'number' },
        { field: 'paidEarnings', headerName: 'Paid Earnings (NZ$)', width: 150, type: 'number' },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
