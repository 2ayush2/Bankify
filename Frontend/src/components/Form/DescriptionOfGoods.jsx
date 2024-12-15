import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UploadIcon from "@mui/icons-material/Upload";

const LightweightTable = ({ initialColumns = [], initialRows = [], onTableDataChange }) => {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, data: Array(columns.length).fill("") };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    if (onTableDataChange) onTableDataChange({ columns, rows: updatedRows });
  };

  const handleAddColumn = () => {
    const newColumnName = `Column ${columns.length + 1}`;
    const updatedColumns = [...columns, newColumnName];
    const updatedRows = rows.map((row) => ({
      ...row,
      data: [...row.data, ""],
    }));
    setColumns(updatedColumns);
    setRows(updatedRows);
    if (onTableDataChange) onTableDataChange({ columns: updatedColumns, rows: updatedRows });
  };

  const handleDeleteRow = (rowId) => {
    const updatedRows = rows.filter((row) => row.id !== rowId);
    setRows(updatedRows);
    if (onTableDataChange) onTableDataChange({ columns, rows: updatedRows });
  };

  const handleDeleteColumn = (colIndex) => {
    const updatedColumns = columns.filter((_, index) => index !== colIndex);
    const updatedRows = rows.map((row) => ({
      ...row,
      data: row.data.filter((_, index) => index !== colIndex),
    }));
    setColumns(updatedColumns);
    setRows(updatedRows);
    if (onTableDataChange) onTableDataChange({ columns: updatedColumns, rows: updatedRows });
  };

  const handleCellChange = (rowId, columnIndex, value) => {
    const updatedRows = rows.map((row) =>
      row.id === rowId
        ? { ...row, data: row.data.map((cell, index) => (index === columnIndex ? value : cell)) }
        : row
    );
    setRows(updatedRows);
    if (onTableDataChange) onTableDataChange({ columns, rows: updatedRows });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const csvRows = text.trim().split("\n").map((row) => row.split(","));
      const newColumns = csvRows[0];
      const newRows = csvRows.slice(1).map((row, index) => ({
        id: index + 1,
        data: row,
      }));
      setColumns(newColumns);
      setRows(newRows);
      if (onTableDataChange) onTableDataChange({ columns: newColumns, rows: newRows });
    };

    reader.readAsText(file);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <label className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300">
          <UploadIcon fontSize="small" className="mr-2" /> Upload CSV
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </label>
      </div>
      <TableContainer
        component={Paper}
        className="border border-gray-300 rounded-md shadow-sm"
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <Table className="table-fixed min-w-max border-collapse">
          <TableHead>
            <TableRow>
              <TableCell
                className="text-center font-bold border border-gray-300 bg-gray-100 sticky top-0 z-10"
                style={{ width: "50px" }}
              >
                <div className="flex justify-center items-center">
                  <Tooltip title="Add Row">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={handleAddRow}
                      aria-label="Add Row"
                    >
                      <ArrowDownwardIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              {columns.map((col, colIndex) => (
                <TableCell
                  key={colIndex}
                  className="text-center font-bold border border-gray-300 bg-gray-100 sticky top-0 z-10"
                  style={{ minWidth: "120px" }}
                >
                  <div className="flex justify-between items-center">
                    <TextField
                      value={col}
                      onChange={(e) => {
                        const updatedColumns = [...columns];
                        updatedColumns[colIndex] = e.target.value;
                        setColumns(updatedColumns);
                        if (onTableDataChange)
                          onTableDataChange({ columns: updatedColumns, rows });
                      }}
                      variant="standard"
                      size="small"
                      fullWidth
                    />
                    <IconButton size="small" onClick={() => handleDeleteColumn(colIndex)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </div>
                </TableCell>
              ))}
              <TableCell
                className="text-center font-bold border border-gray-300 bg-gray-100 sticky top-0 z-10"
                style={{ width: "50px" }}
              >
                <Tooltip title="Add Column">
                  <div
                    className="flex justify-center items-center w-8 h-8 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100"
                    onClick={handleAddColumn}
                  >
                    <ArrowForwardIcon fontSize="small" />
                  </div>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={row.id}>
                <TableCell
                  className="text-center border border-gray-300"
                  style={{ width: "50px" }}
                >
                  <Tooltip title="Delete Row">
                    <IconButton size="small" onClick={() => handleDeleteRow(row.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                {row.data.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="border border-gray-300"
                    style={{ minWidth: "120px" }}
                  >
                    <TextField
                      value={cell}
                      onChange={(e) => handleCellChange(row.id, colIndex, e.target.value)}
                      variant="standard"
                      size="small"
                      className="w-full"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LightweightTable;
