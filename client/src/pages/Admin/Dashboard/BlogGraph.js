import { Card, CardContent,  Divider,  Grid, Paper, Typography, } from "@material-ui/core";
import { blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightGreen, lime, orange, pink, purple, red, teal, yellow } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { fakeArrayGenrator } from "./fakeDataGenerator";
import { lineGraphComponent } from "./GraphComponent";
import { useStyles } from "./styles";
  
  export default function BlogGraph() {
    const classes = useStyles();
    const [fetched, setFetched] = useState(false);
    const GraphData = [
      {
        id: "revenue_distribution",
        dataSets: [
          {
            label: "Revenue",
            data: fakeArrayGenrator({ length: 30, digit: 100 }),
            borderColor: blue["A400"],
            backgroundColor: "rgb(21 101 192 /50%)",
            fill: true,
            tension: 0.5,
          },
          {
            label: "Cost",
            data: fakeArrayGenrator({ length: 30, digit: 100 }),
            borderColor: red[500],
            backgroundColor: "rgb(198 40 30 /30%)",
            fill: true,
            tension: 0.5,
          },
          {
            label: "Profit",
            data: fakeArrayGenrator({ length: 30, digit: 100 }),
            borderColor: green[500],
            backgroundColor: "rgb(144 238 144 /30%)",
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
            data: fakeArrayGenrator({ length: 3, digit: 1000 }),
            borderColor: [lightGreen[50], lime[800], pink[500]],
            backgroundColor: [lightGreen["A400"], lime["A200"], pink[400]],
            fill: true,
            tension: 0.5,
          },
        ],
        xAxisLabels: ["New Orders", "Pending Orders", "Cancel Orders"],
      },
      {
        id: "sales_distribution",
        type: "bar",
        dataSets: [
          {
            label: "Sales",
            data: fakeArrayGenrator({ length: 12, digit: 100 }),
            borderColor: [lightGreen[50], lime[800], pink[500],yellow[500],deepOrange[500],brown[500],indigo[500],red[500],teal[500],green[500],cyan[500],grey[900]],
            backgroundColor: [lightGreen[50], lime[900], pink[800],yellow[500],deepOrange[500],brown[500],indigo[500],red[500],teal[500],green[500],cyan[500],grey[900]],
            fill: true,
            tension: 0.5,
          },
        ],
        xAxisLabels: ["January", "February", "March","April","May","June","July","August","September","October","November","December"],
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
      <Grid container className={classes.section} spacing={1}>
        <Grid item xs={12} sm={7} md={7}>
          <Card component={Paper}>
            <CardContent  style={{backgroundImage:'linear-gradient(to left, #34495e, #9b59b6, #f39c12)'}}>
              <Typography variant='h6' className={classes.cardTitle} align='left'>
                Revenue Distribution
              </Typography>
            </CardContent>
            <Divider />
            <CardContent>
              <canvas
                id='revenue_distribution'
                className={classes.generalGraph}></canvas>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={5} md={5}>
          <Card component={Paper}>
            <CardContent style={{backgroundImage:'linear-gradient(to left, #c0392b, #27ae60, #f39c12)'}}>
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

        <Grid item xs={12} sm={12} md={12} style={{marginTop:'20px'}}>
          <Card component={Paper}>
            <CardContent style={{backgroundImage:'linear-gradient(to left, #2f3542, #eccc68, #70a1ff)'}}>
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
      </Grid>
    );
  }