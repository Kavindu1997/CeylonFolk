const express = require("express");
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors());
const db = require('./models');

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder
// app.use('/public',express.static(path.join(_dirname,'public')));

//Body Parser Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

// Routers
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

const contactusRouter = require('./routes/Contactus');
app.use("/contact", contactusRouter);

const inventoryRouter = require('./routes/Inventory');
app.use("/invent", inventoryRouter);

const wishlistRouter = require('./routes/Wishlist');
app.use("/wishlist", wishlistRouter);

const collectionRouter = require("./routes/Collections");
app.use("/collect", collectionRouter);
app.use("/collection", collectionRouter);
app.use('/public', express.static('public'));

const designRouter = require("./routes/Designs");
app.use("/designs", designRouter);
app.use('/public', express.static('public'));

const customizeRouter = require("./routes/CustomizeOrders");
app.use("/customizeOrders", customizeRouter);
app.use('/public', express.static('public'));

const productDetailsRouter = require('./routes/ProductDetails');
app.use("/ProductDetails", productDetailsRouter);

const couponRouter = require('./routes/Coupons');
app.use("/coupons", couponRouter);

const offerRouter = require("./routes/Offers");
app.use("/offers", offerRouter);

const checkoutRouter = require('./routes/Checkout');
app.use("/check", checkoutRouter);

const shopRouter = require('./routes/Shop');
app.use("/shop", shopRouter);

const inventorySearchRouter = require("./routes/Inventory.route");
app.use("/inventSearch", inventorySearchRouter);

const ordersRouter = require('./routes/Orders');
app.use("/placeOrder", ordersRouter);

const cRouter = require('./routes/Colors');
app.use("/availableColors", cRouter);

const sizesRouter = require('./routes/Sizes');
app.use("/sizes", sizesRouter);

const typesRouter = require("./routes/Types");
app.use("/types", typesRouter);
app.use('/public', express.static('public'));

const depositRouter = require('./routes/Deposit');
app.use("/deposit", depositRouter);
app.use("/depositCollection", depositRouter);
app.use('/public', express.static('public'));

const orderRouter = require('./routes/Orders');
app.use("/order", orderRouter);

const notificationsRouter = require('./routes/Notifications');
app.use("/notifications", notificationsRouter);

const profileRouter = require('./routes/Profile');
app.use("/profileroute", profileRouter)


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

