import { makeStyles } from '@material-ui/styles';

const useStyles1 = makeStyles((theme) => ({

    root: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '1000px',
        fontFamily: 'Segoe UI',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: 'relative',
        padding: '100px',
        color: 'white'
    },

    backimage: {
        marginTop: '60px'
    },

    colorText: {
        color: '#31C5EE',
        fontSize: '4rem',
    },

    title: {
        color: 'white',
        fontSize: '3rem',
        textAlign: 'left',
        fontFamily: 'Segoe UI',
    },

    container: {
        textAlign: 'left'
    },

    goDown: {
        color: '#fff',
        fontSize: '4rem'
    },

    collectionContainer: {
        paddingTop: '24px'
    },

    collectionTitle: {
        marginTop: '40px',
        fontWeight: '300',
        paddingBottom: '24px',
        textAlign: 'center',
        fontFamily: 'Segoe UI',
        padding: '50px',
    },

    card: {
        maxWidth: '95%'
    },

    media: {
        height: '240px',
    },

    DropDown: {
        margin: theme.spacing(5),
    },

    filter: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        color: 'black',
        boxShadow: 'none',
    },

    rt: {
        borderBottom: '1px solid white',
    },

    icon: {
        fill: 'white',
        padding: '8px',
        borderRadius: '50px',
        background: 'light blue',
        width: '100px',
        height: '78',
        color: 'black',
        boxShadow: 'none',

    },

    icon1: {
        color: 'black',
        fontSize: '2rem',
        marginLeft: '80px',
        marginRight: '10px',
        fontWeight: '50',
    },

    font2: {
        textAlign: 'left'
    },

}));

export default useStyles1;