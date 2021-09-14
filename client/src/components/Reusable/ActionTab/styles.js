import { makeStyles } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import DrawerImg from '../../../images/drawer.jpg'

export const useStyles = makeStyles((theme) => {
  console.log(theme.breakpoints);
  return {
    //common
    navImg: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      color: "White",
      backgroundColor: blue["A400"],
    },

    green: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      color: "White",
      backgroundColor: green["388E3C"],
    },

    profileImg: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      color: "White",
      backgroundColor:"#74b9ff",
      fontSize:'3rem',
      margin:'30px auto 10px auto'
    },

    profileName:{
      fontWeight: 'bold',
      display: 'block',
      fontSize: '25px',
      color: '#4e5052',
      textTransform: 'capitalize',
      textAlign:'center',
      marginBottom: '5px',
      lineHeight: '60px',      
    },
    divider: {
      background:"#a4b0be",
    },
    drawer:{
      backgroundImage: `url(${DrawerImg})`,
      justifyContent:"center"
    },
    profileTitle:{
      fontWeight: 'bold',
      display: 'block',
      fontSize: '18px',
      color: 'black',
      textTransform: 'capitalize',
      textAlign:'center',
      marginBottom: '0px',
      lineHeight: '60px',      
    },
    profileDetail:{
      fontWeight: 'bold',
      display: 'block',
      fontSize: '14px',
      fontFamily: 'Nunito',
      textAlign:'center',    
    },
    //header
    wrapper: {
      width: "100%",
      minHeight: "100vh",
      height: "auto",
      background: "#efefef",
      boxSizing: "border-box",
      padding: "70px 24px 24px 270px",
      [theme.breakpoints.down("sm")]: {
        padding: "70px 24px 24px 24px",
      },
    },
    logo: {
      lineHeight: "47px",
      color: "inherit",
    },

    // navbar styles

    toolbar: {
      display: "flex",
      flexFlow: "row wrap",
      justifyContent: "space-between",
    },
    brandBox: {
      display: "flex",
      flexFlow: "row wrap",
    },
    dropdownlist: {
      maxWidth: "250px",
    },
    listItem: {
      textTransform: "capitalize",
    },

    listItemNotification: {
      textTransform: "capitalize",
      
      fill: 'white',
      padding: '10px',
      // borderRadius: '50px',
      background: 'light blue',
      width: '1000px',
      color: 'black',
      boxShadow: 'none',
      // marginTop:'0px'
    },

    notifi: {
      display: 'none'
    },
    activeNotifi: {
      display: 'block'
    },

  };
});