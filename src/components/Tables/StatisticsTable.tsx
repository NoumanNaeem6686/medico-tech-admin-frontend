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

    // Map the data array to match the structure for DataGrid
    const tableData = data.map((item: any, index: number) => ({
        id: item.id,
        readings: item.totalReadings, // Total readings
        answered: item.answeredCalls + item.answeredChats, // Total answered (calls + chats)
        charged: item.chargedCalls + item.chargedChats, // Total charged (calls + chats)
        missed: item.missedCalls + item.missedChats, // Total missed (calls + chats)
        acceptanceRate: `${item.acceptanceRateCalls || item.acceptanceRateChats}%`, // Acceptance rate (calls or chats)
    }));

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
