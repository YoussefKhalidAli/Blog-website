const mongoose = require("mongoose");

const connectdb = async function () {
  try {
    await mongoose.connect(process.env.REACT_APP_MONGO_URI);

    console.log("connected succesfully");
  } catch (err) {
    console.log("error connecting");

    process.exit(1);
  }
};

module.exports = connectdb;
