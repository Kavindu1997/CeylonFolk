import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    stat: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    featured: {
        flex: '1',
        margin: '0px 20px',
        padding: '30px',
    },
    featuredTitle: {
        fontSize: '18px',
        fontWeight: '300',
    },
    featuredCount: {
        fontSize: '30px',
        fontWeight: '600',
    },
    info: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    pageLinks: {
        flex: '1',
        marginTop: '40px',
        // marginLeft: '400px',
        padding: '30px',
    },
    orderDetails: {
        flex: '1',
        width: '100%',
        margin: '10px 30px',
    },
    table: {
        minWidth: 650,
    },
    activeContent: {
        display: 'block'
    },

    hideContent: {
        display: 'none'
    },
    searchInput: {
        margin: '50px',
        width: "50%",
    },

}));

export default useStyles;

