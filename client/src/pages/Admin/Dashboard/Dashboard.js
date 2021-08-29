import React, { useEffect, useState } from "react";
import PageHeader from '../PageHeader';
import {useStyles} from './styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Box,Button,Card,CardContent,Grid,Typography,} from "@material-ui/core";
import { blue, green, grey, lightBlue, red, teal } from "@material-ui/core/colors";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import GraphComponent from "./GraphComponent";
import BlogGraph from "./BlogGraph";
import { fakeArrayGenrator } from "./fakeDataGenerator";
import CountUp from 'react-countup'
import NumberFormat from 'react-number-format';
import Lottie from 'react-lottie';
import Stats from '../../../images/stats.json';


const Dashboard = () => {
    const classes = useStyles();
    const [hasFetched, setHasFetched] = useState(false);
    const DisplayData = [
      {
        label: "Total Profit",
        value: "50000",
        icon: <ArrowDropUpIcon />,
        iconLabel: "7%",
      },
      {
        label: "Total Revenue",
        value: "60000",
        icon: <ArrowDropUpIcon />,
        iconLabel: "5.3%",
      },
      {
        label: "Total Cost",
        value: "10000",
        icon: <ArrowDropDownIcon />,
        iconLabel: "4.1%",
      },
      {
        label: "Total Customers",
        value: "10",
        icon: <ArrowDropDownIcon />,
        iconLabel: "2.5%",
      },
    ];
  
    const GraphData = [
      {
        label: "Total Profit",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: green[50],
        brColor: green["A200"],
      },
      {
        label: "Total Revenue",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: blue[50],
        brColor: blue["A700"],
      },
      {
        label: "Total Cost",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: red[50],
        brColor: red["A400"],
      },
      {
        label: "Total Customers",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: grey[50],
        brColor: grey["A400"],
      },
    ];
  
    //updating the graph
    useEffect(() => {
      if (!hasFetched) {
        GraphData.map((item) =>
          GraphComponent({
            id: item.label,
            data: item.data,
            bgColor: item.bgColor,
            brColor: item.brColor,
          })
        );
        setHasFetched(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DisplayData]);


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Stats,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return (
        <>
        <main className={classes.content}>
              <PageHeader
                    title="DASHBOARD"
                    icon={< DashboardIcon fontSize="large" />}
                />
        <Lottie options={defaultOptions} height={150} width={150} style={{marginTop:'-150px',marginRight:'30px'}} />

     <Box mt={2}>
      <Grid container spacing={1} className={classes.section}>
        {DisplayData.map((item, i) => (
          <Grid key={i} item xs={6} sm={3} md={3}>
            <Card>
              <CardContent className={classes.displayCard}>
                <canvas
                  id={item.label}
                  className={classes.displayCardGraph}> 
                </canvas>
                <Box className={classes.cardDataContent}>
                  <Typography
                    variant='subtitle2'
                    className={classes.cardLabel}
                    gutterBottom={true}>
                    {item.label}
                  </Typography>

             {/* {(item.label==="Total Customers")?(
                  <Typography
                    variant='h4'
                    component='h2'
                    className={classes.cardHeader}>
                       <CountUp end={item.value} duration={3}/>
                  </Typography>
               ):(
                  <Typography
                    variant='h4'
                    component='h2'
                    className={classes.cardHeader}>
                       <CountUp end={item.value} duration={4} prefix='LKR ' separator=',' decimals={2}/>
                  </Typography>
               )
             } */}

            {
                  (() => {
                    switch (item.label) {
                      case "Total Customers":
                        return (
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              <CountUp end={item.value} duration={3}/>
                          </Typography>
                      );
                      case "Total Cost":
                        return(
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              <CountUp end={item.value} duration={3.5} prefix='LKR ' separator=',' decimals={2}/>
                          </Typography>
                      );
                      case "Total Revenue":
                        return(
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              <CountUp end={item.value} duration={4} prefix='LKR ' separator=',' decimals={2}/>
                          </Typography>
                      );
                        case "Total Profit":
                          return(
                            <Typography
                              variant='h4'
                              component='h2'
                              className={classes.cardHeader}>
                                <CountUp end={item.value} duration={4.5} prefix='LKR ' separator=',' decimals={2}/>
                            </Typography>
                        );
                      default: return null;
                    }
                  }).call(this)
            }
                  <Box className={classes.ratio}>
                    <Button
                      startIcon={item.icon}
                      size='small'
                      style={{
                        color: item.label[6] === "P" ? green[700] : red[400],
                        fontSize: "1.1rem",
                      }}>
                      {item.iconLabel}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <BlogGraph />
    </Box>
       </main>
       </>
    );
};

export default Dashboard;