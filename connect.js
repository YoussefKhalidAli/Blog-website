const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://youssof:Goatforce69@practicecluster.rdfjovx.mongodb.net/?retryWrites=true&w=majority";
const connectdb = async function () {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("connected succesfully");
  } catch (err) {
    console.log("error connecting");

    process.exit(1);
  }
};

module.exports = connectdb;
