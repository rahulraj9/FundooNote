const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const port = 8000;
const dotenv = require("dotenv");
// get config vars
dotenv.config();

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json')

const user = require('./routes/userroute')
const note = require('./routes/Noteroute')
const label = require('./routes/LabelRoute')

// parse application/json
app.use(bodyParser.json())


app.use('/user', user)
app.use('/', note)
app.use('/label',label)


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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