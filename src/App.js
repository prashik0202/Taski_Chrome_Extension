import './App.css';
import { Box  } from '@mui/material';
import Header from './Components/Header';
import Home from './pages/Home';
import Task from './pages/Task';
import Password from './pages/Password';
import Reminder from './pages/Reminder';
import Expenses from './pages/Expenses';
import { Routes , Route  } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Box>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />}/>    
          <Route path='/task' element={<Task />}/>    
          <Route path='/reminder' element={<Reminder />}/>    
          <Route path='/expense' element={<Expenses />}/>    
          <Route path='/password' element={<Password />}/>    
        </Routes>
      </Box>
    </div>
  );
}

export default App;
