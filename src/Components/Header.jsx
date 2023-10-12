
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react'
import { Link } from 'react-router-dom';

const navItems = [
    { "name" : 'Tasks' , "path" : '/task'},
    // {"name" : 'Reminder', "path" : "/reminder"}, 
    {"name" : 'Expenses' , "path" : "/expense"} ,
    {"name": 'Passwords' ,"path" : "/password"}
];

export default function Header() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor : '#f5f5f5'}} elevation={0}>
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: { sm: 'block' } }} 
          >
            <IconButton component={Link} to='/'>
                <TaskAltIcon fontSize='large' color='primary'/>
            </IconButton>
          </Box>
          <Box sx={{ display: { sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.name}  color='primary' component={Link} to={item.path}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>  
  )
}
