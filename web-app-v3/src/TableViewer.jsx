import React from "react";

const TableViewer = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <p>No data to display.</p>;
  }

  // Extract headers and rows from the data
  const headers = data[0]; // First array is the header
  const rows = data.slice(1); // Remaining arrays are the rows

  return (
    <div style={{ padding: "20px" }}>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableViewer;
