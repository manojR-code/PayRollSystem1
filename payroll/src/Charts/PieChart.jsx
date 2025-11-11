import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie() {
    return (
        <PieChart 
            series={[
                {
                    data: [
                        { id: 0, value: 0, label: '0-3LPA'},
                        { id: 1, value: 5, label: '3LPA – 6LPA' },
                        { id: 2, value: 10, label: '6LPA – 9LPA' },
                        { id: 3, value: 20, label: '9LPA – 12LPA' },
                        { id: 4, value: 30, label: '12LPA – 15LPA' },
                    ],
                },
            ]}
            width={200}
            height={200}
            sx={{ marginTop: '20px',fontSize:'2px' }}
            />
    );
}
