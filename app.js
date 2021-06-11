require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //use to parse input data
const cookieParser = require("cookie-parser");
const cors = require("cors");

//my routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripepayment");

//using express applicication
const app = express();

//DB Connection
//Cloud DB connection string  ==> mongodb+srv://sukhendra523:<password>@cluster0.eaa66.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// Local Db connection string ==> mongoose.connect('mongodb://username:password@host:port/database?options...', {useNewUrlParser: true});
//Local DB connection string >> mongodb://localhost:27017/myapp
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => {
    console.log("Failed to connect databse");
  });

//Middleware
app.use(bodyParser.json()); //you have to parse data,without parsing data you will not get input data in req.body
app.use(cookieParser());
app.use(cors());

//Routes
app.get("/", (req, res) => {
  res.send("home page");
});
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", orderRoute);
app.use("/api", stripeRoute);

//Port
const port = process.env.PORT;

//starting server
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
