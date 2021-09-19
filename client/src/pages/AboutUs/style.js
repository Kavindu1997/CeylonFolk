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
    },
    submit: {
        marginTop: 30,
        alignItems: "center",
    },
    image: {
        marginTop: '30px',
        height: '500px',
        backgroundPosition: 'center',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    subsubText: {
        display: 'block',
        fontSize: '16px',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        fontWeight: '300',
        textAlign: 'flex'
    },

}));

export default useStyles;