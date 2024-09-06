const express = require("express");   //require express
const router = express.Router();   //create router object

const wrapAsync = require("../utils/wrapAsync.js")
// const {listingSchema} = require("../schema.js")  //require joi schema of listing,review
// const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js");  //require model
const {isLoggedIn, isOwner,validateListing} = require("../middleware.js")  //require to check if user is logged in or not


const listingController = require("../controllers/listings.js")

//require and initialize multer
const multer  = require('multer')

const {storage}=require("../cloudConfig.js")

// const upload = multer({ dest: 'uploads/' })
const upload = multer({storage})  //update destination








// const validateListing = (req,res,next)=>{
//   let {error} = listingSchema.validate(req.body);   //validate req.body with listingSchema and whatever erroe generate store it inside error
//   if(error){
//     let errmsg = error.details.map((el)=>el.message).join(",");  //all error details are joined with tyhe help of ,
//     throw new ExpressError(400,errmsg);
//   } else{
//     next();
//   }
// };


//reforming index route and cretae route
router
  .route("/")
  .get(wrapAsync (listingController.index))   //index
  .post(   //cretae
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,  //pass as middleware
    wrapAsync (listingController.createListing)
  );
  // .post upload.single('listing[image]'),((req,res)=>{
  //   res.send(req.file);
  // })

  
//------------------------new route ------
router.get("/new",isLoggedIn,listingController.renderNewForm)


//reforming show route , update route and delete
router
  .route("/:id")
  .get(wrapAsync (listingController.showListing))   //show
  .put(    //update
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
  )
  .delete(  //delete
    isLoggedIn,
    isOwner,
    wrapAsync (listingController.destroyListing)
  );





//------------------------index route-----------------------------------
// router.get(
//   "/",
//   wrapAsync(async (req,res)=>{
//     let allListings = await Listing.find({})
//     // console.log(allListings)
//     res.render ("listings/index.ejs",{allListings})
//   })
// )

// router.get("/",wrapAsync (listingController.index));

//------------------------index route-----------------------------------

  
  
  //------------------------new route ------ Create new Listing------------------------------
  // router.get("/new",
  //   isLoggedIn, 
  //   (req,res)=>{
  //   // console.log(req.user);
  //   res.render("listings/new.ejs")
  // })

  //  router.get("/new",isLoggedIn,listingController.renderNewForm)

//------------------------new route ------ Create new Listing------------------------------
  
  

  //----------------------------------show route-----------------------------
  // router.get('/:id',
  //     wrapAsync (async(req,res)=>{
  //   let {id}=req.params;
  //   const listing = await Listing.findById(id)
  //   // .populate("reviews")  //information of reviews
  //   .populate({
  //     path:"reviews",
  //     populate: {
  //       path:"author",
  //     },
  //   })
  //   .populate("owner");   //information of owner

  //   if(!listing){   //if listing does not exist
  //     req.flash("error","Listing you requested does not exist!")         // flash message when new listing create
  //     res.redirect("/listings");
  //   }
  //   else{
  //     console.log(listing);  //details of a particular listing
  //     res.render("listings/show.ejs",{listing});
  //   }
  // })
  // );

  // router.get('/:id',wrapAsync (listingController.showListing))

  //----------------------------------show route-----------------------------


  


//------------------------Create Route   -----------------------------  ---->useful when we send any post request from hopscotch
// router.post(
//   "/",
//   isLoggedIn,
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

//     // console.log(req.user);
//     newListing.owner = req.user._id;     //add current user id to newly created listing
//     await newListing.save();

//     req.flash("success","new listing Created!")         // flash message when new listing create
//     res.redirect("/listings");
//   })
// );

// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,  //pass as middleware
//   wrapAsync (listingController.createListing)
// );

//------------------------Create Route   ----------------------------- 




//------------------------------------------------Edit Route-------------------------------------------
// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync (async(req,res)=>{
//   let {id}=req.params;
//   const listing = await Listing.findById(id);
//   if(!listing){
//     req.flash("error","Listing you requested does not exist!")         // flash message when new listing create
//     res.redirect("/listings");
//   }
//   else{
//     res.render("listings/edit.ejs",{listing})
//   }
// })
// );

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync (listingController.renderEditForm)
);
//------------------------------------------------Edit Route-------------------------------------------







//-------------------------------------- update route------------------------------
// router.put("/:id",
// isLoggedIn,
// isOwner,
// validateListing,
// wrapAsync(async (req,res)=>{

//   let {id}=req.params;

//   // let listing =await Listing.findById(id);
//   //   if(!listing.owner.equals(res.locals.currUser._id)){
//   //       req.flash("error","you are not the owner of the listing");
//   //       return res.redirect(`/listings/${id}`);
//   // }

//   // console.log("The update status: ", req.body.listing)
  
//   await Listing.findByIdAndUpdate(id, {...req.body.listing});
//   req.flash("success"," listing Updated!")         // flash message when  listing updated
//   res.redirect(`/listings/${id}`);
//   })
// );

// router.put("/:id",
// isLoggedIn,
// isOwner,
// validateListing,
// wrapAsync(listingController.updateListing)
// );

//-------------------------------------- update route------------------------------



// //update route
// app.put(
//   "/listings/:id",
//   validateListing,
//   wrapAsync (async (req,res)=>{
//     // if(!req.body.listing){
//     //   throw new ExpressError(400,"send valid data for listing")
//     // }
//     let {id}=req.params;  //store id
//     const { image } = req.body.listing;   //fetch the image object

//     // Update image object separately
//     const updatedListing = { ...req.body.listing, image: { filename: image.filename, url: image.url } };
//     //...req.body.listing --->> all property remain same
//     //image: { filename: image.filename, url: image.url }    --->> only two property inside image object update (i)inside filename---->image.filename   (ii)inside url---->image.url

//     await Listing.findByIdAndUpdate(id, updatedListing);
//     res.redirect(`/listings/${id}`);
// })
// );





//------------------------delete--------------------------------

// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync (listingController.destroyListing)
// );

//------------------------delete--------------------------------


module.exports = router;