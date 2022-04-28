import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'number',
    headerName: '#',
    flex: .3,
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
  },
  {
    field: 'ownerName',
    headerName: 'Nome',
    flex: 2,
  },
  {
    field: 'ownerEmail',
    headerName: 'Email',
    flex: 2,
  },
];

export function AdminDataGrid({ rows }) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={rows.length}
        rowsPerPageOptions={[rows.length]}
        sx={{ backgroundColor: 'white' }}
        disableSelectionOnClick
      />
    </div>
  );
}
