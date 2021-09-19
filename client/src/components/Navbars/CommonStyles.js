import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI',
        color: 'white',
        textDecoration: 'none'
    },
    appbar: {
        display: 'flex',
        padding: '5px',
        width: '100%',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
        background: 'white'

    },
    appbarsolid: {
        backgroundColor: 'black'

    },
    icon: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '24px',
        marginRight: '10px',
        fontWeight: '300',
        visibility: 'visible',
        '&:hover': {
            background: 'none',
        }
    },
    iconCart: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '24px',
        marginRight: '3px',
        fontWeight: '300',
        visibility: 'visible'
    },
    iconLogin: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '5px',
        marginRight: '10px',
        fontWeight: '300',
        visibility: 'visible',
    },
    visibility: {
        visibility: 'hidden'
    },
    navlinkvisibility: {
        pointerEvents: "none",
    },
    navlinkvisibilityTrue: {
        pointerEvents: "auto",
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',
        display: 'flex',
        fontFamily: 'Work Sans',
        textDecoration: 'none'
    },
    appbarTitle2: {
        flexGrow: '1',
        color: 'black',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    appbarWrapper: {
        color: 'black',
        width: '100%',
        margin: '0 auto',
        height: '10px'
    },
    colorText: {
        color: 'black'
    },
    navbartext: {
        color: 'black',
        fontFamily: 'Segoe UI',
        textTransform: 'none',
        fontSize: '15px',
        textDecoration: 'none'
    },
    goDown: {
        color: '#fff',
        fontSize: '1rem',
    },

    appbarLeft: {
        display: 'flex',
        color: 'black',
        fontColor: 'black',
        fontFamily: 'Work Sans',
        textDecoration: 'none',
        marginLeft: '10px',
        marginRight: '10px'
    },

    appbarMiddle: {
        display: 'flex',
        flexGrow: '1',
        color: '#fff',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    appbarRight: {
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'right',
    },

    appbarlink: {
        color: 'black',
        position: 'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '15px',
        paddingLeft: '10px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    appbarlink2: {
        color: 'black',
        position: 'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '15px',
        paddingLeft: '10px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },

    count: {
        top: '4%',
        right: '7.2%',
        height: '25px',
        width: "25px",
        verticalAlign: 'middle',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2px',
        position: 'absolute',
        background: '#020303',
        borderRadius: '50%',
        color: 'white',
    },
    navActive:{
        display: 'block',
        color: 'black',
        position: 'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '15px',
        paddingLeft: '10px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }

    },
    navInactive:{
        display: 'none',

    }

}));

export default useStyles;