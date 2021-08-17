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
    image: {
        marginTop: '30px',
        // minHeight:'100vh',
        height: '500px',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    subsubText: {
        display: 'block',
        fontSize: '16px',
        // marginBottom: '1.2rem',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        fontWeight: '300',
        textAlign: 'flex'
    },
  
  }));

  export default useStyles;