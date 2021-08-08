import { makeStyles } from '@material-ui/styles';
import Image from '../../images/Cover.png';

const useStyles = makeStyles((theme) => ({
    
    root: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '1000px',
        fontFamily: 'Open Sans',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: 'relative',
        padding: '100px',
        color: 'white',
        background: '#fff'
    },
    root2: {

        minHeight: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    },
    colorText: {
        color: 'black',
        fontSize: '100px',
        fontWeight: '600',
        fontFamily: 'Open Sans',
    },
    title: {
        color: 'black',
        fontSize: '50px',
        textAlign: 'left',
        fontFamily: 'Open Sans',
        fontWeight: '500',
        marginBottom: '0px'

    },
    container: {
        textAlign: 'left',
        marginTop: '250px',
        marginLeft: '60px',
    },
    goDown: {
        color: '#fff',
        fontSize: '4rem'
    },
    collectionContainer: {
        paddingTop: '24px'
    },
    collectionTitle: {
        fontWeight: '600',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontFamily: 'Open Sans',
        padding: '60px',
        margin: '10px'
    },

    card: {
        maxWidth: '92%'
    },
    media: {
        height: '240px',
        width: '100%'

    },
    svgs: {
        color: 'red',
        '&:hover': {
            borderRadius: "10px",
            width: "50%",
        },
    },
    svgContainer: {
        width: '50%',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'borderBox'
    },
    imageContainer: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'borderBox',
        marginTop: '63px',
        background: '#fafafa'
    },
    svgBtn: {
        padding: '20px',
        background: 'none',
        border: 'none',
        width: '90%',
        height: '100%',
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.2)',

        },
        cscontainer: {
            width: '50%'
        }
    },
    svgFont: {
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: '600'
    },

    productTitle: {
        fontFamily: 'Open Sans',
        fontSize: '16px',
        color: '#00',
        textDecoration: 'none',
        textTransform: 'uppercase',
        fontWeight: '600',
        lineHeight: '1.2',
        letterSpacing: '0.9px'
    },

    productSubTitle: {
        display: 'block',
        fontSize: '16px',
        color: '#4a4a4a',
        letterSpacing: '0.9px',
        lineHeight: '1.2'

    },

    subText: {
        display: 'block',
        fontSize: '16px',
        marginBottom: '1.2rem',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        color: 'black'
    },
    subsubText: {
        display: 'block',
        fontSize: '16px',
        marginBottom: '1.2rem',
        color: 'white',
        letterSpacing: '0.9px',
        lineHeight: '1.2',
        fontWeight: '300'
    },


    designbtn: {
        border: '2px solid rgba(0, 0, 0, 0.23)',
        padding: '5px 15px',
        color: 'black',
        borderColor: 'black',
        fontSize: '20px'
    },

    view: {
        padding: '10px',
        margin: '20px',
        float: 'right'
    },
    icon1: {
        color: 'black',
        fontSize: '2rem',
        marginLeft: '80px',
        marginRight: '10px',
        fontWeight: '50',


    },
    offer: {
        textAlign: 'left',
        background: '#31c5ee',
        marginLeft: '10px',
        paddingLeft: '10px',
        marginBottom: '20px',
        width: '70px',
        borderRadius: '30px',
        float: 'left',
        fontSize: '20px'
    }

  }));

  export default useStyles;