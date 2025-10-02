import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Gauge } from '@mui/x-charts/Gauge';

export default function GaugeValueRange() {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
      <Gauge width={300} height={110} value={50} color={'#e62fd7ff' } />
    </Stack>
  );
}
