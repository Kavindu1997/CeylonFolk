import { makeStyles } from '@material-ui/styles';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
      },
      toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      menuButtonHidden: {
        display: 'none',
      },
      title: {
        flexGrow: 1,
      },
      colorText: {
        color: '#74b9ff'
      },
      drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      },
      appBarSpacer: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      },
      container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
      paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: 240,
      },
    
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },

    searchInput: {
        width: "50%",
    },
    newButton: {
        position: "absolute",
        right: "10px",
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
    },
      
  }));

  export default useStyles;