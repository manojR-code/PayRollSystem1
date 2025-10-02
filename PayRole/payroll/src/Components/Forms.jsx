import * as React from 'react';
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
import ListItem from '@mui/material/ListItem';
import '../Style/Payments.css';
export default function AccordionUsage() {
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
    const [Employees, setEmployees] = React.useState([
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, Role: 'SE' },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, Role: 'MT' },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, Role: 'AI' },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, Role: 'SE' },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, Role: 'SE' },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150, Role: 'SE' },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, Role: 'ML' },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, Role: 'SE' },]);
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Angular' },
        { key: 1, label: 'jQuery' },
        { key: 2, label: 'Polymer' },
        { key: 3, label: 'React' },
        { key: 4, label: 'Vue.js' },
    ]);
    const Remove = (id) => {

    }
    return (
        <div className='color'>
            {
                Employees.map((ele, index) => (
                    <Accordion defaultExpanded key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            <Typography component="span">{ele.firstName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction="row" spacing={1} >
                                <Chip avatar={<Avatar>{(ele.firstName && ele.firstName.charAt(0)) ? ele.firstName.charAt(0) : "A"}</Avatar>} label="Profile" />
                            </Stack>
                            <Typography sx={{ margin: '20px 0' }}>
                                Hii these Side {ele.firstName}
                            </Typography>
                            <Typography sx={{ margin: '20px 0' }}>
                                {ele.Role}
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
                                {chipData.map((data) => {
                                    let icon;

                                    if (data.label === 'React') {
                                        icon = <TagFacesIcon />;
                                    }

                                    return (
                                        <ListItem key={data.key}>
                                            <Chip
                                                icon={icon}
                                                label={data.label}
                                                sx={{ color: 'blue' }}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </Paper>
                        </AccordionDetails>
                        <AccordionActions>
                            <Button onClick={() => setEmployees(Employees.filter((items,index) => items.id != ele.id))}>Reject</Button>
                            <Button onClick={() => setEmployees(Employees.filter((items,index) => items.id != ele.id))}>Accept</Button>
                        </AccordionActions>
                    </Accordion>
                ))
            }
        </div>
    );
}
