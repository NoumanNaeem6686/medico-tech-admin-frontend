import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columnsEarning: GridColDef[] = [
    { field: "period", headerName: "Period", flex: 1 },
    { field: "paidMonth", headerName: "Paid Month", flex: 1 },
    {
        field: "paidReadings",
        headerName: "Paid Readings*",
        flex: 1,
        type: "number",
    },
    { field: "earnings", headerName: "Earnings (NZ$)", flex: 1 },
    { field: "refunds", headerName: "Refunds (NZ$)", flex: 1 },
    { field: "rollOver", headerName: "Rollover (NZ$)", flex: 1 },
    { field: "paidOut", headerName: "Paid Out (NZ$)", flex: 1 },
];

export default function BillingTable({ data }: any) {
    console.log("🚀 ~ BillingTable ~ data:", data);

    const rowsEarning = data.map((item: any) => ({
        id: item.id,
        period: item.period,
        paidMonth: item.paidMonth || "",
        paidReadings: item.paidReadings,
        earnings: `NZ$ ${item.earnings.toFixed(2)}`,
        refunds: `NZ$ ${item.refunds.toFixed(2)}`,
        rollOver: `NZ$ ${item.rollOver.toFixed(2)}`,
        paidOut: `NZ$ ${item.paidOut.toFixed(2)}`,
    }));

    return (
        <>
            <div style={{ height: 400, width: "100%", borderRadius: "30px" }}>
                <DataGrid
                    rows={rowsEarning}
                    columns={columnsEarning}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}
