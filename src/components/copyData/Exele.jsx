import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const Exele = () => {
  const jsonData = [
    { Name: 'John Doe', Age: 25, City: 'New York' },
    { Name: 'Jane Doe', Age: 30, City: 'San Francisco' },
  ];

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(jsonData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(data, 'yourData.xlsx');
  };

  return (
    <div>
      <button onClick={downloadExcel}>Download Excel</button>
    </div>
  );
};