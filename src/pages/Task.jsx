import React from 'react'
import { useState, useEffect } from 'react';
import { Typography , Box , TextField , FormControl, IconButton , Grid,FormLabel,FormGroup , FormControlLabel , Checkbox , Button, ListItemIcon , Select , MenuItem , InputLabel} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete'
import WorkIcon from '@mui/icons-material/Work';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FixedSizeList } from "react-window";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


export default function Task() {

  const [ tasks , setTasks ] = useState([]);
  const [task, setTask] = useState({ name: '', description: '', date : moment().format('YYYY-MM-DD') , priority: 'low'});

  useEffect(() => {
    // Load tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    // save tasks to localstorage whenever the task state changes:
    localStorage.setItem("tasks" , JSON.stringify(tasks) );
  }, [tasks])

  // new tab button:
  // function openNewTabWithData(data) {
  //   const newTabUrl = chrome.extension.getURL(`newTab.html?data=${encodeURIComponent(data)}`);
    
  //   chrome.tabs.create({ url: newTabUrl });
  // }
  // function handleClick() {
  //   openNewTabWithData(tasks);
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const addTask = () => {
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
      task,
      completed : false, 
      time : new Date(Date.now()).toLocaleString('en-US' , options) 
    };
    setTasks([...tasks , newTask]);
    setTask({ name: '', description: '',date : moment().format('YYYY-MM-DD'), priority: 'low' });
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


  // Function to sort data by priority
  const sortDataByPriority = (data) => {
    return data.sort((a, b) => {
      if (a.task.priority === "high" && b.task.priority !== "high") return -1;
      if (b.task.priority === "high" && a.task.priority !== "high") return 1;
      if (a.task.priority === "medium" && b.task.priority === "low") return -1;
      if (b.task.priority === "medium" && a.task.priority === "low") return 1;
      return 0;
    });
  };

  // Sort the data by priority
  const storedTasks = sortDataByPriority(tasks);


  return (
    <Box mt={7}>
      
      <Grid container>
        <Grid item sm={6}>
        <Box
          mx={2}
        >
          <FormControl fullWidth>
            <TextField
              size='small'
              type='text'
              label="name" 
              name='name'
              placeholder='enter your task'
              margin='normal'
              value={task.name}
              onChange={handleInputChange}
            />
          
            <TextField
              size='small'
              type='text'
              name='description'
              label="description" 
              value={task.description}
              onChange={handleInputChange}
              placeholder='provide task description'
              margin='normal'
            />

            <Typography variant='body2' sx={{ mb : 0.5 , mt : 1 , ml : 1 , color : 'gray'}}>Shedule this task </Typography>
            <TextField
              size='small'
              type='date'
              name='date'
              // label="Date" 
              value={task.date }
              onChange={handleInputChange}
              placeholder='Shedule on Selected Date'
              // margin='normal'
            />

            
          {/* <br /> */}
          <FormLabel component="legend" sx={{ mt : 1}}>Set Priority</FormLabel>
          
          <Select labelId="demo-simple-select-label" label="age" name="priority" value={task.priority} onChange={handleInputChange} size='small'  >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          <br />
          
            <Button 
              variant='contained'
              size='small'
              onClick={addTask}
              sx={{ borderRadius : 0}}
            >Add</Button>
          </FormControl>

          <Box mt={4} textAlign='center'>
            <Typography variant='body2' sx={{ color : 'grey'}}>To get detail analysis of your daily tasks, Please click the below Button</Typography>
            <FormControl fullWidth sx={{ mt : 1}}>
              <Button 
                // variant='contained' 
                size='small' 
                color='success' 
                sx={{ borderRadius : 0}}
                // onClick={handleClick()}
                component={Link}
                to='/task_analysis'
                endIcon={<OpenInNewIcon />}
              >
                Click Here
              </Button>
            </FormControl>
          </Box>

      </Box>
        </Grid>
        <Grid item sm={6}>
        <Box
          mx={1}
        >
        <List sx={{ width : '100%' , bgcolor: 'background.paper'}}>

        { storedTasks.map((item) => {

          if(item.task.date === moment().format('YYYY-MM-DD')){

            return(
              <ListItem
            
            sx={{ borderRadius : 2 ,mt : 0.5}}
            className={
              item.task.priority === "low"
                ? "low-priority"
                : item.task.priority === "medium"
                ? "medium-priority"
                : "high-priority"
            }
            key={item.id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => deleteTask(item.id)} >
                  <DeleteIcon sx={{ color : 'black'}} />
                </IconButton>
              </>
            }
          >
            <ListItemIcon>
                {/* <WorkIcon  color='primary'/>  */}
                <Checkbox edge="end" color='secondary' checked={item.completed} onChange={() => completeTask(item.id)} disabled={tasks.disabled}/>
            </ListItemIcon>
            <ListItemText
              className={item.completed ? 'completed' : ''}
              primary={item.task.name}
              secondary={item.task.description}
            />
          </ListItem>
            );
          }
        })}
        </List>
      </Box>
        </Grid>
      </Grid>

    </Box>
  )
}
