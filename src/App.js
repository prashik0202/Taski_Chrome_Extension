import './App.css';
import { Box  } from '@mui/material';
import Header from './Components/Header';

import Home from './pages/Home';
import Task from './pages/Task';
import Password from './pages/Password';
import ExpenseAnalysis from './pages/ExpenseAnalysis';
import Expenses from './pages/Expenses';
import TaskAnalysis from './pages/TaskAnalysis';
import { Routes , Route  } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Box>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />}/>    
          <Route path='/task' element={<Task />}/>    
          <Route path='/expense' element={<Expenses />}/>    
          <Route path='/password' element={<Password />}/> 
          <Route path='/task_analysis' element={<TaskAnalysis />}/> 
          <Route path='/expense_analysis' element={<ExpenseAnalysis />}/> 

        </Routes>
      </Box>
    </div>
  );
}

export default App;
