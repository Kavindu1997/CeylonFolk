import { makeStyles } from '@material-ui/styles';
import cfCover from '../images/cfCover.png';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '1000px',
        fontFamily: 'Montserrat',
        position: 'relative',
        color: 'white',
        padding: '100px',
        background: 'red'
    },
    photoContainer: {
        backgroundImage: `url(${cfCover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: '80px',
        padding: '20px',
        display: 'flex'
    },
    bar: {
        background: 'black',
        padding: '10px',
        marginTop: '5px',
        marginLeft: '5px',
        marginBottom: '5px',
        justifyContent: 'space-between'
    },
    bar2: {
        background: 'white',
        padding: '50px',
        marginTop: '5px',
        marginRight: '5px',
        marginBottom: '5px',
        justifyContent: 'space-between',
        padding: '50px',
        alignItems: 'center'
    },
    bar3: {
        display: 'flex',
    },
    bar4: {
        background: 'none',
        padding: '10px',
        marginTop: '5px',
        marginBottom: '5px',
        justifyContent: 'space-between',
        marginLeft: '180px'
    },
    barBtn: {
        padding: '10px',
        margin: '5px',
        alignItems: 'center',
        background: 'white',
        width: '74px',
        justifyContent: 'center'
    },
    barBtn2: {
        padding: '10px',
        margin: '5px',
        alignItems: 'center',
        background: 'white',
        width: '74px',
        justifyContent: 'center'
    },
    barBtn3: {
        padding: '10px',
        margin: '5px',
        alignItems: 'center',
        background: 'white',
        width: '74px',
        justifyContent: 'center',
        border: 'none'
    },
    barFont: {
        fontSize: '8px'

    },
    barContainer: {
        display: 'flex'
    },
    slevebtn: {
        background: '#2C2D2D',
        padding: '10px',
        fontSize: '9px',
        color: 'white',
        margin: '5px',
        '&:hover': {
            background: '#31c5ee',
        },
        width: '100px'
    }
}));

export default useStyles;