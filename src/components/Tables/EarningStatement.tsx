import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: '#', headerName: '#', flex: 1 },
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
        field: 'customer',
        headerName: 'Customer',
        flex: 1,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
    },
    {
        field: 'date',
        headerName: 'Date/Time',
        flex: 1,
    },
    {
        field: 'duration',
        headerName: 'Duration',
        flex: 1,
    },
    {
        field: 'nzd',
        headerName: 'NZD',
        type: 'number',
        flex: 1,
    },
];

export default function EarningStatement({ data }: any) {
    console.log("🚀 ~ EarningStatement ~ data:", data);

    // Map the relevant fields from `customerHistories` in the data array to table rows
    const tableData = data && data.customerHistories.map((item: any, index: number) => ({
        '#': index + 1,
        id: item.id || '',
        type: item.serviceType || '',
        customer: item.user.userName || '',
        email: item.user.email || '',
        date: new Date(item.createdAt).toLocaleString(),
        duration: `${item.selectedTime}m`, // Selected time duration
        nzd: item.amount || 0, // Amount earned in NZD
    }));

    return (
        <div style={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={tableData}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}
