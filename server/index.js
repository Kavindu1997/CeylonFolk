const express = require("express");
const app = express();

const db = require('./models');

// Routers
const userRouter = require('./routes/Users');
app.use("/users", userRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

