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
}));

export default useStyles;
