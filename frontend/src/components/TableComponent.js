import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TablePagination, CircularProgress } from "@mui/material";

const TableContainerComponent = ({
  columns,
  data,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading,
  renderRow }) => {

  return (
    <TableContainer component={Paper} sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id} align={column.align} sx={{ fontWeight: "bold", color: "#1976d2" }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(renderRow)
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        sx={{ marginTop: "20px" }}
      />
    </TableContainer>
  );
};

export default TableContainerComponent;
