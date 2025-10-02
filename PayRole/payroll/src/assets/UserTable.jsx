import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''}_${row.lastName || ''}`,
    },
    {
        field: 'Role',
        headerName: 'Role',
        description: 'Describes the roles of employees',
        sortable: false,
        width: 160,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, Role: 'SE' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, Role: 'MT' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, Role: 'AI' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, Role: 'SE' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, Role: 'SE' },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, Role: 'SE' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, Role: 'ML' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, Role: 'SE' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, Role: 'AI' },
    { id: 10, lastName: 'R', firstName: 'Manoj', age: 20, Role: 'SE' },
    { id: 11, lastName: 'Snow', firstName: 'Jon', age: 35, Role: 'SE' },
    { id: 12, lastName: 'Lannister', firstName: 'Cersei', age: 42, Role: 'MT' },
    { id: 13, lastName: 'Lannister', firstName: 'Jaime', age: 45, Role: 'AI' },
    { id: 14, lastName: 'Stark', firstName: 'Arya', age: 16, Role: 'SE' },
    { id: 15, lastName: 'Targaryen', firstName: 'Daenerys', age: null, Role: 'SE' },
    { id: 16, lastName: 'Melisandre', firstName: null, age: 150, Role: 'SE' },
    { id: 17, lastName: 'Clifford', firstName: 'Ferrara', age: 44, Role: 'ML' },
    { id: 18, lastName: 'Frances', firstName: 'Rossini', age: 36, Role: 'SE' },
    { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65, Role: 'AI' },
    { id: 20, lastName: 'R', firstName: 'Manoj', age: 20, Role: 'SE' }
];

const paginationModel = { page: 0};
export default function DataTable() {
    return (
        <>
            <Paper sx={{ height: '100%', width: '100%', marginTop: '70px' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: 0 }}
                />
            </Paper>
        </>
    );
}
