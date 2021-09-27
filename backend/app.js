const express = require("express");
const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

// 1) Middleware
// All middleware functions are executed in the order they are in the code

// Express doesn't put that body data on the request, and in order to have data available, we have to use middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Development logging
// Use logging and dotenv when in "development"
if (process.env.NODE_ENV === "DEVELOPMENT") {
  require("dotenv").config({ path: "backend/config/config.env" });
  app.use(morgan("dev"));
}

// 2) Routes(Mounting Routers)
// In each middleware function we have access to the 'request', 'response' , 'next'
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(`Request Time from middleware ${req.requestTime }`);  
  next();
});

// Import all routes
const products = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
