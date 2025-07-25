const express = require("express");
const mongoose = require("mongoose");
const app = express();
const indexRouter = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", indexRouter);
const mongoURI = process.env.MONGODB_URI_PROD;

mongoose
    .connect(mongoURI, {useNewUrlParser:true})
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((err) => {
        console.log('DB connection fail', err)
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server on")
});

