import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '1000px',
        fontFamily: 'Montserrat',
        position: 'relative',
        color: 'white',
        padding: '100px',
    },
    table: {
        // minWidth: 400,
        // backgroundColor:'#fafafa',
        fontFamily: 'Montserrat',
        // alignItems:'center',
        width: '700px',
        marginLeft: '60px'
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
    submit: {
        marginTop: 30,
        alignItems: "center",
        // marginLeft: 600,
    },
    submit: {
        marginTop: 30,
        alignItems: "center",
        // marginLeft: 600,
    },
    viewOrder: {
        margin: "auto",
        display: "auto",
        alignItems: "center",
        // marginLeft: 600,
    },
    back: {
        // marginRight: 50,
        display: "auto",
        // alignItems: "center",
        marginLeft: 800,
    },
    margin: {
        margin: theme.spacing(2),
        width: '50ch',
        // marginRight: '50px'
    },
    avatar: {
        align: 'left'
    },
    listItemText: {
        fontSize: '3.0em',//Insert your required size
        marginLeft: '20px',
    },

    stepperContainer:{
        padding: '10px',
    margin: '10px',
    width: '50%',
    marginTop: '100px',
    backgroundColor: '#ebf9fd'

    },
    root: {
        width: '100%',
      },
      backButton: {
        marginRight: theme.spacing(1),
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },

    quantity: {
        display: 'none'
      },
      activeQuantity: {
        display: 'block',
      },
      visibility:{
        display: 'none'
    },
    info: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    pageLinks: {
        flex: '1',
        marginTop: '20px',
        // marginLeft: '400px',
        padding: '30px',
    },
    searchInput: {
        width: "50%",
      },

}));

export default useStyles;
