import { makeStyles } from '@material-ui/styles';

const useStyles=makeStyles((theme)=>({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        fontFamily:'Nunito'
    },
    appbar:{
        background:'none'
    },
    icon:{
        color:'#000',
        fontSize:'2rem'
    },
    appbarTitle:{
        flexGrow:'1',
        color:'#3d3a3a',
    },
    appbarWrapper:{
        width:'95%',
        margin:'0 auto'
    },
    colorText:{
        color:'#052afa'
    },
    title:{
     color:'#3d3a3a',
     fontSize:'3rem'
    },
    container:{
        textAlign:'center'
    },
    goDown:{
        color:'#052afa',
        fontSize:'4rem'
    }
 }))

 export default useStyles;