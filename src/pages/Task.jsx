import React from 'react'
import { useState, useEffect } from 'react';
import { Typography , Box , TextField , FormControl, IconButton , Checkbox} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete'
import WorkIcon from '@mui/icons-material/Work';


export default function Task() {

  const [ tasks , setTasks ] = useState([]);

  useEffect(() => {
    // Load tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // save tasks to localstorage whenever the task state changes:
    localStorage.setItem("tasks" , JSON.stringify(tasks) );
  }, [tasks])

  const addTask = (text) => {
    const options = {
      weekday: 'short',  // Short weekday name (e.g., "SUN")
      month: 'short',    // Short month name (e.g., "Aug")
      day: '2-digit',    // Two-digit day of the month (e.g., "12")
      hour: 'numeric',   // Numeric hour (e.g., "11")
      minute: '2-digit', // Two-digit minute (e.g., "14")
      hour12: true,      // Use 12-hour clock (e.g., "am" or "pm")
    };
    const newTask = { 
      id : Date.now() , 
      text , completed : false, 
      time : new Date(Date.now()).toLocaleString('en-US' , options) 
    };
    setTasks([...tasks , newTask]);
  }

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: true, disabled : true} : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <Box>
      <Box
          px={1}
          marginTop={10}
          textAlign='center'
      >
          <Typography variant='h5'>Manage Your Tasks</Typography>
      </Box>

      <Box
        mt={2}
        mx={2}
      >
        <FormControl fullWidth>
          <TextField
            type='text'
            label="task" 
            placeholder='enter your task'
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                addTask(e.target.value);
                e.target.value = '';
              }
            }}
          />
        </FormControl>
      </Box>

      <Box
        mt={1}
        mx={1}
      >
        <List sx={{ width : '100%' , bgcolor: 'background.paper'}}>

        { tasks.map((item) => (
          <ListItem
            key={item}
            secondaryAction={
              <>
                <Checkbox edge="end" color='success' checked={item.completed} onChange={() => completeTask(item.id)} disabled={tasks.disabled}/>
                <IconButton edge="end" >
                  <DeleteIcon color='error' onClick={() => deleteTask(item.id)}/>
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
                <WorkIcon  color='primary'/> 
            </ListItemAvatar>
            <ListItemText
              className={item.completed ? 'completed' : ''}
              primary={item.text}
              secondary={item.time}
            />
          </ListItem>
        ))}
        </List>
      </Box>
    </Box>
  )
}
