const Listing = require("../models/listing")
const Review = require("../models/review")


//reviews
//post route
module.exports.createReview = async(req,res) =>{
    let listing = await Listing.findById(req.params.id); //fetch all details of mentioned id and store inside listing
    let newReview = new Review(req.body.review);  //store whatever you write inside review--->comment
    newReview.author = req.user._id;  //new review created set its author
    listing.reviews.push(newReview);  //review arfray inside listing got the newReview content
    await newReview.save();
    await listing.save();
    req.flash("success","new Review Created!")         // flash message when new Review create
    res.redirect(`/listings/${listing._id}`);
};


  //delete review route
module.exports.destroyReview=async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); 
    await Review.findByIdAndDelete(reviewId);   //delete from reviews model
    req.flash("success","Review Deleted!")         // flash message when new Review Delete
    res.redirect(`/listings/${id}`);
}