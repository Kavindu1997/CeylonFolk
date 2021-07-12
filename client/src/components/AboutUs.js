import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NumericInput from 'react-numeric-input';
import 'font-awesome/css/font-awesome.min.css';
import TextField from '@material-ui/core/TextField';
import {Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) =>({
    table: {
      minWidth: 400,
      backgroundColor:'#fafafa',
      fontFamily:'Montserrat'
    },
    spreadBox: {
        justifyContent: "space-around",
        alignItems: "center",
      },
      box: {
        height: 100,
        display: "flex",
        padding: 8
      },
      back: {
        marginTop: 30,
        alignItems:"center",
        // marginLeft: 600,
      },
      submit: {
        marginTop: 30,
        alignItems:"center",
        // marginLeft: 600,
      },
      image: {
        marginTop: '30px',
        // minHeight:'100vh',
        height:'500px',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },
    subsubText:{
        display: 'block',
        fontSize: '16px',
        // marginBottom: '1.2rem',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        fontWeight: '300',
        textAlign: 'flex'
    },
     
  }));
  
  export default function AboutUs() {
    
    const classes = useStyles();
    
    return (
      <container>
        <center>
            <Typography variant="h5" style={{marginTop:'80px',textAlign: 'center',backgroundColor:'#C6C6C6',padding:'30px',fontFamily:'Montserrat'}}>ABOUT</Typography>
            <Grid container>
            <Grid item xs={12}>
            <div>
                <img src={require('../images/cover4.jpg').default} className={classes.image}/>
            </div>
            <div>
            <Typography variant="h5" style={{marginTop:'50px',textAlign: 'center',fontFamily:'Montserrat'}}>COMPANY PROFILE</Typography>
            <Typography className={classes.subText} style={{marginTop:'20px',marginLeft:'90px',marginRight:'95px',fontFamily:'Montserrat',textAlign:'cebter'}}>
                Ceylonfolk a young and vibrant company founded by Pasan Ranatunga a graduate of UCSC, University of Colombo was live from 11th October 2019. The founder 
                himself was motivated by the idea that everyone should be able to express themselves wearing what they truly love. armed with the mission Ceylonfolk was 
                created, making it a platform for the Sri Lankan customers to get t-shirts printed with what they actually adore. The company's line of business includes the retail and 
                wholesale customized t-shirts whereas the main product line comprises crew neck t-shirts and hoodies. The crew uses three printing techniques as in heat transfer method,
                screen printing method, and embroidery service to customerize t-shirts according to the need of the customer. Last but not least Ceylonfolk is a combination of best service, quality
                products and reasonable price. Delighted customers are the company's utmost wealth.
            </Typography>
            </div>
            {/* <div>
            <Typography variant="h5" style={{marginTop:'50px',textAlign: 'center',fontFamily:'Montserrat'}}>OUR MISSION</Typography>
            <Typography className={classes.subText} style={{marginTop:'20px',marginLeft:'90px',marginRight:'95px',fontFamily:'Montserrat',textAlign:'justify'}}>Get featured in your "favourite obsession" Wear Ceylonfolk 
            #ceylonfolk #customtshirts #fashion #tshirts #customizedtshirts  #customtees #customtshirts #tshirts 
            #smallbusiness #apparel  #shoplocal #supportsmallbusiness #madeinsrilanka #customizedtshirt</Typography>
            </div> */}
            </Grid>
            </Grid>
      {/* <TableContainer component={Paper} style={{marginTop:'30px',align:'center',width:'1200px'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontFamily:'Montserrat', fontWeight: 600}}>Image</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Product Name</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Unit Price</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Stock Status</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <TableRow key={`row-${i}`}>
                <TableCell align="center"  style={{ fontFamily:'Montserrat'}}>{row.image}</TableCell>
                <TableCell align="center" style={{ fontFamily:'Montserrat'}}>{row.name}</TableCell>
                <TableCell align="center" style={{ fontFamily:'Montserrat'}}>{row.price}</TableCell>
                <TableCell align="center" style={{ fontFamily:'Montserrat'}}>{row.status}</TableCell>
                <TableCell align="center">
                  <Button>
                    <i class="fa fa-times" aria-hidden="true"></i> 
                  </Button>
                  <Button>
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
      <Box
        component="span"
        m={1}
        className={`${classes.spreadBox} ${classes.box}`}
        >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.back}
      >Continue Shopping
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >Proceed to Checkout
      </Button>
      </Box>
      </div> */}
      </center>
      </container>
        
    );
  }