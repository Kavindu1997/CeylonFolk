import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    
    infoContent: {
        backgroundColor: '#f5f6fa',
        textAlign: 'center',
        padding: theme.spacing(5),
        '& .MuiTypography-h5': {
          fontFamily: 'Segoe UI',
        },
        '& .MuiIconButton-root': {
          color: '#1e272e',
        },
        '& .MuiTypography-subtitle1': {
          fontFamily: 'Nunito',
          color: '#596275'
        },
      },
      headStyle: {
        fontFamily: 'Nunito',
        color: '#222f3e',
        textAlign: 'center',
        fontSize: '2.5rem',
        '&:hover': {
          color: '#48dbfb',
        }
      },
      textStyle: {
        fontFamily: 'Segoe UI',
        color: '#2C2D2D',
        paddigBottom: '20px'
      },
      pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
      },
      formControl: {
        marginTop: theme.spacing(1),
        minWidth: 200,
      },
      selectEmpty: {
        margin: theme.spacing(2),
      },
      submit: {
        align: 'center',
        padding: '10px',
        marginTop: '20px',
      },
      textField: {
        '& p': {
          color: 'red'
        }
      },

  }));

  export default useStyles;