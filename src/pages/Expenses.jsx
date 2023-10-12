import React, { useState , useEffect } from 'react'

import { 
  Typography , Box , TextField , FormControl, IconButton ,Button, Grid , Select , MenuItem, InputLabel
} from '@mui/material'
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
  const [expenseType , setExpenseType ] = useState('');

  const [ totalCredit , setTotalCredit ] = useState(0);
  const [ totalDebit , setTotalDebit ] = useState(0);

  const [ spendingWarning , setSpendingWarning] = useState('');

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addExpense = () => {
    if (expense && amount) {
      const newTransaction = { expense, amount: parseFloat(amount) , expenseType };
      setTransactions([...transactions, newTransaction]);
      setExpense('');
      setAmount('');
      setExpenseType('');
    }
  };

  const deleteExpense = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  // const totalExpense = transactions.reduce((total, transaction) => total + transaction.amount, 0);

  useEffect(() => {
    const calculateDebitTotal = transactions.reduce((total, transaction) => {
      if(transaction.expenseType === 'debit'){
        return total + transaction.amount
      }
      return total;
    }, 0)

    const calculateCreditTotal = transactions.reduce((total, transaction) => {
      if(transaction.expenseType === 'credit'){
        return total + transaction.amount
      }
      return total;
    }, 0)

    setTotalCredit(calculateCreditTotal);
    setTotalDebit(calculateDebitTotal);

    if(totalCredit - totalDebit < 0){ 
      setSpendingWarning('You are over spending');
    }else{
      setSpendingWarning('')
    }

  }, [transactions , totalCredit , totalDebit]);

  return (
      <Box mt={3}>
        <Grid container>
          <Grid item sm={6}>
            <Box
              mt={6}
              mx={2}
            >
          <FormControl fullWidth>
            <TextField
              type='text'
              label="Name" 
              margin='normal'
              size='small'
              placeholder='Add Transaction'
              value={expense}
              onChange={(e) => setExpense(e.target.value)} 
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              type='number'
              label="Amount" 
              margin='normal'
              size='small'
              placeholder='Add Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
              required
            />
          </FormControl>

          <FormControl fullWidth size='small' margin='normal'>
          <InputLabel id="demo-select-small-label">Select</InputLabel>
            <Select
              labelId="demo-select-small-label"
              value={expenseType}
              label="Select"
              onChange={(e) => setExpenseType(e.target.value)}
              required
            >
              <MenuItem value='credit' >Credit</MenuItem>
              <MenuItem value='debit' >Debit</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <Button
              variant='contained'
              size='small'
              onClick={addExpense}
              sx={{ borderRadius : 0 , mt : 1}}
            >
              Add
            </Button>
          </FormControl>
        </Box>
            <Box
              mt={4}
              p={1}
              mx={2}
              sx={{ color : '#039be5' , borderRadius : '15px'}}
              textAlign='center'
            >
              <Typography variant='body1'>Amount Credited: &#x20b9;{totalCredit}</Typography>
              <Typography variant='body1'>Amount Debited: &#x20b9;{totalDebit}</Typography>
              <Typography variant='body1'>
                Balance: &#x20b9;{ totalCredit - totalDebit}
              </Typography>

              
              
            </Box>


          { spendingWarning && (
            <Box
              mt={1}
              p={1.5}
              mx={2}
              sx={{ color : '#039be5' , backgroundColor : '#ffcdd2', borderRadius : '15px'}}
            >
              <Typography variant='body1' color='red'>{spendingWarning}</Typography>  
            </Box>
          )}
            
          </Grid>
          <Grid item sm={6}>
          <Box
        mt={4}
        mx={2}
      >
        <List sx={{ width : '100%' }}>

          {transactions.map((transaction, index) => (
              <ListItem
                sx={{ my : 1 , 'borderRadius' : '10px'}}
                className={ transaction.expenseType === 'credit'?  'credit_color' : 'debit_color' }
                key={index}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => deleteExpense(index)}>
                      <DeleteIcon color='black'   />
                    </IconButton>
                  </>
                }
              >
                <ListItemAvatar>
                    <CurrencyRupeeIcon  color={transaction.expenseType === 'credit' ? 'success' : 'error'} /> 
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
          </Grid>
        </Grid>
      </Box>
  );
}

