if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}
console.log(process.env.SECRET);




const express = require("express");
const app=express();
port=8080;
const mongoose = require("mongoose");
// const Listing = require("./models/listing.js");  //require model
const methodOverride = require("method-override")  //require to apply put and delte request on from inside edit.ejs and show.ejs
const ejsMate = require('ejs-mate')  //require ejs mate
// const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
// const {listingSchema,reviewSchema} = require("./schema.js")  //require joi schema of listing,review
// const Review = require("./models/review.js");  //require review model

var session = require('express-session')  //require express-session
const MongoStore = require('connect-mongo'); //require connect mongo
var flash = require('connect-flash');  //require session

const passport = require("passport")  //require passport
const LocalStrategy = require("passport-local");  //require passport-local
const User = require("./models/user.js");  //require user model




// const listings = require("./routes/listing.js")   //require  listing route
// const reviews = require("./routes/review.js")   //require review route


const userRouter = require("./routes/user.js")
const listingRouter = require("./routes/listing.js")   //require  listing route
const reviewRouter = require("./routes/review.js")   //require review route





//setting ejs
const path=require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))  //for put and delete request
app.engine('ejs', ejsMate);   //for ejs-mate
app.use(express.static(path.join(__dirname,"/public")))


//connecting with database

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;
async function main() {
  // await mongoose.connect(MONGO_URL);
  await mongoose.connect(dbUrl);
}
main()
.then((res)=>{
    console.log("connected to db");
})
.catch(err => console.log(err));



//connect-mongo
const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,  //hours
});

store.on("error",()=>{  //error in mongo store
  console.log("ERROR in MONGO SESSION STORE",err);
})

//express-session
const sessionoptions = {
  store,  //mongo store related information passing in session
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  },
}







// //-------------------------------to validate joi schema of listing create a function---------------------
// const validateListing = (req,res,next)=>{
//   let {error} = listingSchema.validate(req.body);   //validate req.body with listingSchema and whatever erroe generate store it inside error
//   if(error){
//     let errmsg = error.details.map((el)=>el.message).join(",");  //all error details are joined with tyhe help of ,
//     throw new ExpressError(400,errmsg);
//   } else{
//     next();
//   }
// };

// //-------------------------------to validate joi schema of review create a function---------------------
// const validateReview = (req,res,next)=>{
// let {error} = reviewSchema.validate(req.body);   //validate req.body with listingSchema and whatever erroe generate store it inside error
// if(error){
//   let errmsg = error.details.map((el)=>el.message).join(",");  //all error details are joined with tyhe help of ,
//   throw new ExpressError(400,errmsg);
// } else{
//   next();
// }
// };









// //index route
// app.get("/listings",wrapAsync (async (req,res)=>{
//     let allListings = await Listing.find({})
//     // console.log(allListings)
//     res.render ("listings/index.ejs",{allListings})
//   })
//   );
  
  
  
//   //new route ------ Create new Listing
//   app.get("/listings/new",(req,res)=>{
//     res.render("listings/new.ejs")
//   })
  
  
//   //show route
//   app.get('/listings/:id',wrapAsync (async(req,res)=>{
//     let {id}=req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs",{listing});
//   })
//   );
  


// //Create Route
// app.post(
//   "/listings",
//   validateListing,  //pass as middleware
//   wrapAsync (async(req,res,next)=>{
//     // let result = listingSchema.validate(req.body);   //whatever constrains we define in listingSchema is req.body satisfy all those conditions
//     // console.log(result);
//     // if(result.error){
//     //   throw new ExpressError(400,result.error);
//     // }
//     // if(!req.body.listing){
//     //   throw new ExpressError(400,"send valid data for listing");
//     // }
    
//     const newListing = new Listing(req.body.listing);

