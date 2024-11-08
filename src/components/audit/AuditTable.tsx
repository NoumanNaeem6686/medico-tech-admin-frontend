"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
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

interface AuditData {
  id: number;
  userName: string;
  contactNo: string;
  email: string;
  contactType: string;
  purpose: string;
  meetingTime: string;
}

export default function AuditTable() {
  const [audits, setAudits] = useState<AuditData[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch data from backend
  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/get-all-audits`,
        );

        console.log("Audit data:", response.data.data);

        setAudits(response.data.data); // Assuming your data is in response.data.data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching audit data:", error);
        setLoading(false);
      }
    };

    fetchAudits();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "10px" }}>
      <TableContainer>
        <Table aria-label="audit info table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact Type</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audits
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell>{audit?.userName}</TableCell>
                  <TableCell>{audit?.contactNo}</TableCell>
                  <TableCell>{audit.email}</TableCell>
                  <TableCell>{audit.contactType}</TableCell>
                  <TableCell>{audit.meetingTime}</TableCell>
                  <TableCell>{audit.purpose}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={audits.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
