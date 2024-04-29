const express = require("express");
const app=express();
port=8080;
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");  //require model
const methodOverride = require("method-override")  //require to apply put and delte request on from inside edit.ejs and show.ejs
const ejsMate = require('ejs-mate')  //require ejs mate



//setting ejs
const path=require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))  //for put and delete request
app.engine('ejs', ejsMate);   //for ejs-mate
app.use(express.static(path.join(__dirname,"/public")))


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


app.get('/',  (req, res)=> {  //root
    res.send('hi i am root')
  })


//index route
app.get("/listings",async (req,res)=>{
  let allListings = await Listing.find({})
  // console.log(allListings)
  res.render ("listings/index.ejs",{allListings})
});



//new route ------ Create new Listing
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs")
})


//show route
app.get('/listings/:id',async(req,res)=>{
  let {id}=req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
})


//Create Route
app.post("/listings",async(req,res)=>{
  let listing = req.body.listing;
  const newListing = new Listing(listing);
  await newListing.save();
  res.redirect("/listings");
})


//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs",{listing})
})

//update route
app.put("/listings/:id", async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
})



//delete 
app.delete("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect('/listings');
})









// app.get("/testListing",async (req,res)=>{  //testListing root to insert data
//   let sampleListing =new Listing({
//     title:"My new Villa",
//     description:"by the beach",
//     image:"",
//     price:1200,
//     location:"calangute,Goa",
//     country:"India",
//   });
//   await sampleListing.save()  //saving data
//   console.log("sample saved");
//   res.send("succesful testing");
    // .then((res)=>{
    //   console.log(res);
    // })
    // .catch((err)=>{
    //   console.log(err);
    // })
// });




//server starting
app.listen((port),()=>{
    console.log(`server started at port ${port}`);
  })
  