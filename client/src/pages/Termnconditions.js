import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CommonNav from '../components/Navbars/CommonNav';
import Content from '../components/Content';
import Footer from '../components/Footer/Footer';
// import Product_grid from '../components/Product_grid/Product_grid';
import { Product_grid } from '../components/Product_grid/Product_grid';
// import { DropDown } from '../components/Product_grid/DropDown';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';




import SplitButton from '../components/Product_grid/Product_grid';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '1000px',
        fontFamily: 'Segoe UI',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1)),url(${Image})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        position: 'relative',
        padding: '100px',
        color: 'white'

    },
    backimage: {
        marginTop: '60px'

    },
    colorText: {
        color: '#31C5EE',
        fontSize: '4rem',
    },
    title: {
        color: 'white',
        fontSize: '3rem',
        textAlign: 'left',
        fontFamily: 'Segoe UI',
    },
    container: {
        textAlign: 'left'
    },
    goDown: {
        color: '#fff',
        fontSize: '4rem'
    },
    collectionContainer: {
        paddingTop: '24px'
    },
    collectionTitle: {
        fontWeight: '300',
        paddingBottom: '24px',
        textAlign: 'center',
        fontFamily: 'Segoe UI',
        padding: '50px',
    },
    card: {
        maxWidth: '95%'

    },
    media: {
        height: '240px',

    },

    collectionTitle: {
        marginTop: '40px',
        fontWeight: '300',
        paddingBottom: '24px',
        textAlign: 'center',
        fontFamily: 'Segoe UI',
        padding: '50px',
    },

    DropDown: {
        margin: theme.spacing(5),
    },

    filter: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px',
        color: 'black',
        boxShadow: 'none',
    },

    rt: {
        borderBottom: '1px solid white',
    },
    icon: {
        fill: 'white',
        padding: '8px',
        borderRadius: '50px',
        background: 'light blue',
        width: '100px',
        height: '78',
        color: 'black',
        boxShadow: 'none',

    },

    icon1: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '30px',
        marginRight: '10px',
        fontWeight: '300',


    },

}));


const Shop = () => {

    const classes = useStyles();

    return (
        <div>
            <CssBaseline />
            <CommonNav />

            <center>
                <Typography variant="h4" className={classes.collectionTitle}>TERMS AND CONDITIONS</Typography>

            </center>


            <div>
                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'left', fontFamily: 'Montserrat' }}>GENERAL CONSIDERATIONS AND SCOPE</Typography>
                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '10px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                Tranzlife Retail Private Limited as CeylonFolk, maintains the internet portalwww.ceylonfolk.com, a fashion online store . On CeylonFolk.com customers will be offered goods. The offering on this site is only directed at end users of legal age. Goods will only be sold in normal household quantities. These terms and conditions find application in all contracts which members enter into via CeylonFolk.com as well as all general business relationships between CeylonFolk and its customers. We do not accept any other terms and conditions unless explicitly stated otherwise. If periods are stated in working days, these include all weekdays except Saturday and Sunday and all statutory holidays.
                </Typography>
            </div>

            
            <div>
                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'left', fontFamily: 'Montserrat' }}>PRICES AND SHIPPING FEES</Typography>
                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '10px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                For orders the prices which are listed at the time of your order on the product page apply. These prices are exclusive of taxes and the final price (inclusive of taxes) are shown in the shopping cart page.
We accepts various credit cards, e.g. Visa, American Express, Master and will charge the invoice to your credit card immediately after receipt and dispatch of the order.
                </Typography>
            </div>

            <div>
                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'left', fontFamily: 'Montserrat' }}>COUPENS</Typography>
                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '10px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                Coupens are only valid for the period announced at issue or a maximum of 1 year from the time of issuance. An extension or a transfer to another user/ customer is not possible.
Coupens are non-transferable.
Coupens cannot be deducted from shipping costs, if applicable.
                </Typography>
            </div>

            <div>
                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'left', fontFamily: 'Montserrat' }}>DELIVERY</Typography>
                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '10px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                Delivery will only be given to the shipping address provided by you. It is your responsibility that it is possible to ship to the address during normal working hours.
We ship according to the delivery timelines provided for each product. We ensure that we ship as early as possible, but for some products the timelines are longer due to availability of products.
CeylonFolk does not assume any sourcing risk especially with reference to a purchase by description. For returns policies, please check our section on Delivery and Returns.
                </Typography>
            </div>

            <div>
                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'left', fontFamily: 'Montserrat' }}>SERVICE AND COMPLAINTS</Typography>
                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '10px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                The satisfaction of our members is close to our hearts. Therefore, we endeavor to deal with your concerns as quickly as possible and always provide you with our feedback after receiving your input. For service inquiries, please contact our customer service department.
                </Typography>
            </div>

            <div>
                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'left', fontFamily: 'Montserrat' }}>DATA SECURITY</Typography>
                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '10px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                As part of your registration as a customer on ceylonfolk.com you will be asked to provide personal data. This is data which is required by us to process the contracts concluded on www.ceylonfolk.com. All personal data is confidential and will be treated by us in accordance with relevant legal regulations. To safeguard your privacy in online payment transactions CeylonFolk.com uses the latest encryption techniques through our payment gateways.
                </Typography>
            </div>

            <div>
                <Typography variant="h5" style={{ marginTop: '50px', textAlign: 'left', fontFamily: 'Montserrat' }}>IMAGE RIGHTS</Typography>
                <Typography className={classes.subText} style={{ marginTop: '20px', marginLeft: '10px', marginRight: '95px', fontFamily: 'Montserrat', textAlign: 'cebter' }}>
                All rights to use imagery on ceylonfolk.com lie with ceylonfolk. The use of the material - in whatever form - is prohibited unless explicit permission from ceylonfolk has been granted.
                </Typography>
            </div>



            <Footer />
        </div>
    );
};

export default Shop;