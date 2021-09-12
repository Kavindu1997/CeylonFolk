import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },

    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },

    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },

    submit: {
      margin: theme.spacing(3, 0, 2),
    },

    productContainer:{
      padding: '40px',
      margin: '80px',
      width: '90%'
    },

    card:{
      width: '30%',
      paddingRight: '10px',
      display:'flex',
      marginRight: '10px',
      paddingBottom: '20px',
      marginBottom: '20px',
      border: 'none',
      boxShadow: 'none',
      borderRadius:'0px'
    },

    newGrid:{
      border: 'none',
      boxShadow: 'none',
    },

    goback:{
      paddingBottom: '20px',
      marginBottom: '10px',
      fontFamily: 'Montserrat',
      fontSize: '15px'
    },

    productTitle: {
      fontSize: '26px',
      fontWeight: '600',
      paddingBottom: '10px',
      marginBottom: '10px',
      fontFamily: 'Montserrat'
      
    },

    productPrice:{
      fontSize: '20px',
      fontWeight: '500',
      paddingBottom: '10px',
      marginBottom: '10px',
      fontFamily: 'Montserrat'
    },

    productDetails:{
      paddingLeft: '30px',
      marginLeft: '30px',
      paddingBottom: '20px',
      marginBottom: '20px'
    },

    productColor:{
      fontSize: '20px',
      fontWeight: '600',
      paddingBottom: '5px',
      marginBottom: '5px',
      fontFamily: 'Montserrat'
    },

    sizeBox:{
      width: '60px',
      border: 'ridge',
      borderColor: 'black',
      borderWidth: '2px',
      borderRadius: '10px',
      margin: '5px'
    },

    sizeText:{
      textAlign: 'center',
      padding: '5px',
      alignItems:'center'
    },
    designbtn:{
      color:'black',
      fontSize:'10px',
      padding:'2px',
      alignItems:'center',
      width:'50px',
      margin:'10px',
    },

    tBox:{
      marginBottom:'10px'
    },
    
    spanback:{
      display: 'inline-block',
      textIndent: '-9999px',
      verticalAlign: 'middle',
      height: '100px',
      width: '100px',
      margin: '0 5px 10px 0',
      boxShadow: 'inset 0 0 0 4px white',
      border: '1px solid #dcdcdc',
    //   backgroundImage: 'url(http://localhost:3000/static/media/ts1.e7b30a60.jpg)',
      backgroundSize: 'cover'
    },
    spanback2:{
      display: 'inline-block',
      textIndent: '-9999px',
      verticalAlign: 'middle',
      height: '42px',
      width: '42px',
      margin: '0 5px 10px 0',
      boxShadow: 'inset 0 0 0 4px white',
      border: '1px solid #dcdcdc',
      borderRadius: '50%',
      backgroundImage: 'url(http://localhost:3000/static/media/butter2.c4028f87.jpg)',
      backgroundSize: 'cover'
    },
    
    spaninput:{
      display: 'none',
      boxSizing: 'border-box',
      padding: '0',
      overflow: 'visible'
    },
  
    clrsboxSize:{
      listStyle: 'none',
      padding: '0',
      margin: '0',
      display: 'flex',
  },
  
    swatchVisible:{
      textIndent: 'inherit',
      borderRadius: '5px',
      width: '45px',
      height: 'auto',
      padding: '0.8rem 0',
      border: 'solid',
      borderWidth: '2px',
      lineHeight: '1',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '600',
      border: '2px solid #ccc',
      color: '#000',
      boxShadow: 'inset 0 0 0 4px white',
      display: 'inline-block',
    },
  
    sizeOption:{
      display:'none'
    },
  
    lbl:{
      paddingRight: '10px',
  
    },

    quantity: {
        display: 'none'
      },
      activeQuantity: {
        display: 'block'
      },
  
  }));

  export default useStyles;