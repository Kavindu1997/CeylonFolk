import { makeStyles } from '@material-ui/core/styles';
import { Component } from 'react';
const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex',
        justifyContent:'left',
        height:'1000px',
        width:'100%',
        fontFamily:'Montserrat',
        position:'relative',
        color: 'white'
    },
    form: {
        width: '80%',
        marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  export default useStyles;