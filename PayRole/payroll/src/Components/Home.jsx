import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../Style/Home.css'
import '../index.css'
import Piechart from '../assets/SparkLine';
import SparkLine from '../assets/SparkLine1';
import Loader from '../assets/Loader';
import LineGraph from '../Charts/LineGraph';
import ImageSlider from '../assets/ImageSlider';

function Home(props) {
    return (
        <div className='blocks'>
            <Box>
                <LineGraph />
            </Box>
            
        </div>
    );
}

export default Home;