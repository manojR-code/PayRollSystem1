import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

export default function BasicSparkLine() {
    return (
        <Stack
            width="100%"
            direction="row"
            sx={{
                ['@container (width < 600px)']: {
                    flexWrap: 'wrap',
                    maxWidth: '70%',
                },

            }}
            gap={2}
        >
            <Box flexGrow={1} >
                <SparkLineChart
                    sx={{
                        height: '200px'
                    }}
                    plotType="bar"
                    data={[10, 3, 2, 5, 7, 2, 4, 6]}
                    height={100}
                    color={'#d91ceeff'}
                />
            </Box>
        </Stack>
    );
}
