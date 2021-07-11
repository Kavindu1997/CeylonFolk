import { makeStyles } from '@material-ui/styles'; 

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
        marginTop: theme.spacing(2),
        fontFamily:'Montserrat',
    },
    submit: {
      align:'center',
      padding:'10px',
      marginTop:'30px',
    },
    google: {
        align:'center',
        padding:'10px',
        marginTop:'30px',
        marginBottom:'30px',
        borderWidth:'thin',
        borderColor:'black',
        '&:hover': {
            background: 'none',
            borderWidth:'medium',
          }
      },
      forgot:{
        textDecoration:'none',
        float:'right',
        marginTop:'10px',
        '&:hover':{
            fontWeight:'500',
            textDecoration:'none',
        }
      },
  }));

  export default useStyles;
