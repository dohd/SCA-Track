import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import {Box} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const columns = [
  { field: 'Name', headerName: 'Bank Name', width: 100 },
  { field: 'Branch', headerName: 'Bank Branch', width: 150 },
  { field: 'Kes', headerName: 'Kes Account', width: 200 },
  { field: 'Pound', headerName: 'Pound Account', width: 120 },
  { field: 'Usd', headerName: 'Usd Account', width: 120 },
  { field: 'Swift', headerName: 'Swift', width: 120 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <>
        <IconButton
          aria-label="Edit"
          
          size="small"
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="Delete"
          
          size="small"
        >
          <Delete />
        </IconButton>
      </>
    ),
  },

];

const rows = [
  {
    id: 1,
    Name: 'Kenya commercial bank',
    Branch: 'Kenyatta Avenue',
    Kes: 'XXX-XXX-XXX',
    Pound: 'XXX-XXX-XXX',
    Usd: 'XXX-XXX-XXX',
    Swift: 'SBMKenya',  
  },
  {
    id: 2,
    Name: 'Sidian Bank',
    Branch: 'Westlands Branch',
    Kes: 'XXX-XXX-XXX',
    Pound: 'XXX-XXX-XXX',
    Usd: 'XXX-XXX-XXX',
    Swift: 'SDNKenya',
  },
  {
    id: 3,
    Name: 'Sbm bank',
    Branch: 'Moi Avenue',
    Kes: 'XXX-XXX-XXX',
    Pound: 'XXX-XXX-XXX',
    Usd: 'XXX-XXX-XXX',
    Swift: 'SBMKenya',
  },
];

export default function BankRecords() {
  
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      height: "100%",
    }}
  >
    <div
      style={{
        height: 480,
        width: "80%",
        marginLeft: "280px",
        marginRight: "0",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "500",
          marginBottom: "10px",
        }}
      >
       BankRecords
      </h1>
    
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
    </Box>
  );
};

