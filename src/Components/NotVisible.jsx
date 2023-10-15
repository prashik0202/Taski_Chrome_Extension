import React from 'react';
import { Box , Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

function NotVisible() {
  return (
    <Box mt={20} textAlign='center'>
      <ErrorIcon sx={{ color : '#64b5f6'}} fontSize='large'/>
      <Typography variant='h4' color='#64b5f6'>
        Opps!! <br />No data found!
      </Typography>
    </Box>
  ) 
}

export default NotVisible
