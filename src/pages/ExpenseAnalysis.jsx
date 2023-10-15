import { useEffect , useState } from "react";
import { Typography , Box , Grid } from "@mui/material";
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';

import NotVisible from "../Components/NotVisible";

function ExpenseAnalysis() {

  const [transactions, setTransactions] = useState([]);

  
  // FETCHING ALL THE TRANSACTIONS
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || []) ;
    setTransactions(storedTransactions);
    // console.log(transactions)
  }, []);

  // Calculate the total expense for each category
  const categoryTotals = {};

  transactions.forEach((expense) => {
    const category = expense.category ;
    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += expense.expenseType === 'debit' ? expense.amount : 0;
  });

  // Convert category totals to an array of objects
  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  // Define custom colors for the pie chart
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#f67280', '#c06c84'];


  // Create an object to track daily credit and debit totals
  const dailyTotals = {};

  transactions.forEach((expense) => {
    const date = expense.date; // Assuming date is in the "YYYY-MM-DD" format
    if (!dailyTotals[date]) {
      dailyTotals[date] = { date, debit: 0, credit: 0 };
    }

    if (expense.expenseType === 'debit') {
      dailyTotals[date].debit += expense.amount;
    } else if (expense.expenseType === 'credit') {
      dailyTotals[date].credit += expense.amount;
    }
  });

  // Convert daily totals object to an array of objects
  const data2 = Object.values(dailyTotals);

  if(transactions.length === 0){
    return (
      <NotVisible />
    );
  }
  return (
    <Box mt={15}>
      <Grid container>
        <Grid item sm={4}>
        <Box mx={0} px={2}>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={45}
            fill="#8884d8"
            label
          >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        </Box>
        </Grid>
        <Grid item sm={8}>
        <LineChart width={420} height={350} data={data2}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="debit" name="Debit" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="credit" name="Credit" stroke="#82ca9d" />
        </LineChart>
        </Grid>
      </Grid>
      
      <Box>
      
      </Box>
    </Box>
  )
}

export default ExpenseAnalysis
