import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import axios from "axios";
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 130 },
    { field: 'Pno', headerName: 'Phone_No', width: 130 },
    {
        field: 'Email',
        headerName: 'Email',
        type: 'String',
        width: 90,
    },
    {
        field: 'Role',
        headerName: 'Role',
        description: 'Describes the roles of employees',
        sortable: false,
        width: 160,
    },
    {
        field: 'Address',
        headerName: 'address',
        description: 'Describes the roles of employees',
        sortable: false,
        width: 160,
    },
    {
        field: 'BaseSalary',
        headerName: 'BaseSalary',
        description: 'Describes the roles of employees',
        sortable: false,
        width: 160,
    },
];

const rows = [
    { id: 1, firstName: "Manoj", Phno: 7760448736, age: 25, Role: 'SE', Address: "Banglore", Salary: '8.5lpa' }

];

const paginationModel = { page: 0 };
export default function DataTable() {
    const [users, setUsers] = React.useState([]);
    useEffect(() => {
        async function Request() {
            try {
                const user = await axios.get(`${import.meta.env.VITE_SERVERLINK}/User/api/UserAccepted`);
                const dataWithIds = user.data.Uobj.map((obj, index) => ({
                    id: index + 1, 
                    ...obj,      
                }));
                setUsers(dataWithIds);
            } catch (err) {
                console.log(err);
            }
        }
        Request();
    }, []);
    return (
        <>
            <Paper sx={{ height: '100%', width: '100%', marginTop: '70px' }}>
                <DataGrid
                    rows={users}
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
