import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Success } from '../OOPS/Alert';

export default function ColorButtons() {
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleClick = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <Stack direction="row" spacing={2} style={{ marginTop: '20px' }}>
      <Button variant="contained" color="success" onClick={handleClick}>
        Proceed
      </Button>
      {showSuccess && <Success/>}
    </Stack>
  );
}