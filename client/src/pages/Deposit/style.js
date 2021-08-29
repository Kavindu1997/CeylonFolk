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
        backgroundColor: '#fafafa',
        fontFamily: 'Montserrat',
        width: '600px'
        // marginRight: '30px'
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(2),
        fontFamily: 'Montserrat',
    },
    submit: {
        align: 'center',
        padding: '10px',
        marginTop: '30px',
        width: '550px'
    },
    note: {
        height: 50
    },
    image: {
        marginTop: '30px',
    },
    spreadBox: {
        justifyContent: "space-around",
        alignItems: "center",
    },
    submit: {
        marginTop: 30,
        alignItems: "center",
        // marginLeft: 600,
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
    subText: {
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
