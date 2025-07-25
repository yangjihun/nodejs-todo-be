const express = require('express');
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const app = express();
const corsOptions = {
  origin: 'https://todo-dem.netlify.app',
  credentials: true,
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server on")
});

