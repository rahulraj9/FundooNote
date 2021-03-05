const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const dotenv = require("dotenv");
// get config vars
dotenv.config();
// access config var
process.env.TOKEN_SECRET;
const route = require('./routes/authroute')
// parse application/json
app.use(bodyParser.json())
app.use(require('body-parser').urlencoded({ extended: true }));
const port = 8000;
app.use('/', route)
app.use((error, req, res, next) => {
    let response = {
        success: false,
        message: "Internal Server Error",
        error: error
    }
    res.status(500).send(response);
})
app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
    require('./dbconfig/dbConnection')
})