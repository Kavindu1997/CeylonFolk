import { makeStyles } from '@material-ui/core/styles';
import Image from '../../../images/signin.jpg';
const useStyles = makeStyles((theme) => ({
    base:{
      flexGrow: 1,
      padding: theme.spacing(3),
      height:'100vh',
      backgroundImage:`url(${Image})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed"   

    },
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      marginTop:'20px'
    },
    form: {
      width: '80%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default useStyles;