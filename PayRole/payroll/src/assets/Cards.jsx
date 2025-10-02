import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../Style/Home.css'
import '../index.css'
function Home(props) {
    return (
        <div className='blocks'>
             <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: 'auto', marginTop: '100px' }} >
                <Card sx={{ maxWidth: 300, background:'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)', boxShadow: ' 2px 2px 5px white' }} className='cards'>
                    <Piechart />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1E293B' }}>
                            Monthly Expense
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1E293B', fontFamily: 'monospace' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ maxWidth: 300, background:'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)', boxShadow: ' 2px 2px 5px white' }} className='cards'>
                    <CardMedia
                        sx={{ height: 100 }}

                    />
                    <CardContent>
                        <SparkLine />
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1E293B' }}>
                            Lizard
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1E293B', fontFamily: 'monospace' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: 300, background:'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)', boxShadow: ' 2px 2px 5px white' }} className='cards'>
                    <CardMedia
                        sx={{ height: 100 }}

                    />
                    <CardContent>
                        <Loader />
                        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#1E293B' }}>
                            Lizard

                        </Typography>
                        <Typography variant="body2" sx={{ color: '#1E293B', fontFamily: 'monospace' }}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default Home;