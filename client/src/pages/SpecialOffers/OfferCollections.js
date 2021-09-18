import React, { useEffect, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import CommonNav from "../../components/Navbars/CommonNav";
import Footer from "../../components/Footer/Footer";
// import Product_grid from '../components/Product_grid/Product_grid';

// import { DropDown } from '../components/Product_grid/DropDown';

import {
    IconButton,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Image from "../../images/cover6.jpg";
import Collection1 from "../../images/ts1.jpg";
import Collection2 from "../../images/ts2.jpg";
import Collection3 from "../../images/ts3.jpg";
import Collection4 from "../../images/ts4.jpg";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import axios from "axios";
import { useHistory } from "react-router";
import useStyles1 from "./style1";
import {
    setProducts,
    fetchProducts,
    actionAddToWishlist,
} from "../../_actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Reusable/Notification";
import ceylonforkapi from "../../api/index";
import { useParams } from 'react-router';

const collection_offer_id = localStorage.getItem("collection_offer_id");
console.log(collection_offer_id);


const OfferCollections = () => {
    const classes = useStyles1();
    const [checked, setChecked] = useState(false);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });

    const [Collection, setCollection] = useState("");
    const [Colour, setColour] = useState("");
    const [Type, setType] = useState("");
    const [Size, setSize] = useState("");
    var [products, setRecord] = useState([]);
    const [rate, setrate] = useState();
    const [listOfOffers, setListOfOffers] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:3001/shop/alloffers").then((response) => {
            console.log(response.data);
            setListOfOffers(response.data);
        });

        
    }, []);


    let history = useHistory();

    return (
        <div>
            <CssBaseline />
            <CommonNav />
            <div>
                <center>
                    <Typography variant="h4" className={classes.collectionTitle}>
                        SPECIAL OFFERS
                    </Typography>
                </center>

                <Container className={classes.collectionContainer} maxWidth="lg">
                <Grid container spacing={0}>
                        {listOfOffers.map((value) => {
                            return (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Card className={classes.card} >

                                        <CardActionArea>



                                            <CardMedia>

                                                <img align="center" src={'http://localhost:3001/' + value.coverImage} alt="" style={{ width: '100%' }}

                                                    onClick={() => {
                                                        history.push(`/specialOffers/${value.id}`);

                                                    }}


                                                ></img>
                                            </CardMedia>
                                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                                <div>
                                                    <Typography gutterBottom variant="h5" component="h5" style={{ textAlign: 'left', fontSize: '18px' }} className={classes.productTitle}>
                                                        {value.collection_name}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography gutterBottom variant="h5" component="h2" style={{ marginLeft: '10px', paddingLeft: '10px', background: '#31c5ee' }} className={classes.offer}>
                                                        {value.rate}%
                                                    </Typography>

                                                </div>



                                            </CardContent>



                                        </CardActionArea>

                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </div>
            <Footer />
            <Notification notify={notify} setNotify={setNotify} />
        </div>



    );
};

export default OfferCollections;
