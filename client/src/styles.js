import {makeStyles} from '@material-ui/core/styles';
import Image from './images/index.jpg';
const useStyles= makeStyles((theme)=>({
  root:{
     minHeight:'200vh',
     backgroundImage:`url(${Image})`,
     backgroundRepeat:'norepeat',
     backgroundSize:'cover'
  }
}));

export default useStyles;