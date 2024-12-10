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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const LightweightTable = ({ initialColumns = [], initialRows = [], onTableDataChange }) => {
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1, data: Array(columns.length).fill("") };
    setRows([...rows, newRow]);
    if (onTableDataChange) onTableDataChange({ columns, rows: [...rows, newRow] });
  };

  const handleAddColumn = () => {
    const newColumnName = `Column ${columns.length + 1}`;
    setColumns([...columns, newColumnName]);
    const updatedRows = rows.map(row => ({
      ...row,
      data: [...row.data, ""],
    }));
    setRows(updatedRows);
    if (onTableDataChange) onTableDataChange({ columns: [...columns, newColumnName], rows: updatedRows });
  };

  const handleCellChange = (rowId, columnIndex, value) => {
    const updatedRows = rows.map(row =>
      row.id === rowId
        ? { ...row, data: row.data.map((cell, index) => (index === columnIndex ? value : cell)) }
        : row
    );
    setRows(updatedRows);
    if (onTableDataChange) onTableDataChange({ columns, rows: updatedRows });
  };

  const handleColumnChange = (colIndex, value) => {
    const updatedColumns = columns.map((col, index) => (index === colIndex ? value : col));
    setColumns(updatedColumns);
    if (onTableDataChange) onTableDataChange({ columns: updatedColumns, rows });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const csvRows = text.trim().split("\n").map(row => row.split(","));
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
          Upload CSV
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </label>
      </div>
      <TableContainer
        component={Paper}
        className="border border-gray-300 rounded-md shadow-sm"
        style={{
          maxHeight: "400px", // Fixed height
          overflowY: "auto", // Vertical scrolling
          overflowX: "auto", // Horizontal scrolling
        }}
      >
        <Table className="table-fixed min-w-max border-collapse">
          <TableHead>
            <TableRow>
              {/* Smaller width for the index column */}
              <TableCell
                className="text-center font-bold border border-gray-300 bg-gray-100 sticky top-0 z-10"
                style={{ width: "50px" }} // Smaller width for the first column
              >
                #
              </TableCell>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  className="text-center font-bold border border-gray-300 bg-gray-100 sticky top-0 z-10"
                  style={{ minWidth: "120px" }} // Fixed width for data columns
                >
                  <TextField
                    value={col}
                    onChange={(e) => handleColumnChange(index, e.target.value)}
                    variant="standard"
                    size="small"
                    fullWidth
                  />
                </TableCell>
              ))}
              {/* Smaller width for the add-column button */}
              <TableCell
                className="text-center font-bold border border-gray-300 bg-gray-100 sticky top-0 z-10"
                style={{ width: "50px" }} // Smaller width for the last column
              >
                <div
                  className="flex justify-center items-center w-8 h-8 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100"
                  onClick={handleAddColumn}
                >
                  <AddCircleOutlineIcon fontSize="small" />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={row.id}>
                {/* Smaller width for the index column */}
                <TableCell
                  className="text-center border border-gray-300"
                  style={{ width: "50px" }}
                >
                  {rowIndex + 1}
                </TableCell>
                {row.data.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="border border-gray-300"
                    style={{ minWidth: "120px" }} // Fixed width for data columns
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
                {/* Smaller width for the add-row button */}
                {rowIndex === rows.length - 1 && (
                  <TableCell
                    className="text-center border border-gray-300"
                    style={{ width: "50px" }}
                  >
                    <div
                      className="flex justify-center items-center w-8 h-8 bg-white border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100"
                      onClick={handleAddRow}
                    >
                      <AddCircleOutlineIcon fontSize="small" />
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LightweightTable;
