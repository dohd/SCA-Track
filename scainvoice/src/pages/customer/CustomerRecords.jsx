import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Customer ID', width: 100 },
  { field: 'customerName', headerName: 'Customer Name', width: 150 },
  { field: 'Address', headerName: 'Address', width: 200 },
  { field: 'Street', headerName: 'Street', width: 120 },
  { field: 'Location', headerName: 'Location', width: 120 },
];

const generateRowsWithIds = (rows) => {
  return rows.map((row, index) => ({
    ...row,
    id: `SCA-${(index + 1).toString().padStart(3, '0')}`, // Generate ID in the format SCA-001
  }));
};

const rows = [
  { customerName: 'Britam', Address: 'P.O.BOX 00-333', Street: 'whitefiled-place', Location: 'Nairobi' },
  { customerName: 'Sidian Bank', Address: 'P.O.BOX 00-333', Street: 'Ring road', Location: 'Nairobi' },
  { customerName: 'Reddington', Address: 'P.O.BOX 00-333', Street: 'whitefiled', Location: 'Nairobi' },
  { customerName: 'Kcb', Address: 'P.O.BOX 00-333', Street: 'whitefiled', Location: 'Nairobi' },
];

const DataTable = () => {
  const rowsWithIds = generateRowsWithIds(rows);

  return (
    <div style={{ height: 400, width: '100%' }}>CustomerRecords
      <DataGrid
        rows={rowsWithIds}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
