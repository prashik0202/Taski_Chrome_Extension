import React from 'react'
import { Box , Typography, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TaskAnalysis() {

    const [ tasks , setTasks ] = React.useState([]);

    // const navigate = useNavigate();
    React.useEffect(() => {
        // Load tasks from local storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        setTasks(storedTasks);
    }, []);


    // grouping task based on their priority:
    const groupedData = {
        high : [],
        medium : [],
        low : [],
    };

    tasks.forEach((task) => {
        groupedData[task.task.priority].push(task);
    })

    // counting completed and remaining tasks:
    const countCompletedAndRemaining = (taskArray) => {
        const completed = taskArray.filter((task) => task.completed).length;
        const remaining = taskArray.length - completed;
        return { completed , remaining };
    }

    const priorityData = Object.keys(groupedData).map((priority) => ({
        priority,
        ...countCompletedAndRemaining(groupedData[priority]),
    }));

    return (
        <Box mt={10}>
            <Box width={600} sx={{ mx : 'auto'}}>
            <BarChart width={600} height={400} data={priorityData} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#8884d8" name="Completed Tasks" />
                <Bar dataKey="remaining" fill="#82ca9d" name="Remaining Tasks" />
            </BarChart>
            </Box>
        </Box>  
    )
}
