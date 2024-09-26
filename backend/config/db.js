const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

const connectDB = () => {
  main().catch((err) => console.log(err));
  async function main() {
    await mongoose
      .connect(mongoDB)
      .then(console.log("Mongo successfully connected! ✅"));
  }
};

module.exports = connectDB;
