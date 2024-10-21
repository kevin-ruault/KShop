const express = require("express");
const connectDB = require("./config/db");
const port = 5000;
const cors = require("cors");
const path = require("path");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/product", require("./routes/product.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/cart", require("./routes/cart.routes"));
app.use("/order", require("./routes/order.routes"));

app.listen(port, () => console.log("Server starts on port " + port + " ✅"));
