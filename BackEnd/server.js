const express = require('express');
const app = express();
const port = 8000;
var bodyParser = require('body-parser')

const dotenv = require("dotenv");
dotenv.config();


var cors = require('cors')

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json')

const user = require('./routes/userroute')
const note = require('./routes/Noteroute')
const label = require('./routes/LabelRoute')

// parse application/json
app.use(bodyParser.json())
app.use(cors())


app.use('/user', user)
app.use('/', note)
app.use('/', label)


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

module.exports = app //exports the server for testing purposes.