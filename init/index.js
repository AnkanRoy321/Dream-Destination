const mongoose = require("mongoose");
const initdata = require("./data.js"); //require data(key) as a object by the name of initdata(object)
const Listing = require("../models/listing.js");  //require model



//connecting with database
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
.then((res)=>{
    console.log("connected to db");
})
.catch(err => console.log(err));



//initDB() to initialise all data
const initDB = async ()=>{
    await Listing.deleteMany({});  //first we delete all initially inserted data

    initdata.data=initdata.data.map((obj) =>({     //add owner in each object
      ...obj,
      owner:"663b00e5cf8e6dab9522a179",
    }))

    await Listing.insertMany(initdata.data)  //now after deleting all data we insert some data which is required as initdata object from data.js->initdata.data ,data is the key of object
    console.log("data was initialized");
}
initDB();  //'function calling


