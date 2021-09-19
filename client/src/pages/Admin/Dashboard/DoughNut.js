import React,{useEffect,useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { useStyles } from "./styles";
import { Card, CardContent,  Divider,  Grid, Paper, Typography, } from "@material-ui/core";
import { blue,green, purple, red, yellow } from "@material-ui/core/colors";

const DoughNut = () => {
    const classes=useStyles();
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptCount, setAcceptCount] = useState(0);
    const [printedCount, setPrintedCount] = useState(0);
    const [dispatchCount, setDispatchCount] = useState(0);
    const [rejectCount, setRejectCount] = useState(0);
    

    useEffect(() => {
        axios.get("http://localhost:3001/order/getCustomizeCount").then((response) => {
            setPendingCount(response.data.pendingOrders);
            setAcceptCount(response.data.acceptedOrders);
            setPrintedCount(response.data.printedOrders);
            setDispatchCount(response.data.dispatchedOrders);
            setRejectCount(response.data.rejectedOrders);
        });
    }, []);

const customize_orders=[pendingCount,acceptCount,printedCount,dispatchCount,rejectCount];



    return (
        <Grid container className={classes.section} spacing={1}  justify = "center">
        
        <Grid item xs={12} sm={8} md={8}>
          <Card component={Paper}>
            <CardContent style={{backgroundColor:"#C6C6C6"}}>
              <Typography variant='h6' className={classes.cardTitle} align='left'>
                Customized Order Distribution
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
            <div>
                <Doughnut
                  data={{
                    labels: ['Pending Orders', 'Accepted Orders','Printed Orders', 'Dispatched Orders', 'Rejected Orders'],
                    datasets: [
                      {
                        label: 'Customized Order Distribution',
                        data:customize_orders,
                        backgroundColor: [yellow["A200"],green["A400"],purple[400], blue["A200"],red[400]],
                        borderColor:[yellow[400],green[50],purple[50],blue[500],red[400]],
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

export default DoughNut;