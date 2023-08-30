import React, { useState , useEffect } from 'react'

import { Typography , Box , TextField , FormControl, IconButton ,Button, Checkbox} from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function Expenses() {
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addExpense = () => {
    if (expense && amount) {
      const newTransaction = { expense, amount: parseFloat(amount) };
      setTransactions([...transactions, newTransaction]);
      setExpense('');
      setAmount('');
    }
  };

  const deleteExpense = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const totalExpense = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  return (
      <Box>
        <Box
          mt={6}
          mx={2}
        >
        {/* <FormControl fullWidth> */}
          <TextField
            type='text'
            label="Name" 
            margin='normal'
            placeholder='Add Transaction'
            value={expense}
            onChange={(e) => setExpense(e.target.value)} 
          />
          <TextField
            type='number'
            label="Amount" 
            margin='normal'
            placeholder='Add Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)} 
          />
        {/* </FormControl> */}
        <FormControl fullWidth>
          <Button
            variant='contained'
            size='large'
            onClick={addExpense}
            sx={{ borderRadius : 0}}
          >
            Add
          </Button>
        </FormControl>
      </Box>

      <Box
        mt={1}
        p={1}
        mx={2}
        sx={{ backgroundColor : '#e0e0e0' , color : 'green'}}
        textAlign='center'
      >
        <Typography variant='h6'>Total Expense: &#x20b9;{totalExpense.toFixed(2)}</Typography>
      </Box>

      <Box
        mt={1}
        mx={2}
      >
          <List sx={{ width : '100%' , bgcolor: 'background.paper'}}>

          {transactions.map((transaction, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <>
                    <IconButton edge="end" >
                      <DeleteIcon color='error' onClick={() => deleteExpense(index)} />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                    <CurrencyRupeeIcon  color='success'/> 
                </ListItemAvatar>
                <ListItemText
                  // className={item.completed ? 'completed' : ''}
                  primary={transaction.expense }
                  secondary={`${transaction.amount}Rs`}
                />
              </ListItem>
            ))}
            </List>
      </Box>


      </Box>
  );
}

