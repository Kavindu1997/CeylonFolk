const express = require("express");
const app = express();
const cors = require('cors');

// const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors());

const db = require('./models');

// Routers
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

const contactusRouter = require('./routes/Contactus');
app.use("/contact", contactusRouter);

const inventoryRouter = require('./routes/Inventory');
app.use("/invent",inventoryRouter);

const wishlistRouter = require('./routes/Wishlist');
app.use("/wishlist", wishlistRouter);

const collectionRouter = require("./routes/Collections");
app.use("/collect", collectionRouter);

// const couponRouter = require('./routes/Coupons');
// app.use("/coupons", couponRouter);

// const checkoutRouter = require('./routes/Checkout');
// app.use("/check", checkoutRouter);


const inventorySearchRouter = require("./routes/Inventory.route");
app.use("/inventSearch", inventorySearchRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});