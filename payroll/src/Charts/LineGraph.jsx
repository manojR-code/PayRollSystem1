import * as React from 'react';
import Box from '@mui/material/Box';
import ImageSlider from '../assets/ImageSlider';
import { createTheme } from '@mui/material/styles';
import BasicPie from '../Charts/PieChart';
import {
    LineChart,
    lineElementClasses,
    markElementClasses,
} from '@mui/x-charts/LineChart';
const theme = createTheme({
    palette: {
        primary: {
            main: '#f44336'
        }
    }
})
const margin = { right: 24 };
const pData = [2400, 1398, 5800, 3908, 4800];
const xLabels = [
    'SE',
    'Marketing',
    'UI UX',
    'Java Dev',
    'Dev Ops',
];

export default function DashedLineChart() {
    return (
        <>
            <ImageSlider />

        </>

    );
}
