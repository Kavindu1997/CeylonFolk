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
import { actionAddToCart, actionGetTotal, incrementCartCount, sendProductsToDB } from '../../_actions/index';
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, fetchProduct, removeSelectedProduct } from '../../_actions/productAction';
import Notification from '../../components/Reusable/Notification';

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

export default function Product_detail() {

  const dispatch = useDispatch();
  const classes = useStyles();
  let { id } = useParams();
  const [productO, setProductO] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [imagePreview, setImagePreview] = useState();
  const [mapSize, setMapSize] = useState();
  const [quantity, setQuantity] = useState();
  const oneProduct = useSelector((state) => state.selectProductReducer)
  const { coverImage, design_name, price } = oneProduct;
  // console.log(designName)
  const [productSize, setProductSize] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });


  // console.log('hello from redux')
  // console.log(products)
  // const {Category} = products[0];
  // console.log(Category)

  // const fetchProductDetails = async () =>{
  //   axios.get(`http://localhost:3001/ProductDetails/byPid/${id}`).then((response) => {
  //     // setProductObject(response.data);
  //     console.log(response.data)
  //     console.log('hello from response from shop server')
  //     dispatch(selectedProduct(response.data))
  //   });
  // }

  useEffect(() => {
    if (id && id !== '') dispatch(fetchProduct(id));
    return () => {
      dispatch(removeSelectedProduct());
    }
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3001/ProductDetails/byId/${id}`).then((response) => {
      setProductO(response.data);
      console.log('hello from product')
      console.log(response.data)
      console.log('hello from product')
    });

    axios.get(`http://localhost:3001/ProductDetails/byIdImages/${id}`).then((response) => {
      setImageArray(response.data);
      // console.log(response)
    });

    // axios.get(`http://localhost:3001/ProductDetails/byPid/${id}`).then((response) => {
    //   setProduct(response.data);
    //   // console.log(response)
    // });

    axios.get(`http://localhost:3001/ProductDetails/imagesArray/${id}`).then((response) => {
      setImagePreview(response.data);
      // console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/mapSize/${id}`).then((response) => {
      setMapSize(response.data);
      // console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/quantity/${id}`).then((response) => {
      setQuantity(response.data);
      console.log('hello handle2')
      console.log(response.data)
      console.log('hello handle2')
    });

  }, []);


  // console.log('hello from product store')

  //  console.log(products)


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
  //console.log(index)

  var handleTab = index => {
    // alert(index)
    setIndex(index)
    //console.log(index)
  }

  var [index1, setIndex1] = useState(0);
  console.log(index1)

  var handleTab1 = index1 => {
    // alert(index1)
    setIndex1(index1)
    console.log('hello handle')
    console.log(index1)
    console.log('hello handle')
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

  const setSize = (event) => {
    setProductSize(event.target.value);
  }

  var itemQuantity = 1
  const getQty = (event) => {
    itemQuantity = event
  }

  const addToCart = () => {
    var uid = localStorage.getItem("userId");
    if (uid != '0') {
      var dummyItem = {
        image: coverImage,
        productId: id,
        quantity: itemQuantity,
        userId: uid,
        size: productSize,
        price: price,
        totals: quantity * price
      }
      var result = dispatch(sendProductsToDB(dummyItem))
      if (result == 0) {
        setNotify({
          isOpen: true,
          message: 'Added Successfully !',
          type: 'error'
        });
      } else {
        setNotify({
          isOpen: true,
          message: 'Added Successfully !',
          type: 'success'
        });
      }
    }
    else {
      var dummyItem = {
        name: design_name,
        image: coverImage,
        productId: id,
        quantity: itemQuantity,
        userId: uid,
        size: productSize,
        price: price,
        totals: quantity * price,
        stockMargin: quantity[index1].quantity
      }
      dummyItem.totals = dummyItem.price * dummyItem.quantity;
      console.log(dummyItem)
      dispatch(incrementCartCount());
      dispatch(actionAddToCart(dummyItem));
      dispatch(actionGetTotal(dummyItem.totals));
      setNotify({
        isOpen: true,
        message: 'Added Successfully !',
        type: 'success'
      });
    }
  };

  return (
    <div>
      <CssBaseline />
      <CommonNav />
      <Grid container className={classes.productContainer}>
        <CssBaseline></CssBaseline>
        {Object.keys(oneProduct).length == 0 ? (<div>Loading...</div>) : (
          <div style={{ display: 'flex' }}>
            <Grid item xs={2} sm={8} md={6} elevation={6} square style={{ display: 'flex' }} className>
              {/* <Card className={classes.card}>
          <CardMedia><img src={Collection1} style={{width:'100%'}}/></CardMedia>
          <CardMedia><img src={butter2} style={{width:'100%'}}/></CardMedia>
          </Card> */}
              <Grid Container>
                {/* <CardMedia
              className={classes.media}
              style={{ backgroundImage: `url(${designImage})` }}
              title="Snowy"
          /> */}
                <Box><img src={'http://localhost:3001/' + coverImage} style={{ width: '100%' }} /></Box>
                {/* <Box>{imagePreview && <img src={imagePreview[index].designImage} style={{ width: '100%' }} />}</Box> */}
              </Grid>
            </Grid>

            <Grid item xs={2} sm={8} md={6} elevation={6} square>
              <Formik>
                <Box className={classes.productDetails}>
                  <Box className={classes.goback}><Link>GO BACK</Link></Box>
                  <Box>
                    <Typography className={classes.productTitle}>{design_name}</Typography>
                    <Typography className={classes.productPrice}>{"LKR " + price + '.00'}</Typography>
                    <Box><Typography className={classes.productColor}>COLOR</Typography></Box>
                    <Box>
                      <Box style={{ display: 'flex' }}>
                        <label style={{ cursor: 'pointer' }}>
                          <input type="radio" className={classes.spaninput} onClick={() => handleTab(index)}></input>
                          <Card className={classes.card}>
                            {imageArray.map((value, index) => {
                              return (
                                <CardMedia style={{ marginRight: '10px' }} onClick={() => handleTab(index)}>
                                  <Link to={'http://localhost:3000/productDetails/' + id}>
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
                        {productO.map((value, index) => {
                          return (
                            <ul className={classes.clrsboxSize}>
                              <li className={classes.lbl}>
                                <label style={{ cursor: 'pointer' }}>
                                  <div>
                                    <div style={{ paddingBottom: '10px' }} onClick={() => toggleTab(1)}>

                                      <input type="radio" onClick={setSize} name="size" className={classes.sizeOption} value={value.size} checked />

                                      <span className={classes.swatchVisible} onClick={() => handleTab1(index)}>{value.size}</span>
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
                      <div className={toggleState === 1 ? classes.activeQuantity : classes.quantity}>{quantity && <span>{quantity[index].quantity + " in stock"}</span>}</div>
                    </Box>

                    <Box className={classes.tBox}>
                      <Typography className={classes.productColor}>QUANTITY</Typography>
                      <div>{quantity && <NumericInput mobile min={0} max={quantity[index1].quantity} value={1} size={1} onChange={getQty} />}</div>
                    </Box>

                    {quantity &&
                      <Box className={quantity[index1].quantity > 0 ? classes.activeQuantity : classes.quantity}>
                        <Button style={{ background: '#2c2d2d', color: 'white' }} onClick={addToCart}>ADD TO CART</Button>

                      </Box>}

                    {quantity &&
                      <Box className={quantity[index1].quantity === 0 ? classes.activeQuantity : classes.quantity}>
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

                  <div className={toggleState === 1 ? classes.activeQuantity : classes.quantity}>{quantity && <span>{quantity[index1].quantity + " in stock"}</span>}</div>               


                </Box>
              </Formik>


            </Grid>
          </div>
        )}
      </Grid>


      <Footer />
      
  <Notification
    notify={notify}
    setNotify={setNotify}
  />
    </div>
  );
};
