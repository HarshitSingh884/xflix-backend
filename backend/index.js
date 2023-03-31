const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");
// const config = require("./config/config");


mongoose.connect(`${process.env.MONGODB_URL}`,{
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("Connected to MongoDB");
    server=app.listen(`${process.env.PORT_NO}`,()=>{
        console.log(`Listening to port ${process.env.PORT_NO}`);
    });
});