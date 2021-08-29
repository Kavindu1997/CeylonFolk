<<<<<<< Updated upstream
const express = require("express");
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());
const db = require('./models');

//view engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//static folder
// app.use('/public',express.static(path.join(_dirname,'public')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

const productDetailsRouter = require('./routes/ProductDetails');
app.use("/ProductDetails", productDetailsRouter);

 const couponRouter = require('./routes/Coupons');
 app.use("/coupons", couponRouter);

const checkoutRouter = require('./routes/Checkout');
app.use("/check", checkoutRouter);

const shopRouter = require('./routes/Shop');
app.use("/shop", shopRouter);

const inventorySearchRouter = require("./routes/Inventory.route");
app.use("/inventSearch", inventorySearchRouter);

const ordersRouter = require('./routes/Orders');
app.use("/placeOrder", ordersRouter);

const userManageRouter = require('./routes/UserManage');
app.use("/users", userManageRouter);

const cRouter = require('./routes/Colors');
app.use("/availableColors", cRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

=======
var express = require('express')
  , routes = require('./routes')
  , path = require('path'),
	fileUpload = require('express-fileupload'),
	app = express(),
	mysql      = require('mysql'),
	bodyParser=require("body-parser");
	
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'uploadimage'
});
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// development only
 
app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post 
app.get('/profile/:id',routes.profile);
//Middleware
app.listen(8080)
>>>>>>> Stashed changes
