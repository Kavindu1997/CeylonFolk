import { makeStyles } from "@material-ui/core";

const useStyles=makeStyles((theme)=>({
    root:{
        backgroundColor:'#EBF9FD',
        color:'black',
        marginTop:theme.spacing(8),
        paddingTop:theme.spacing(10),
        paddingBottom:theme.spacing(10)
    },   
}));

export default useStyles;