const express = require('express');
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api',indexRouter);
const mongoURI = process.env.MONGODB_URI_PROD;

mongoose
    .connect(mongoURI, {useNewUrlParser:true})
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((err) => {
        console.log('DB connection fail', err)
    });

app.listen(5000, () => {
    console.log("server on 5000")
});

