import React, { useEffect, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import CommonNav from "../../components/Navbars/CommonNav";
import Footer from "../../components/Footer/Footer";
import {
    IconButton,
    Typography,
    Button,
    Container,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
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


const Shop = () => {

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

    const check = 1;

    const onCollection = (e) => {
        setCollection(e.target.value);
    };
    const onColour = (e) => {
        setColour(e.target.value);
    };
    const onType = (e) => {
        setType(e.target.value);
    };
    const onSize = (e) => {
        setSize(e.target.value);
    };

    // const products = useSelector((state) => state.productReducer.productObject)

    const dispatch = useDispatch();

    // const fetchProducts = async () =>{
    //     axios.get('http://localhost:3001/shop').then((response) => {
    //       // setProductObject(response.data);
    //       console.log(response.data[0])
    //       console.log('hello from response from server')
    //       dispatch(setProducts(response.data))
    //     });

    //   }



    useEffect(() => {
        dispatch(fetchProducts());
        setChecked(true);
    }, []);

    

    const [listOfDesigns, setListOfDesigns] = useState([]);

    // useEffect(() => {
    //     axios.get("http://localhost:3001/shop").then((response) => {
    //         setListOfDesigns(response.data);
    //     });
    // }, []);

    let history = useHistory();

    function addToWishlist(id, isInWishList) {
        console.log(isInWishList)
        const uid = localStorage.getItem("userId");
        if (localStorage.getItem("userId") != "0") {
            const data = {
                uid: uid,
                id: id,
                Collection: Collection,
                Colour: Colour,
                Type: Type,
                Size: Size,
            };
            console.log(data)
            if (isInWishList == 1) {
                setNotify({
                    isOpen: true,
                    message: "This product is already in your wishlist !",
                    type: "error",
                });
            } else {
                ceylonforkapi
                    .post("/ProductDetails/addwishlist/", data)
                    .then((response) => {
                        if (response.data.status == 0) {
                            setNotify({
                                isOpen: true,
                                message: "Not successfully added to your wishlist !",
                                type: "error",
                            });
                        } else {
                            setRecord([]);
                            setRecord(response.data.data);
                            setNotify({
                                isOpen: true,
                                message: "Successfully added to your wishlist !",
                                type: "success",
                            });
                        }
                    });
            }
        } else {
            setNotify({
                isOpen: true,
                message: "Customer has not logged in !",
                type: "error",
            });
        }
    }

    const [listOfSizes, setListOfSizes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/invent/sizes").then((response) => {
            // console.log(response.data);
            setListOfSizes(response.data);
        });
    }, []);

    const [listOfCollections, setListOfCollections] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/collection").then((response) => {
            // console.log(response.data);
            setListOfCollections(response.data);
        });
    }, []);

    const [listOfColors, setListOfColors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/availableColors/fetchColors")
            .then((response) => {
                // console.log(response.data);
                setListOfColors(response.data);
            });
    }, []);

    const [listOfTypes, setListOfTypes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/types").then((response) => {
            // console.log(response.data);
            setListOfTypes(response.data);
        });
    }, []);



    const doFilter = (e) => {
        axios
            .get("http://localhost:3001/shop/filterRecords", {
                params: {
                    uId: localStorage.getItem("userId"),
                    Collection: Collection,
                    Colour: Colour,
                    Type: Type,
                    Size: Size,
                },
            })
            .then((response) => {
                setRecord([])
                setRecord(response.data);
            });

        // props.resetForm();
    };

    const loadRecordAgain = () => {

        const uid = localStorage.getItem("userId");
        if (uid == "0") {
            var response = fetch(`http://localhost:3001/shop`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    setRecord(myJson);
                });
            console.log('thash')
            console.log(response.data)
        } else {
            var response = fetch(`http://localhost:3001/shop/shops/` + uid)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    setRecord(myJson);
                });
        }
    };

    const doAll = () => {

        const uid = localStorage.getItem("userId");
        if (uid == "0") {
            var response = fetch(`http://localhost:3001/shop`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    setRecord(myJson);
                });

        } else {
            var response = fetch(`http://localhost:3001/shop/shops/` + uid)
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    setRecord(myJson);
                });
        }
    };

    useEffect(() => {
        loadRecordAgain();
        // dispatch(fetchColors());
    }, []);

    return (
        <div>
            <CssBaseline />
            <CommonNav />
            <div>
                <center>
                    <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>
                        SHOP
                    </Typography>
                    <Grid item md={6}
                    style={{ marginTop: "80px", marginBottom: "40px" }}
                    >
                        <div className={classes.filter}>
                            <ButtonGroup
                                variant="contained"
                                color="primary"
                                aria-label="split button"
                                style={{ boxShadow: "none" }}
                            >
                                <select
                                    className={classes.icon}
                                    name="Collection"
                                    onChange={onCollection}
                                >
                                    <option value="">Collection</option>

                                    {listOfCollections.map((value) => {
                                        return (
                                            <option value={value.collection_name}>
                                                {value.collection_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </ButtonGroup>
                            {/* <ButtonGroup variant="contained" color="primary" aria-label="split button" style={{ boxShadow: 'none' }}>
                                <select className={classes.icon}>
                                    <option value="">Material</option>
                                    <option value="1">Cotton</option>
                                    <option value="0">Wet look</option>
                                </select>
                            </ButtonGroup> */}
                            <ButtonGroup
                                variant="contained"
                                color="primary"
                                aria-label="split button"
                                style={{ boxShadow: "none" }}
                            >
                                <select
                                    className={classes.icon}
                                    name="Colour"
                                    onChange={onColour}
                                >
                                    <option value="">Colour</option>

                                    {listOfColors.map((value) => {
                                        return (
                                            <option value={value.color_name}>
                                                {value.color_name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </ButtonGroup>
                            <ButtonGroup
                                variant="contained"
                                color="primary"
                                aria-label="split button"
                                style={{ boxShadow: "none" }}
                            >
                                <select className={classes.icon} name="Type" onChange={onType}>
                                    <option value="">Type</option>

                                    {listOfTypes.map((value) => {
                                        return <option value={value.types}>{value.types}</option>;
                                    })}
                                </select>
                            </ButtonGroup>
                            <ButtonGroup
                                variant="contained"
                                color="primary"
                                aria-label="split button"
                                style={{ boxShadow: "none" }}
                            >
                                <select className={classes.icon} name="Size" onChange={onSize}>
                                    <option value="">Size</option>
                                    {listOfSizes.map((value) => {
                                        return <option value={value.size}>{value.size}</option>;
                                    })}
                                </select>
                            </ButtonGroup>
                            <Button variant="contained" color="primary" onClick={doFilter}>
                                Filter
                            </Button>

                            <Button variant="contained" onClick={doAll}>
                                All
                            </Button>
                        </div>
                    </Grid>
                </center>

                <Container className={classes.collectionContainer} maxWidth="lg">
                    <Grid container spacing={0}>

                        {products.map((product, index) => {
                            const { id, coverImage, design_name, price, isInWishList, discountedPrice, rate } = product;

                            return (
                                <Grid item xs={12} sm={6} md={3}>
                                    <Link style={{ textDecoration: "none" }}>
                                        <Card className={classes.card}>
                                            <CardActionArea>
                                                <img
                                                    style={{
                                                        width: "100%",
                                                        height: '290px',
                                                        overflow: "hidden",
                                                        objectFit: "cover",
                                                        hight: "293px",
                                                    }}
                                                    src={"http://localhost:3001/" + coverImage}
                                                    alt=""
                                                    onClick={() => {
                                                        history.push(`/productDetails/${id}`);
                                                    }}
                                                ></img>

                                                <CardContent style={{ height: '120px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <Typography
                                                            gutterBottom
                                                            variant="h9"
                                                            component="h2"
                                                            style={{ textAlign: "left", fontSize: "16px" }}
                                                        >
                                                            {design_name}
                                                        </Typography>
                                                        <IconButton
                                                            style={{
                                                                padding: '0px',
                                                                borderRadius: '0px'
                                                            }}
                                                            onClick={() => {
                                                                addToWishlist(id, isInWishList);
                                                            }}
                                                        >
                                                            <FavoriteBorderOutlinedIcon
                                                                className={classes.icon1}
                                                                style={{
                                                                    fill:
                                                                        product.isInWishList == 1
                                                                            ? "red"
                                                                            : "primary",
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        {discountedPrice === null ?
                                                            <Typography
                                                                gutterBottom
                                                                variant="h6"
                                                                component="h2"
                                                                style={{ textAlign: "left", fontSize: "16px" }}
                                                            >
                                                                {"LKR " + price}
                                                            </Typography>
                                                            :
                                                            <div style={{ display: 'flex' }}>
                                                                <div >
                                                                    <Typography
                                                                        gutterBottom
                                                                        variant="h6"
                                                                        component="h2"
                                                                        style={{ textAlign: "left", fontSize: "16px" }}
                                                                    >

                                                                        {"LKR " + discountedPrice}

                                                                    </Typography>
                                                                    <div>
                                                                        <Typography
                                                                            gutterBottom
                                                                            variant="h6"
                                                                            component="h2"
                                                                            style={{ textAlign: "left", fontSize: "16px" }}
                                                                        >
                                                                            <s>{"LKR " + price}</s>
                                                                        </Typography>



                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <span className={classes.offer22}>
                                                                        {rate}%
                                                                    </span>



                                                                </div>


                                                            </div>

                                                        }


                                                    </div>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Link>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Container>
            </div>
            <Footer />
            <Notification notify={notify} setNotify={setNotify} />
        </div>



    );
};

export default Shop;
