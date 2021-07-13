import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'center',
        height:'1000px',
        fontFamily:'Montserrat',
        position:'relative',
        color: 'white',
        padding: '100px',
    },
    form: {
        width: '70%',
        marginTop: theme.spacing(1),
        fontFamily:'Montserrat',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default useStyles;