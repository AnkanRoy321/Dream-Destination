const Listing = require("./models/listing")  //require listing model
const Review = require("./models/review")  //require listing model

const ExpressError = require("./utils/ExpressError.js")
const {listingSchema,reviewSchema} = require("./schema.js")  //require joi schema of listing,review


module.exports.isLoggedIn = (req,res,next) => {    //isLoggedIn checked user is logged in or not
    // console.log(req.user)   //used to check if user is logged in or not
    // console.log(req.path , "..", req.originalUrl);
    if(!req.isAuthenticated()){   //if user is not logged in
        req.session.redirectUrl = req.originalUrl;  //storeing the path where we should go after login
        req.flash("error","you must be logged in to create listing");
        return res.redirect("/login");
      }
      next(); //if user is logged in then call the next
}


//middleware for the path where we should go after login
module.exports.saveRedirectUrl = (req,res,next) =>{
    if( req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}


//  middleware to authorization for /listing
module.exports.isOwner= async (req,res,next) => {  //isOwner check is current user is the owner of any particular listing
    let {id}=req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of the listing");
        return res.redirect(`/listings/${id}`);
    }
  next()
}



module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);   //validate req.body with listingSchema and whatever erroe generate store it inside error
    if(error){
      let errmsg = error.details.map((el)=>el.message).join(",");  //all error details are joined with tyhe help of ,
      throw new ExpressError(400,errmsg);
    } else{
      next();
    }
  };




//-------------------------------to validate joi schema of review create a function---------------------
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);   //validate req.body with listingSchema and whatever erroe generate store it inside error
    if(error){
      let errmsg = error.details.map((el)=>el.message).join(",");  //all error details are joined with tyhe help of ,
      throw new ExpressError(400,errmsg);
    } else{
      next();
    }
    };


//  middleware to authorization for /listing
module.exports.isReviewAuthor= async (req,res,next) => {  //isOwner check is current user is the owner of any particular listing
  let {id,reviewId}=req.params;  //accessing both review_id and user_id
  let review =await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){   //review author same as current user
      req.flash("error","you are not the author of the listing");
      return res.redirect(`/listings/${id}`);
  }
next()
}