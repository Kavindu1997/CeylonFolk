import React from 'react';
import {Typography,IconButton,Box,Button,Container,Grid,Card,CardActionArea,CardActions,CardContent,CardMedia} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import UsersImg from '../images/users.jpg';
import OrdersImg from '../images/orders.jpg';
import InventoryImg from '../images/inventory.jpg';

const useStyles=makeStyles((theme)=>({
   
    collectionContainer:{
        paddingTop:'100px'
    },
    collectionTitle:{
        fontWeight:'800',
        paddingBottom:'24px',
        textAlign:'center',
        fontFamily:'Nunito'
    },
    card:{
        maxWidth:'95%'
        
    },
    media:{
        height:'240px'  
    },
    gridContainer:{
        width: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'borderBox'
       
    }

}));
const AdminPanel = () => {
    const classes=useStyles();
    return (
        <div>
              <Container className={classes.collectionContainer} maxWidth="lg">
                <Typography variant="h4" className={classes.collectionTitle}>Control Panel</Typography>
         
            <Grid container spacing={0}>
                <Grid item xs={12} sm={6} md={4}>
                         <Card className={classes.card}>
                            <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    style={{ backgroundImage:`url(${ UsersImg})`}}
                                    title="Users"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                            Users
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                               
                                </CardActions>
                         </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                        <CardMedia
                                        className={classes.media}
                                        style={{ backgroundImage:`url(${OrdersImg})`}}
                                        title="Inventory"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                                Inventory
                                            </Typography>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                        
                                </CardActions>
                            </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                        <CardMedia
                                        className={classes.media}
                                        style={{ backgroundImage:`url(${InventoryImg})`}}
                                        title="Orders"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
                                                 Orders
                                            </Typography>
                                        </CardContent>
                                </CardActionArea>
                                <CardActions>
                                                    
                                </CardActions>
                            </Card>
                </Grid>
            </Grid>
            </Container>
        </div>
    );
};

export default AdminPanel;