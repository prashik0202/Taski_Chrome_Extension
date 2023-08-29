import React from 'react';
import { Box , Container , Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function Home() {
  return (
    <Container>
        <Box
            px={1}
            py={20}
            textAlign='center'
        >
            <TaskAltIcon fontSize='large' color='primary'/>
            <Typography variant='h5' color='primary'>Empower Your Productivity with Taski</Typography><br />
            <Typography variant='body1' >Your All-in-One Solution for Tasks, Expenses, Passwords, and Reminders!</Typography>
        </Box>
    </Container>
  )
}
