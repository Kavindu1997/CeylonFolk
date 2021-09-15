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
        backgroundColor: '#fafafa',
        fontFamily: 'Montserrat',
        width: '600px'
    },
    form: {
        width: '60%',
        marginTop: theme.spacing(2),
        fontFamily: 'Montserrat',
        alignItems: 'center',
    },
    field: {
        width: '800px',
        fontFamily: 'Montserrat',
        alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    submit: {
        align: 'center',
        padding: '10px',
        marginTop: '30px',
        width: '450px'
    },
    margin: {
        margin: theme.spacing(2),
        width: '50ch',
    },
    avatar: {
        align: 'left'
    },
    listItemText: {
        fontSize: '3.0em',
        marginLeft: '20px',
    },

    visibility:{
        display: 'none'
    },
    noVisibility:{
        dispaly:'block'
    }
}));

export default useStyles;
