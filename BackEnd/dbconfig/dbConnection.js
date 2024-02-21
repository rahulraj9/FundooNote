const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/FundooNote", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection Establised Sucessfully!");
}).catch((e) => {
    console.log("noconnection",e);
})