import React,{useEffect,useState} from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useStyles } from "./styles";
import { Card, CardContent,  Divider,  Grid, Paper, Typography, } from "@material-ui/core";
import { blue, brown, cyan, deepOrange, green, grey, indigo, lightGreen, lime, pink, red, teal, yellow } from "@material-ui/core/colors";

const PieChart = () => {
    const classes=useStyles();
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptCount, setAcceptCount] = useState(0);
    const [dispatchCount, setDispatchCount] = useState(0);
    const [cancelCount, setCancelCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001/order/getCount").then((response) => {
            console.log(response.data.pendingOrders);
            setPendingCount(response.data.pendingOrders);
            setAcceptCount(response.data.acceptedOrders);
            setDispatchCount(response.data.dispatchedOrders);
            setCancelCount(response.data.rejectedOrders);
        });
    }, []);

const orders=[pendingCount,acceptCount,dispatchCount,cancelCount];

    return (
<Grid container className={classes.section} spacing={1}  justify = "center">

<Grid item xs={12} sm={8} md={8}>
  <Card component={Paper}>
    <CardContent style={{backgroundColor:"#C6C6C6"}}>
      <Typography variant='h6' className={classes.cardTitle} align='left'>
         Inhouse Order Distribution
      </Typography>
    </CardContent>
    <Divider />
    <CardContent>
    <div>
        <Pie
          data={{
            labels: ['Pending Orders', 'Accept Orders', 'Dispatch Orders', 'Cancel Orders'],
            datasets: [
              {
                label: 'Inhouse Order Distribution',
                data: orders,
                backgroundColor: [yellow["A200"],green["A400"], blue["A200"],red[400]],
                borderColor:[yellow[400],green[50],blue[500],red[400]],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 25,
              },
            },
          }}
        />
      </div>

    </CardContent>
  </Card>
</Grid>
</Grid>
    );
};

export default PieChart;