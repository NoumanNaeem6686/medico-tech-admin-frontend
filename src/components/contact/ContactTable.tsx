"use client";

import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TablePagination,
} from "@mui/material";

interface UserContactInfo {
    id: number;
    name: string;
    phone: string;
    email: string;
    contactType: string;
    message: string;
}

const staticUserData = [
    { id: 1, name: "John Doe", phone: "123-456-7890", email: "john@example.com", contactType: "Personal", message: "Looking forward to our meeting." },
    { id: 2, name: "Jane Smith", phone: "098-765-4321", email: "jane@example.com", contactType: "Business", message: "Please send the contract." },
    { id: 3, name: "Michael Johnson", phone: "234-567-8901", email: "michael@example.com", contactType: "Personal", message: "Can we reschedule?" },
    { id: 4, name: "Emily Davis", phone: "345-678-9012", email: "emily@example.com", contactType: "Business", message: "I need more information." },
    { id: 5, name: "Daniel Martinez", phone: "456-789-0123", email: "daniel@example.com", contactType: "Personal", message: "Thank you for your time." },
    { id: 6, name: "Laura Hernandez", phone: "567-890-1234", email: "laura@example.com", contactType: "Business", message: "I'll follow up later." },
    { id: 7, name: "David Wilson", phone: "678-901-2345", email: "david@example.com", contactType: "Personal", message: "Can we meet tomorrow?" },
    { id: 8, name: "Sophia Brown", phone: "789-012-3456", email: "sophia@example.com", contactType: "Business", message: "The meeting went well." },
    { id: 9, name: "James Anderson", phone: "890-123-4567", email: "james@example.com", contactType: "Personal", message: "I have shared the documents." },
    { id: 10, name: "Emma Thomas", phone: "901-234-5678", email: "emma@example.com", contactType: "Business", message: "Let's touch base next week." },
    { id: 11, name: "Robert Taylor", phone: "111-222-3333", email: "robert@example.com", contactType: "Personal", message: "Looking forward to our call." },
    { id: 12, name: "Olivia Lee", phone: "444-555-6666", email: "olivia@example.com", contactType: "Business", message: "Can you share the report?" },
    { id: 13, name: "William Harris", phone: "777-888-9999", email: "william@example.com", contactType: "Personal", message: "I’ll be available by 5 pm." },
    { id: 14, name: "Ava Clark", phone: "222-333-4444", email: "ava@example.com", contactType: "Business", message: "The project is on schedule." },
    { id: 15, name: "Charles King", phone: "555-666-7777", email: "charles@example.com", contactType: "Personal", message: "Thanks for your help." },
    { id: 16, name: "Mia Hall", phone: "888-999-0000", email: "mia@example.com", contactType: "Business", message: "I will send the invoice soon." },
    { id: 17, name: "Alexander Scott", phone: "333-444-5555", email: "alexander@example.com", contactType: "Personal", message: "Let's meet for coffee." },
    { id: 18, name: "Isabella Young", phone: "666-777-8888", email: "isabella@example.com", contactType: "Business", message: "The client is happy with the progress." },
    { id: 19, name: "Henry Turner", phone: "999-000-1111", email: "henry@example.com", contactType: "Personal", message: "I’ll call you later today." },
    { id: 20, name: "Emily Carter", phone: "222-444-6666", email: "emilycarter@example.com", contactType: "Business", message: "We should finalize the deal soon." },
];


export default function UserContactTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "10px" }}>
            <TableContainer>
                <Table aria-label="user contact info table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact Type</TableCell>
                            <TableCell>Message</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {staticUserData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.contactType}</TableCell>
                                    <TableCell>{user.message}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={staticUserData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
