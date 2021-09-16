import React, { useEffect, useState } from "react";
import PageHeader from '../PageHeader';
import {useStyles} from './styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Box,Button,Card,CardContent,Grid,Typography,} from "@material-ui/core";
import { blue,green, grey, orange, purple, red} from "@material-ui/core/colors";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
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
    const [customers,setCustomers]=useState(5);
    const [pendingOrders,setPendingOrders]=useState(20);
    const DisplayData = [
      {
        label: "Total Sales",
        value: "60000",
        icon: <ArrowDropUpIcon />,
        iconLabel: "",
      },
      {
        label: "Total Customers",
        value: customers,
        icon: <MoodIcon style={{ color: green[500],fontSize: 40  }} />,
        iconLabel: "",
      },
      {
        label: "Pending Orders",
        value: pendingOrders,
        icon: <MoodBadIcon style={{ color: red[500],fontSize: 40  }} />,
        iconLabel: "",
      },
    ];
  
    const GraphData = [
      {
        label: "Total Sales",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: blue[50],
        brColor: blue["A700"],
      },
      {
        label: "Total Customers",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: grey[50],
        brColor: grey["A400"],
      },
      {
        label: "Pending Orders",
        data: fakeArrayGenrator({ length: 10, digit: 100 }),
        bgColor: orange[50],
        brColor: orange["A700"],
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
      <Grid container spacing={1} className={classes.section} justify = "center">
        {DisplayData.map((item, i) => (
          <Grid key={i} item xs={6} sm={4} md={4}>
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
                              <CountUp end={item.value} duration={0}/>
                          </Typography>
                      );
                      case "Pending Orders":
                        return (
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              <CountUp end={item.value} duration={0}/>
                          </Typography>
                      );
                      case "Total Sales":
                        return(
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              <CountUp end={item.value} duration={0} prefix='LKR ' separator=',' decimals={2}/>
                          </Typography>
                      );
                      default: return null;
                    }
                  }).call(this)
            }
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