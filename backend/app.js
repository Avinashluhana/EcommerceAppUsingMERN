const cookieParser = require("cookie-parser");
const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

dotenv.config({ path: "backend/config/config.env" });


// Routes imports

const product = require("./routes/productRoute");
const user = require("./routes/userRouter");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment)

// error middle ware

app.use(errorMiddleware);

module.exports = app;
