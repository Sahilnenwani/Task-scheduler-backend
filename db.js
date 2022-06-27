const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("DataBase connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToMongo;
