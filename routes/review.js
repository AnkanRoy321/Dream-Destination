const express = require("express");
const router = express.Router({ mergeParams:true});

const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
// const {reviewSchema} = require("../schema.js")  //require joi schema of listing,review
const Listing = require("../models/listing.js");  //require model
const Review = require("../models/review.js");  //require review model
const {
  validateReview, 
  isLoggedIn,
  isReviewAuthor
} = require("../middleware.js")  //require to check if user is logged in or not





// //-------------------------------to validate joi schema of review create a function---------------------
// const validateReview = (req,res,next)=>{
//     let {error} = reviewSche ma.validate(req.body);   //validate req.body with listingSchema and whatever erroe generate store it inside error
//     if(error){
//       let errmsg = error.details.map((el)=>el.message).join(",");  //all error details are joined with tyhe help of ,
//       throw new ExpressError(400,errmsg);
//     } else{
//       next();
//     }
//     };
    

const reviewController = require("../controllers/reviews.js")
const review = require("../models/review.js");  //require model



//reviews
//post route
// router.post(
//     "/",
//     isLoggedIn,
//     validateReview,
//     wrapAsync (async(req,res) =>{
//     let listing = await Listing.findById(req.params.id); //fetch all details of mentioned id and store inside listing
    
//     let newReview = new Review(req.body.review);  //store whatever you write inside review--->comment
//     // console.log(newReview)
//     newReview.author = req.user._id;  //new review created set its author
//     // console.log(newReview);  //printing all details of review
  
//     listing.reviews.push(newReview);  //review arfray inside listing got the newReview content 
  
//     await newReview.save();
//     await listing.save();
  
//     req.flash("success","new Review Created!")         // flash message when new Review create

//     // console.log("new review save");
//     // res.send("new review saved");
//     res.redirect(`/listings/${listing._id}`);
//     })
//   );

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync (reviewController.createReview)
);





  //delete review route
//   router.delete(
//     "/:reviewId",
//     isLoggedIn,
//     isReviewAuthor,
//     wrapAsync(async (req,res)=>{
//       let {id,reviewId} = req.params;
//       await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); 
//       await Review.findByIdAndDelete(reviewId);   //delete from reviews model
//       req.flash("success","Review Deleted!")         // flash message when new Review Delete
//       res.redirect(`/listings/${id}`);
  
//     })
// )

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
)
  


module.exports = router;
