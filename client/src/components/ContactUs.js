import React from 'react';
import { makeStyles,IconButton,Typography,Box,Paper,Grid,Divider } from '@material-ui/core';
import Controls from './Reusable/Controls';
import {useForm,Form} from './Reusable/useForm';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import StreetviewIcon from '@material-ui/icons/Streetview';

const useStyles = makeStyles((theme) => ({
  infoContent:{
    backgroundColor:'#f5f6fa',
    textAlign:'center',
    padding:theme.spacing(5), 
    '& .MuiTypography-h5':{
      fontFamily:'Segoe UI',
    },
    '& .MuiIconButton-root':{
      color:'#1e272e',
    },
    '& .MuiTypography-subtitle1':{
      fontFamily:'Nunito',
      color:'#596275'
    },
  },
  headStyle:{
    fontFamily:'Nunito',
    color:'#222f3e',
    textAlign:'center',
    fontSize:'2.5rem',
    '&:hover':{
      color:'#48dbfb'
    }
  },
  textStyle:{
    fontFamily:'Segoe UI',
    color:'#2C2D2D',
  },
  pageContent:{
    margin:theme.spacing(10),
    padding:theme.spacing(3),
},
}));

export default function ConatactUs() {
  const classes = useStyles();
 
  return (
    <Paper className={classes.pageContent}>
        <Typography component="h1" variant="h5" className={classes.headStyle}>
            Get in Touch
           </Typography>
           <Divider variant="middle" />
         <Grid container style={{marginTop:'20px'}}>
           <Grid item md={6}>
           <Typography component="h1" variant="subtitle2" className={classes.textStyle}>
                Please contact us using one of the option below. <br/>You will recieve a response within 24 hours by email.
           </Typography>
       
                  <Form>
                    <Controls.Input
                            variant="outlined"
                            margin="normal"
                            required
                            label="Your Name"
                            name="fullName"
                        
                        />
                    <Controls.Input
                            variant="outlined"
                            margin="normal"
                            label="Contact Number"
                            name="mobile"
                   
                        />
                    <Controls.Input
                            variant="outlined"
                            margin="normal"
                            required
                            label="Email Address"
                            name="email"
                           
                        />
                    <Controls.Input
                            variant="outlined"
                            margin="normal"
                            required
                            label="Message"
                            name="message"
                            multiline
                            rows={4}
                        />
                     <Box style={{marginLeft:'120px'}}>
                     <Controls.Button
                            type="submit"
                            text="Send Message"
                             / >
                      </Box>
                  </Form>                         
                   
                  
           </Grid>
           <Grid item md={6} className={classes.infoContent}>
                  <Typography component="h1" variant="h5" gutterBottom>
                    <IconButton><BusinessIcon fontSize="large"/></IconButton>
                        Company Information
                  </Typography>
                          <Typography component="div" variant="subtitle1" gutterBottom>
                          ·  Clothing (brand) · Design & fashion · Screen Printing & Embroidery
                          </Typography>

                  <Typography component="h1" variant="h5" gutterBottom>
                    <IconButton><PhoneInTalkIcon fontSize="large"/></IconButton>
                        Customer Care Hotline
                  </Typography>
                          <Typography component="div" variant="subtitle1" gutterBottom>
                              +94 71 461 1122
                          </Typography>
                          
                  <Typography component="h1" variant="h5" gutterBottom>
                    <IconButton><StreetviewIcon fontSize="large"/></IconButton>
                        CeylonFolk, Kaduwela
                  </Typography>
                          <Typography component="div" variant="subtitle1" gutterBottom>
                              328 Kaduwela Rd, Colombo 10115, Sri Lanka<br/>
                              +94 71 461 1122<br/>
                              ceylonfolk@gmail.com
                          </Typography>
           </Grid>
         </Grid>
    </Paper>
  
  );
}


   
   