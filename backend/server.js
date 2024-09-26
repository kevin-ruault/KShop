const express = require("express");
const connectDB = require("./config/db");
const port = 5000;

//DB connection
connectDB();

const app = express();

// Middleware for request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/product", require("./routes/product.routes"));

app.listen(port, () => console.log("Server starts on port " + port + " ✅"));
