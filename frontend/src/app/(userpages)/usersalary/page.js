"use client";

import Layout from "../userlayout";
import React, { useEffect, useState } from "react";
import {
    Button,
    Divider,
    Stack,
    TextField,
    Typography,
    Box,
    InputAdornment,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    Paper,
    TablePagination,
    CircularProgress
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getSalaryHistory } from "@/utils/axiosInstance";
import { useSelector } from "react-redux";
import { format } from "date-fns";

function UserSalary() {
    const [salaryData, setSalaryData] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchSalaryData = async () => {
            setLoading(true); // Set loading to true before API call
            try {
                const response = await getSalaryHistory();
                if (Array.isArray(response.data.data)) {
                    setSalaryData(response.data.data);
                } else {
                    setSalaryData([]);
                    setError("Invalid data format received");
                }
            } catch (err) {
                setError("Failed to fetch salary data");
            } finally {
                setLoading(false); // Set loading to false after API call
            }
        };

        if (user?._id) {
            fetchSalaryData();
        }
    }, [user]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = salaryData.filter((salary) =>
        salary.basicSalary.toString().includes(searchQuery)
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Layout>
            <Box
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    padding: "20px",
                    minHeight: "700px",
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: "white",
                }}
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold", paddingBottom: "15px", color: "#333" }}
                >
                    Salary History
                </Typography>
                <Divider sx={{ marginBottom: "20px" }} />

                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <TextField
                        size="small"
                        label="Search Salary Records"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ width: 300 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                        <CircularProgress />
                        <Typography sx={{ marginLeft: '10px' }}>Loading...</Typography>
                    </Box>
                ) : (
                    <TableContainer component={Paper} sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}>
                        <Table stickyHeader aria-label="salary table" sx={{ width: "100%" }}>
                            <thead>
                                <TableRow>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "10%" }}>
                                        No.
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                        Department
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                        Salary
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                        Allowance
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "20%" }}>
                                        Deduction
                                    </TableCell>
                                    <TableCell align="left" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                        Total
                                    </TableCell>
                                    <TableCell align="center" sx={{ fontWeight: "bold", color: "#1976d2", width: "15%" }}>
                                        Pay Date
                                    </TableCell>
                                </TableRow>
                            </thead>
                            <tbody>
                                {filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((salary, index) => (
                                        <TableRow key={salary._id || index} sx={{ height: 70 }}>
                                            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell align="left">{salary.department?.dep_name || "N/A"}</TableCell>
                                            <TableCell align="left">Rs.{salary.basicSalary}</TableCell>
                                            <TableCell align="left">Rs.{salary.allowances}</TableCell>
                                            <TableCell align="left">Rs.{salary.deductions}</TableCell>
                                            <TableCell align="left">Rs.{salary.netSalary}</TableCell>
                                            <TableCell align="center">
                                                {salary.payDate ? format(new Date(salary.payDate), "MM/dd/yyyy") : "Invalid Date"}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </tbody>
                        </Table>
                    </TableContainer>
                )}

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ marginTop: "20px" }}
                />
            </Box>
        </Layout>
    );
}

export default UserSalary;
