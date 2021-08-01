import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 400,
      backgroundColor: '#fafafa',
      fontFamily: 'Montserrat'
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
      alignItems: "center",
      // marginLeft: 600,
    },
    submit: {
      marginTop: 30,
      alignItems: "center",
      // marginLeft: 600,
    },
    coupon: {
      borderRadius: 20
    },
    numeric: {
      borderRadius: '50%'
      // rounded, 
      // textColor:'#B0228C', 
      // // iconStyle={{ color: 'white' }}, 
      // rightButtonBackgroundColor:'#EA3788', 
      // leftButtonBackgroundColor:'#E56B70',
    },
  }));

export default useStyles;
