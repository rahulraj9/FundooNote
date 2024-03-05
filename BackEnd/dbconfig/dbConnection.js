const mongoose = require("mongoose");


mongoose.connect(`mongodb+srv://${process.env.user_name}:${process.env.password}@cluster0.txnesuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection Establised Sucessfully!");
}).catch((e) => {
    console.log("noconnection",e);
})