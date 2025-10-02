import * as React from 'react';
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';

const margin = { right: 24 };
const uData = [4000, 3000, 2000, 2780, 1890, 2390, ];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, ];
const amtData = [2400, 2210, 0, 2000, 2181, 2500, ];
const xLabels = [
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
];

export default function StackedAreaChart() {
  return (
    <Box sx={{ width: '100%', height: 300 }}>
      <LineChart
        series={[
          { data: uData, label: 'SE', area: true, stack: 'total', showMark: false },
          { data: pData, label: 'Marketin', area: true, stack: 'total', showMark: false },
          {
            data: amtData,
            label: 'Java Devs',
            area: true,
            stack: 'total',
            showMark: false,
          },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[{ width: 50 }]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            display: 'none',
          },
        }}
        margin={margin}
      />
    </Box>
  );
}
