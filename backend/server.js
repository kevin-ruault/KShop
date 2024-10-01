const express = require("express");
const connectDB = require("./config/db");
const port = 5000;
const cors = require("cors");
const path = require("path");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/product", require("./routes/product.routes"));
app.use("/user", require("./routes/user.routes"));

app.listen(port, () => console.log("Server starts on port " + port + " ✅"));
