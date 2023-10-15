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
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';

import moment from 'moment';

export default function Expenses() {

  {/* ALL STATES VARIABLES*/}
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseType , setExpenseType ] = useState('');
  const [category , setCategory ] = useState('');
  const [ totalCredit , setTotalCredit ] = useState(0);
  const [ totalDebit , setTotalDebit ] = useState(0);
  const [ spendingWarning , setSpendingWarning] = useState('');


  // FETCHING ALL THE TRANSACTIONS
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  // 
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addExpense = () => {
    if (expense && amount && expenseType ) {
      const newTransaction = { expense, amount: parseFloat(amount) , expenseType, category , date : moment().format('YYYY-MM-DD') };
      setTransactions([...transactions, newTransaction]);
      setExpense('');
      setAmount('');
      setExpenseType('');
      setCategory('');
    }else {
      alert('Please Enter all fields');
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

    if(totalCredit - totalDebit < 0 && calculateCreditTotal > 0){ 
      setSpendingWarning('You are over spending');
    }else{
      setSpendingWarning('')
    }

  }, [transactions , totalCredit , totalDebit]);

  return (
      <Box mt={2}>
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
              margin='dense'
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
              margin='dense'
              size='small'
              placeholder='Add Amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)} 
              required
            />
          </FormControl>

          <FormControl fullWidth size='small' margin='dense'>
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

          <FormControl fullWidth size='small' margin='dense'>
          <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={expenseType === 'debit' ? false : true}
            > 
              <MenuItem value='housing' >Housing</MenuItem>
              <MenuItem value='transportation' >Transportation</MenuItem>
              <MenuItem value='food' >Food</MenuItem>
              <MenuItem value='health' >Health</MenuItem>
              <MenuItem value='entertainment' >Entertainment</MenuItem>
              <MenuItem value='personal' >Personal</MenuItem>
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
            mt={1}
            p={1}
            mx={1}
            sx={{ 
              borderRadius : '15px',
              display : 'flex', flexWrap : 'wrap' , justifyContent : 'space-around'
            }}
          >

            <Box width='33%' sx={{ p : 1 , backgroundColor : '#e8f5e9', borderRadius : '10px'}} >
              <Typography variant='body2'>Credited</Typography>
              <Typography variant='h6' color='#1b5e20'> &#x20b9;{totalCredit}</Typography>
            </Box>
            <Box width='33%' sx={{ p : 1 ,  backgroundColor : '#ffebee', borderRadius : '10px'}}>
              <Typography variant='body2'>Debited</Typography>
              <Typography variant='h6' color='#b71c1c'>&#x20b9;{totalDebit}</Typography>
            </Box>
            <Box width='33%' sx={{ p : 1 ,  backgroundColor : '#e1f5fe', borderRadius : '10px'}}>
              <Typography variant='body2'>Balance</Typography>
              <Typography variant='h6'color='#01579b'> &#x20b9;{ totalCredit - totalDebit}</Typography>
            </Box>
            
            
          </Box>


          <Box mt={0} mx={2} textAlign='center'>
            {/* <Typography variant='body2' color='gray'>To get Analysis of your Expensses here below</Typography> */}
            <FormControl fullWidth>
              <Button
                // variant='outlined'
                size='small'
                sx={{ borderRadius : 0 , mt : 1}}
                color='success'
                component={Link}
                to='/expense_analysis'  
                endIcon={<OpenInNewIcon />}
              >
                Analyze your expenses
              </Button>
            </FormControl>
          </Box>

          { spendingWarning && (
            <Box
              mt={1}
              p={0}
              mx={1}
              sx={{ color : '#212121' , backgroundColor : '#ffcdd2', borderRadius : '15px',
                display: 'flex' , justifyContent : 'space-between'
              }}

            >
              <Typography variant='body1' sx={{ my : 1 , mx : 1}}>{spendingWarning}</Typography>
              <IconButton onClick={() => setSpendingWarning('')}><CloseIcon /></IconButton> 
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

