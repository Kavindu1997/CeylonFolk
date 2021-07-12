import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        height:'1000px',
        fontFamily:'Montserrat',
        position:'relative',
        color: 'white',
        padding: '100px',  
    },
    table: {
        // minWidth: 400,
        // backgroundColor:'#fafafa',
        fontFamily:'Montserrat',
        // alignItems:'center',
        width: '700px',
        marginLeft: '60px'
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
    margin: {
        margin: theme.spacing(2),
        width: '50ch',
        // marginRight: '50px'
      },
      avatar:{
        align:'left'
      },
      listItemText:{
        fontSize:'3.0em',//Insert your required size
        marginLeft:'20px',
      },
  }));

export default function OrderHistory() {
    const classes = useStyles();
    // const [value, setValue] = React.useState('payment');

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };
  
  function createData(ref, date, image, name, price, status, action) {
    return { ref, date, image, name, price, status, action };
  }
  
  const rows = [
    createData(1212, '12.06.2021',
      <div>
        <img height={100} align="center" src={require('../images/ts2.jpg').default}/>
      </div>,
      'Baby Tshirt',1000,'Printing'),
    createData(1213, '10.06.2021',
      <div>
        <img height={100} align="center" src={require('../images/ts3.jpg').default}/>
      </div>,
      'White Tshirt', 1300,'Dispatched'),
  ];
    return (
        <container>
            <CssBaseline />
            <Typography variant="h5" style={{marginTop:'80px',textAlign: 'center',backgroundColor:'#C6C6C6',padding:'30px',fontFamily:'Montserrat'}}> ORDER HISTORY</Typography>
            <center>
            <Grid container style={{marginTop:'50px',align:'center'}}>
            <Grid item xs={12} sm={12} md={4} lg={4}> 
                <div>
                    <Typography component="h1" variant="h6" style={{fontFamily:'Montserrat',textAlign:'center',fontWeight: 600}}>Hello </Typography>
                    <List style={{fontFamily:'Montserrat',fontWeight: 600}}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar style={{marginLeft:'130px'}}>TP</Avatar>
                            </ListItemAvatar>
                            <ListItemText><Typography component="h1" variant="h5" style={{fontFamily:'Montserrat',marginLeft:'15px',fontWeight: 600}}>Tanya Peries</Typography></ListItemText>
                        </ListItem>
                    </List>
                    <br />
                </div>
                <Divider />
                <div> 
                    <center>
                        <div>
                        <Link to="/profile" style={{textDecoration:'none'}}>
                            <Typography component="h1" variant="h6" style={{marginTop:'50px',marginLeft:'80px',fontFamily:'Montserrat',color:'black',textAlign:'left', marginBottom: '30px'}}>
                                My Account
                            </Typography>
                        </Link>
                        </div>
                        <div>
                        <Link to="/myOrders" style={{textDecoration:'none',hover:'red'}}>
                            <Typography component="h1" variant="h6" style={{marginLeft:'80px',fontFamily:'Montserrat',color:'black',textAlign:'left', marginBottom: '30px'}}>
                                Order History
                            </Typography>
                        </Link>
                        </div>
                        <div>
                        <Link to="/myWishlist" style={{textDecoration:'none'}}>
                            <Typography component="h1" variant="h6" style={{marginLeft:'80px',fontFamily:'Montserrat',color:'black',textAlign:'left', marginBottom: '30px'}}>
                                Wishlist
                            </Typography>
                        </Link>
                        </div>
                        <div>
                        <Link to="/auth" style={{textDecoration:'none'}}>
                            <Typography component="h1" variant="h6" style={{marginLeft:'80px',fontFamily:'Montserrat',color:'black',textAlign:'left', marginBottom: '30px'}}>
                                Logout
                            </Typography>
                        </Link>
                        </div>
                    </center>  
                </div>
                <Divider orientation="vertical" flexItem />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={12} md={8} lg={7}> 
            <TableContainer style={{marginTop:'30px'}}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="center" style={{ fontFamily:'Montserrat', fontWeight: 600}}>Reference No</TableCell>
                <TableCell align="center" style={{ fontFamily:'Montserrat', fontWeight: 600}}>Date</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat', fontWeight: 600}}>Image</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Product</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Total</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Order Status</TableCell>
              <TableCell align="center" style={{ fontFamily:'Montserrat',fontWeight: 600 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row,i) => (
              <TableRow key={`row-${i}`}>
                <TableCell align="center"  style={{ fontFamily:'Montserrat'}}>{row.ref}</TableCell>
                <TableCell align="center"  style={{ fontFamily:'Montserrat'}}>{row.date}</TableCell>
                <TableCell align="center"  style={{ fontFamily:'Montserrat'}}>{row.image}</TableCell>
                <TableCell align="center" style={{ fontFamily:'Montserrat'}}>{row.name}</TableCell>
                <TableCell align="center" style={{ fontFamily:'Montserrat'}}>{row.price}</TableCell>
                <TableCell align="center" style={{ fontFamily:'Montserrat'}}>{row.status}</TableCell>
                <TableCell align="center">
                  <Button>
                  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
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
      </div>     
            </Grid>  
            </Grid>
        </center>
    </container>
        
  );
}
