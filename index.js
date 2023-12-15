require("dotenv").config();

const express = require("express");
const app = express();

const connectdb = require("./connect");
connectdb();

app.use(express.json({ extended: false }));

app.use("/register", require("./API/routes/register"));
app.use("/login", require("./API/routes/login"));
app.use("/post", require("./API/routes/post"));
app.use("/images", express.static(__dirname + "/images"));

const PORT = process.env.REACT_APP_PORT || 4000;
app.listen(PORT, () => console.log(PORT));
