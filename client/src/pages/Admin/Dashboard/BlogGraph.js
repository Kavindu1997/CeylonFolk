import { Card, CardContent,  Divider,  Grid, Paper, Typography, } from "@material-ui/core";
import { blue, brown, cyan, deepOrange, green, grey, indigo, lightGreen, lime, pink, red, teal, yellow } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { fakeArrayGenrator } from "./fakeDataGenerator";
import { lineGraphComponent } from "./GraphComponent";
import { useStyles } from "./styles";
import axios from 'axios';
  
  export default function BlogGraph() {
    const classes = useStyles();
    const [fetched, setFetched] = useState(false);
    const [pendingCount, setPendingCount] = useState(0);
    const [acceptCount, setAcceptCount] = useState(5);
    const [dispatchCount, setDispatchCount] = useState(0);
    const [cancelCount, setCancelCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:3001/order/getCount").then((response) => {
            console.log(response.data.pendingOrders);
            setPendingCount(response.data.pendingOrders);
            // setAcceptCount(response.data.acceptedOrders);
            // setDispatchCount(response.data.dispatchedOrders);
            // setCancelCount(response.data.rejectedOrders);
        });
    }, []);

const orders=[pendingCount,acceptCount,dispatchCount,cancelCount];

    const GraphData = [
      {
        id: "sales_distribution",
        dataSets: [
          {
            label: "Sales",
            data: fakeArrayGenrator({ length: 30, digit: 100 }),
            borderColor: blue["A400"],
            backgroundColor: "rgb(21 101 192 /50%)",
            fill: true,
            tension: 0.5,
          },
        ],
        xAxisLabels: ["week1", "week2", "week3", "week4", "week5"],
      },
      {
        id: "order_distribution",
        type: "pie",
        dataSets: [
          {
            label: "Orders",
            data:orders,
            borderColor: [lightGreen[50], lime[400], pink[500],cyan[400]],
            backgroundColor: [lightGreen["A400"], lime["A200"], pink[400],cyan[400]],
            fill: true,
            tension: 0.5,
          },
        ],
        xAxisLabels: ["Pending Orders", "Accept Orders", "Dispatch Orders","Cancel Orders"],
      },
    ];
  
    useEffect(() => {
      if (!fetched) {
        GraphData.map((item, i) =>
          lineGraphComponent({
            id: item.id,
            type: item.type,
            dataSets: item.dataSets,
            xAxisLabels: item.xAxisLabels,
          })
        );
      }
      setFetched(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetched]);
    return (
      <Grid container className={classes.section} spacing={1}  justify = "center">
        <Grid item xs={12} sm={7} md={7}>
          <Card component={Paper}>
            <CardContent  style={{backgroundColor:"#C6C6C6"}}>
              <Typography variant='h6' className={classes.cardTitle} align='left'>
                Sales Distribution
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <canvas
                id='sales_distribution'
                className={classes.generalGraph}></canvas>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <Card component={Paper}>
            <CardContent style={{backgroundColor:"#C6C6C6"}}>
              <Typography variant='h6' className={classes.cardTitle} align='left'>
                 Order Distribution
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <canvas
                id='order_distribution'
                className={classes.generalGraph}></canvas>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    );
  }