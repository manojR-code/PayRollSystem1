import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[{ data: ['0-4', '4-8', '8-12'] }]}
      series={[{ label: 'SoftWare', data: [4000, 3000, 5000] }, { label: 'Services', data: [1000, 6000, 3000] }, { label: 'Products', data: [2000, 5000, 6000] }]}
      height={300}
    />
  );
}