//     // if(!newListing.description){
//     //   throw new ExpressError(400,"Description is Missing");
//     // }
//     // if(!newListing.title){
//     //   throw new ExpressError(400,"Title is Missing");
//     // }
//     // if(!newListing.location){
//     //   throw new ExpressError(400,"Location is Missing");
//     // }
//     await newListing.save();
//     res.redirect("/listings");
//   })
// );


// //Edit Route
// app.get(
//   "/listings/:id/edit",
//   wrapAsync (async(req,res)=>{
//   let {id}=req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit.ejs",{listing})
// })
// );

// // update route
// app.put("/listings/:id", async (req,res)=>{
//   let {id}=req.params;
//   console.log("The update status: ", req.body.listing)
//   await Listing.findByIdAndUpdate(id, {...req.body.listing});
//   res.redirect(`/listings/${id}`);
// })


// // //update route
// // app.put(
// //   "/listings/:id",
// //   validateListing,
// //   wrapAsync (async (req,res)=>{
// //     // if(!req.body.listing){
// //     //   throw new ExpressError(400,"send valid data for listing")
// //     // }
// //     let {id}=req.params;  //store id
// //     const { image } = req.body.listing;   //fetch the image object

// //     // Update image object separately
// //     const updatedListing = { ...req.body.listing, image: { filename: image.filename, url: image.url } };
// //     //...req.body.listing --->> all property remain same
// //     //image: { filename: image.filename, url: image.url }    --->> only two property inside image object update (i)inside filename---->image.filename   (ii)inside url---->image.url

// //     await Listing.findByIdAndUpdate(id, updatedListing);
// //     res.redirect(`/listings/${id}`);
// // })
// // );



// //delete
// app.delete(
//   "/listings/:id",
//   wrapAsync (async(req,res)=>{
//   let {id}=req.params;
//   let deleteListing = await Listing.findByIdAndDelete(id);
//   console.log(deleteListing);
//   res.redirect('/listings');
// })
// );










app.use(session(sessionoptions));   //use express-session
app.use(flash());  //use express-session

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));  // use static authenticate method of model in LocalStrategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//connect-flash middleware
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");   //flash message for error
  res.locals.currUser = req.user;   //for fetching data of user during login,signup and logout and store information of current user in currUser
  next();
});


// app.get("/demouser", async (req,res)=>{
//   let fakeUser = new User({
//     email:"student@gamil.com",
//     username:"delta-student"
//   })

//   const registeredUser = await User.register(fakeUser,"helloworld");
//   res.send(registeredUser); 

// })




// app.use("/listings",listings);
// app.use("/listings/:id/reviews",reviews);

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);




// //reviews
// //post route
// app.post(
//   "/listings/:id/reviews",
//   validateReview,
//   wrapAsync (async(req,res) =>{
//   let listing = await Listing.findById(req.params.id); //fetch all details of mentioned id and store inside listing
  
//   let newReview = new Review(req.body.review);  //store whatever you write inside review--->comment
//   // console.log(newReview)

//   listing.reviews.push(newReview);  //review arfray inside listing got the newReview content 

//   await newReview.save();
//   await listing.save();

//   // console.log("new review save");
//   // res.send("new review saved");
//   res.redirect(`/listings/${listing._id}`);
//   })
// );


// //delete review route
// app.delete(
//   "/listings/:id/reviews/:reviewId",
//   wrapAsync(async (req,res)=>{
//     let {id,reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); 
//     await Review.findByIdAndDelete(reviewId);   //delete from reviews model

//     res.redirect(`/listings/${id}`);

//   })
// );



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

app.all("*",(req,res,next) =>{
  next(new ExpressError(404,"page not found!"))
})

//Error handling middleware
app.use((err,req,res,next)=>{
  let {statusCode=500,message="something went wrong"} =err;
  res.status(statusCode).render("error.ejs",{message});
  // res.status(statusCode).send(message);
});

// app.get('/',  (req, res)=> {  //root
//   res.send('hi i am root')
// })




//server starting
app.listen((port),()=>{
    console.log(`server started at port ${port}`);
  })
  