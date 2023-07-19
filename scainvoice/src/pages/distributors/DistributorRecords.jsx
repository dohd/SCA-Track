import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import{Link} from "react-router-dom";
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const Distributors = () => {
  const [distributors, setDistributors] = useState([]);

  

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'DName',
    headerName: 'Distributor name',
    width: 150,
   
  },
  {
    field: 'DEmail',
    headerName: 'Distributor Email',
    width: 150,
   
  },
  { field: 'Telephone', headerName: 'Telephone', width: 130 },
  { field: 'DAddress', headerName: 'Address', width: 130 },
  {
    field: 'Dlocation',
    headerName: 'Location',
    width: 110,
    
  },

  {field:'Action',
  headerName: 'Action',
  width:150,
  renderCell:(params) =>{
      return(
          <>
          <Link to= {"/invoice/" + params.row.InvoiceNumber}>
          <button className='InvoiceListEdit'>Edit</button>
          </Link>
          
          <DeleteIcon className='InvoiceListDelete' />
          </>
      )
  }
  },
 
];
const generateRowsWithIds = (rows) => {
  return rows.map((row, index) => ({
    ...row,
    id: `D-${(index + 1).toString().padStart(3, "0")}`, // Generate ID in the format D-001
  }));
};

const rowsWithIds = generateRowsWithIds(distributors);


const rows = [
  { id: 1, DName: 'Snow', DEmail: 'Jon', Dlocation: 'waiyaki',Telephone:12354677,DAddress:'AACC' },
  { id: 2, DName: 'Lannister', DEmail: 'Dlocation', Dlocation: 'waiyaki',Telephone:12354677,DAddress:'AACC' },
  { id: 3, DName: 'Lannister', DEmail: 'Jaime', Dlocation: 'waiyaki',Telephone:12354677,DAddress:'AACC' },
  
];


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
          Distributor Records
        </h1>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      </div>
    </Box>
  );
}
export default Distributors;