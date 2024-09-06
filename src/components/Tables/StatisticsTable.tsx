import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'readings', headerName: 'Readings', flex: 1, type: 'number' },
    {
        field: 'answered',
        headerName: 'Answered',
        flex: 1,
        type: 'number',
    },
    {
        field: 'charged',
        headerName: 'Charged',
        flex: 1,
        type: 'number',
    },
    {
        field: 'missed',
        headerName: 'Missed',
        flex: 1,
        type: 'number',
    },
    {
        field: 'acceptanceRate',
        headerName: 'Acceptance Rate',
        flex: 1,
    },
];

export default function StatisticsTable({ data }: any) {
    console.log("🚀 ~ StatisticsTable ~ data:", data);

    // Ensure data is an array with one object
    const rows = [data].map((item: any) => ({
        id: item.id, // Ensure each item has a unique id
        readings: item.totalReadings,
        answered: item.answeredCalls + item.answeredChats,
        charged: item.chargedCalls + item.chargedChats,
        missed: item.missedCalls + item.missedChats,
        acceptanceRate: `${item.acceptanceRateCalls || item.acceptanceRateChats}%`,
    }));

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows} // Pass the array of row objects
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
