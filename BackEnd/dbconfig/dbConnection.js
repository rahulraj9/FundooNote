const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/FundooNote", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection Establised Sucessfully!");
}).catch((e) => {
    console.log("noconnection");
})