import React from 'react';
// import { CssBaseline } from '@material-ui/core';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { IconButton, Collapse, CardActions, CardContent } from '@material-ui/core';
import Collection1 from '../../images/ts1.jpg';
import butter2 from '../../images/butter2.jpg';
import NumericInput from 'react-numeric-input';
import './styles.css'
import { useParams } from 'react-router';
import { Card, Container, CardActionArea, CardMedia } from '@material-ui/core';
import useStyles from './style';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router';
import * as Yup from 'yup';



// import { Corousel_img } from './Corousel_img';



function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const DetailOfProduct = () => {
  const classes = useStyles();

  const [itemDetails, setOfItems] = useState([]);
  const [totalDetails, setOftotals] = useState([]);

  let { id } = useParams();
  let history = useHistory()

  const [productObject, setProductObject] = useState([]);
  const [product, setProduct] = useState({});
  const [imageArray, setImageArray] = useState([]);
  const [imagePreview, setImagePreview] = useState();
  const [mapSize, setMapSize] = useState();
  const [quantity, setQuantity] = useState();


  useEffect(() => {
    axios.get(`http://localhost:3001/ProductDetails/byId/${id}`).then((response) => {
      setProductObject(response.data);
      console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/byIdImages/${id}`).then((response) => {
      setImageArray(response.data);
      console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/byPid/${id}`).then((response) => {
      setProduct(response.data);
      console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/imagesArray/${id}`).then((response) => {
      setImagePreview(response.data);
      console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/mapSize/${id}`).then((response) => {
      setMapSize(response.data);
      console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/quantity/${id}`).then((response) => {
      setQuantity(response.data);
      console.log(response)
    });

  }, []);

  // const [mapSize,setMapSize] = useState();

  // useEffect(() => {
  //     axios.get(`http://localhost:3001/ProductDetails/mapSize/${id}`).then((response) => {
  //       setMapSize(response.data);
  //         console.log(response)
  //     });
  // },[]);

  //   const [sizet,setSizet] = useState([]);
  //   const [colort,setColort] = useState([]);

  //   sizeOptions = mapSize.map((p) => p.sizet).filter((v, i, a) => a.indexOf(v) === i).map((sizet) => ({ label: sizet, value: sizet }));
  // colorOptions = mapSize.filter((p) => sizet && p.sizet === sizet.value).map((p) => p.colort).filter((v, i, a) => a.indexOf(v) === i).map((colort) => ({ label: colort, value: colort }));

  var [index, setIndex] = useState(0);
  console.log(index)

  var handleTab = index => {
    // alert(index)
    setIndex(index)
    console.log(index)
  }

  var [index1, setIndex1] = useState(0);
  console.log(index1)

  var handleTab1 = index1 => {
    // alert(index1)
    setIndex1(index1)
    console.log(index1)
  }

  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const color = 'Black';

  // console.log(color);

  // const [sizeObject,setSizeObject] = useState([]);

  // useEffect(() => {
  //   const url = 'http://localhost:3001/ProductDetails/size/'+color;
  //     axios.get(url).then((response) => {
  //         setSizeObject(response.data);
  //         console.log(response.data.size)
  //     });
  // },[]);


  const initialValues = {

    email: '',
  }

  const validationSchema = Yup.object().shape({

    email: Yup.string().email("Email is not valid").required("Email is required"),

  });




  const addToCart = () => {
    var uid = localStorage.getItem("userId");
    if (uid > 0) {
      const url = "http://localhost:3001/check/addToCart/"
      const dummyItem = { productId: 'ID007', quantity: 2, userId: uid, size: 'M' }
      axios.post(url, dummyItem).then((response) => {
        if (response.data.error) alert(response.data.error);
        else {
          const url1 = "http://localhost:3001/check/items/" + uid;
          axios.get(url1).then((response) => {
            setOfItems(response.data);
          });
          const url2 = "http://localhost:3001/check/total/" + uid;
          axios.get(url2).then((response) => {
            setOftotals(response.data);

          });
        }
      });
      alert("Product successfully added to cart");
    }
    else {
      //TODO Update the local storage
      const dummyItem = { image: "https://5.imimg.com/data5/CR/OL/NO/ANDROID-36904487/img-20181220-wa0001-jpg-500x500.jpg", name: "Snowy", price: 1200, quantity: 10, itemId: "ID007", size: "S" }
      var cart = [];
      cart = JSON.parse(localStorage.getItem("cart"));
      console.log("point 1")
      cart.push(dummyItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product successfully added to cart");
    }
  };


  return (
    <div>
      <CssBaseline />
      <CommonNav />


      <Grid container className={classes.productContainer}>
        <CssBaseline></CssBaseline>
        <Grid item xs={2} sm={8} md={6} elevation={6} square style={{ display: 'flex' }} className>
          {/* <Card className={classes.card}>
          <CardMedia><img src={Collection1} style={{width:'100%'}}/></CardMedia>
          <CardMedia><img src={butter2} style={{width:'100%'}}/></CardMedia>
        </Card> */}
          <Grid Container>
            {/* <Box><img src={product.designImage} style={{width:'100%'}}/></Box> */}
            <Box>{imagePreview && <img src={imagePreview[index].designImage} style={{ width: '100%' }} />}</Box>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={8} md={6} elevation={6} square>
          <Formik>
            <Box className={classes.productDetails}>
              <Box className={classes.goback}><Link>GO BACK</Link></Box>
              <Box>
                <Typography className={classes.productTitle}>{product.designName}</Typography>
                <Typography className={classes.productPrice}>{"LKR " + product.price + '.00'}</Typography>
                <Box><Typography className={classes.productColor}>COLOR</Typography></Box>
                <Box>
                  <Box style={{ display: 'flex' }}>

                    <label style={{ cursor: 'pointer' }}>
                      <input type="radio" className={classes.spaninput} onClick={() => handleTab(index)}></input>
                      <Card className={classes.card}>

                        {imageArray.map((value, index) => {
                          return (

                            <CardMedia style={{ marginRight: '10px' }} onClick={() => handleTab(index)}>
                              <Link to={'http://localhost:3000/productDetails/' + value.designId}>
                                <img src={value.designImage} key={index} style={{ width: '100%' }} />
                              </Link>

                            </CardMedia>



                          );
                        })}
                        {/* <CardMedia><img src={butter2} style={{width:'100%'}}/></CardMedia> */}

                      </Card>
                      {/* <Box className={classes.spanback}><img src={Collection1} style={{width:'100%'}}/></Box> */}
                    </label>

                  </Box>
                </Box>
                <Box className={classes.tBox}>
                  <Typography className={classes.productColor}>SIZE</Typography>

                  {/* <select value={sizet} onChange={setSizet} options={sizeOptions} />
      <select
        value={colort}
        onChange={setColort}
        options={colorOptions}
        isDisabled={!sizet}
      /> */}

                  <Box style={{ display: 'flex' }}>
                    {productObject.map((value) => {
                      return (
                        <ul className={classes.clrsboxSize}>
                          <li className={classes.lbl}>
                            <label style={{ cursor: 'pointer' }}>
                              <div>
                                <div style={{ paddingBottom: '10px' }} onClick={() => toggleTab(1)}>
                                  <input type="radio" name="size" className={classes.sizeOption} value="UK6" checked />
                                  <span className={classes.swatchVisible} onClick={() => handleTab1(value.inventoryId)}>{value.size}</span>
                                </div>
                                {/* <div key={value.inventoryId}className={toggleState === 1 ? classes.activeQuantity : classes.quantity}><span className={classes.swatchVisible}>{value.quantity}</span></div> */}
                              </div>
                              {/* <input type="radio" name="size" className={classes.sizeOption} dataOptionId="2" value="UK6" checked  onClick={() => toggleTab(value.designId)}/>
                          <span className={classes.swatchVisible}>S</span> */}

                            </label>
                          </li>
                        </ul>
                      );
                    })}

                    {/* <div>{quantity && <span className={classes.swatchVisible}>{quantity[index1].quantity}</span>}</div> */}

                    <center>
                      <a href='../pages/customize' style={{ textDecoration: 'none' }}><Button variant="outlined" className={classes.designbtn}>SIZE GUIDE</Button></a>
                    </center>
                  </Box>
                  <div className={toggleState === 1 ? classes.activeQuantity : classes.quantity}>{quantity && <span>{quantity[index1].quantity + " in stock"}</span>}</div>
                </Box>
                <Box className={classes.tBox}>
                  <Typography className={classes.productColor}>QUENTITY</Typography>
                  <div>{quantity && <NumericInput mobile min={0} max={quantity[index1].quantity} value={1} size={1} />}</div>
                </Box>
                {quantity && <Box className={quantity[index1].quantity > 0 ? classes.activeQuantity : classes.quantity}>
                  <Button style={{ background: '#2c2d2d', color: 'white' }} onClick={addToCart}>ADD TO CART</Button>

                </Box>}
                {quantity && <Box className={quantity[index1].quantity === 0 ? classes.activeQuantity : classes.quantity}>
                  <Formik initialValues={initialValues} validationSchema={validationSchema}>
                    {(props) => (
                      <Form>
                        <Field as={TextField}
                          className={classes.textField}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          helperText={<ErrorMessage name="email" />}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                        >Send Email</Button>
                      </Form>
                    )}
                  </Formik>

                </Box>}

              </Box>
            </Box>
          </Formik>

        </Grid>
      </Grid>


      <Footer />
    </div>
  );
};

export default DetailOfProduct;