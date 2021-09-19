import React, { useEffect, useState } from "react";
import PageHeader from '../PageHeader';
import {useStyles} from './styles';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Box,Button,Card,CardContent,Grid,Typography,ButtonGroup} from "@material-ui/core";
import { blue,green, grey, orange, purple, red} from "@material-ui/core/colors";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import GraphComponent from "./GraphComponent";
import { fakeArrayGenrator } from "./fakeDataGenerator";
import Lottie from 'react-lottie';
import Stats from '../../../images/stats.json';
import axios from "axios";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import DoughNut from "./DoughNut";
import LineChartCustomize from "./LineChartCustomize";

const Dashboard = () => {
    const classes = useStyles();
    const [hasFetched, setHasFetched] = useState(false);
    const [customers,setCustomers]=useState(0);
    const [pendingOrders,setPendingOrders]=useState(0);
    const [sales,setSales]=useState(0);
    const [component, setComponent] = useState('inhouse')

    useEffect(() => {
      axios.get("http://localhost:3001/auth/getCount").then((response) => {
          setCustomers(response.data[0].customer_count);
          
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/order/getALLPendingCount").then((response) => {
        console.log(response.data[0].sum_of_pendings);
        setPendingOrders(response.data[0].sum_of_pendings);
    });
}, []);


useEffect(() => {
  axios.get("http://localhost:3001/order/getSales").then((response) => {
      console.log(response.data);
      setSales(response.data[0].sales_amount);
  });
}, []);



    const DisplayData = [
      {
        label: "Total Sales",
        value: sales,
        icon: <TrendingUpIcon style={{ color:  blue["A400"],fontSize: 40  }}/>,
        iconLabel: "",
      },
      {
        label: "Total Customers",
        value:customers,
        icon: <AccessibilityNewIcon style={{ color:  grey["A400"],fontSize: 40  }} />,
        iconLabel: "",
      },
      {
        label: "Pending Orders",
        value: pendingOrders,
        icon: <MoodBadIcon style={{ color: orange[500],fontSize: 40  }} />,
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


            {
                  (() => {
                    switch (item.label) {
                      case "Total Customers":
                        return (
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              {item.value}
                          </Typography>
                      );
                      case "Pending Orders":
                        return (
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              {item.value}
                          </Typography>
                      );
                      case "Total Sales":
                        return(
                          <Typography
                            variant='h4'
                            component='h2'
                            className={classes.cardHeader}>
                              {(item.value).toLocaleString('en-US', {
                                 style: 'currency',
                                 currency: 'LKR',
                                 })}
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
                        >
                      </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <DoughNut/>
      <PieChart />
            <ButtonGroup variant="contained" aria-label="outlined primary button group" style={{ marginLeft: "500px",marginTop:"50px"}}>
                      <Button  onClick={() => setComponent('customize')}>Customized Sales</Button>
                      <Button onClick={() => setComponent('inhouse')}>Inhouse Sales</Button>
            </ButtonGroup>
            {(component==="inhouse")?(
                    <LineChart/>
               ):(
                 <LineChartCustomize/>
               )
             } 
    </Box>
       </main>
       </>
    );
};

export default Dashboard;