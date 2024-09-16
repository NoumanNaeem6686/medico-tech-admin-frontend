import * as React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const handleActionClick = async (psychicBillingId: any, adminId: any) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transaction/create`, {
            psychicBillingId,
            adminId
        });
        console.log("🚀 ~ handleActionClick ~ response:", response);
    } catch (error) {
        console.log("🚀 ~ handleActionClick ~ error:", error);
    }
};


export default function BillingTable({ data, setSelectedEarningDetail }: any) {
    console.log("🚀 ~ BillingTable ~ data:", data);
    const { admin } = useSelector((state: any) => state.admin);
    const adminId = admin?.id; // Ensure safe access to admin.id

    if (!adminId) {
        console.error("Admin ID is not available.");
    }

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
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        if (adminId) {
                            handleActionClick(params.row.id, adminId);
                        } else {
                            console.error("Admin ID is not available.");
                        }
                    }}
                >
                    {params.row.paid == true ? "Paid" : "UnPaid"}
                </Button>
            ),
        },
    ];

    const rowsEarning = data.map((item: any) => ({
        id: item.id,
        period: item.period,
        paidMonth: item.paidMonth || "",
        paidReadings: item.paidReadings,
        earnings: `NZ$ ${item.earnings.toFixed(2)}`,
        refunds: `NZ$ ${item.refunds.toFixed(2)}`,
        rollOver: `NZ$ ${item.rollOver.toFixed(2)}`,
        paidOut: `NZ$ ${item.paidOut.toFixed(2)}`,
        originalData: item,
        paid: item.paid,
    }));

    const handleRowClick = (params: GridRowParams) => {
        setSelectedEarningDetail(params.row.originalData);
    };

    return (
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
                onRowClick={handleRowClick} // Handle row clicks
            />
        </div>
    );
}
