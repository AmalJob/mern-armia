const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const UserRoute = require("./Routes/User");
const TodoRoute = require('./Routes/Todo');
const cors = require('cors');

 dotenv.config();
// database connection

mongoose.connect(
    process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("database connected");
  }
);

// middlewares

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
// routes
app.use("/users", UserRoute);
app.use('/todos',TodoRoute);

// server connection

app.listen(process.env.PORT, () => {
  console.log("server connected");
});

app.get("/", (req, res) => {
  res.send("Hello ");
});
