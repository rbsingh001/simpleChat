const express = require("express");

const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(loginRoutes);


console.log("Hello")

app.listen(3000);