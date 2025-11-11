import * as React from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import CircularProgress from '@mui/material/CircularProgress';
import '../Style/Payments.css';

export default function AccordionUsage() {
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const [Employees, setEmployees] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);


    React.useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVERLINK}/User/api/Users`);
                setEmployees(res.data.Uobj || []);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_SERVERLINK}/User/api/UserAccept/${id}`);
            setEmployees((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            console.error("Error updating user status:", err);
            alert("Failed to update user status");
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_SERVERLINK}/User/api/delete/${id}`);
            setEmployees((prev) => prev.filter((user) => user._id !== id));
        } catch (err) {
            alert("Failed to delete user");
        }
    };

    if (loading) {
        return (
            <div className="color" style={{ textAlign: 'center', padding: '40px' }}>
                <CircularProgress />
                <Typography variant="body1" sx={{ mt: 2 }}>Loading users...</Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="color" style={{ textAlign: 'center', padding: '40px' }}>
                <Typography color="error">No Forms Found</Typography>
            </div>
        );
    }

    return (
        <div className='color'>
            {Employees.length === 0 ? (
                <Typography sx={{ textAlign: 'center', mt: 4 }}>No users found.</Typography>
            ) : (
                Employees.map((ele, index) => (
                    <Accordion defaultExpanded key={ele._id || index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            <Typography component="span">{ele.Name || 'Unknown User'}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <Stack direction="row" spacing={1}>
                                <Chip
                                    avatar={<Avatar>{(ele.Name && ele.Name.charAt(0)) || "U"}</Avatar>}
                                    label="Profile"
                                />
                            </Stack>

                            <Typography sx={{ margin: '20px 0' }}>
                                Hi, this is {ele.Name || 'Unnamed'}
                            </Typography>

                            <Typography sx={{ margin: '20px 0' }}>
                                Role: {ele.Role || 'Not specified'}
                            </Typography>

                            <Paper
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0,
                                }}
                                component="ul"
                            >
                            </Paper>
                        </AccordionDetails>

                        <AccordionActions>
                            <Button color="error" onClick={() => handleReject(ele._id)}>Reject</Button>
                            <Button color="primary" onClick={() => handleAccept(ele._id)}>Accept</Button>
                        </AccordionActions>
                    </Accordion>
                ))
            )}
        </div>
    );
}
