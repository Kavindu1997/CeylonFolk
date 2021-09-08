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
        width: '70%',
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
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: '100%',
        width: '50ch',
        textAlign: 'left'
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      errorClass: {
          borderColor: "red"
      }
}));


export default useStyles;
