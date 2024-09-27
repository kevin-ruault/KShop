const express = require("express");
const connectDB = require("./config/db");
const port = 5000;
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/product", require("./routes/product.routes"));

app.listen(port, () => console.log("Server starts on port " + port + " ✅"));
