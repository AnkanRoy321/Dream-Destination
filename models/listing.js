const mongoose = require("mongoose");
const Schema = mongoose.Schema;   //creating schema
const Review = require("./review.js")  //require review model



const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    // image: {                                    // Define an image object within the listing schema
    //     filename: {                             // Filename property of the image
    //         type: String,                       // Data type is string
    //         default: "listingimage",             // Default value if not provided
    //     },
    //     url: {                                     // URL property of the image
    //         type: String,                          // Data type is string
    //         default: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60", // Default value for the image URL
    //     },
    // },
    image:{
        // type:String,
        // default:"https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",   //problem 1
        // set:(v)=>
        // v===""
        // ?"https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // :v,  //if v has no valiue then default link
        url:String,
        filename:String
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    reviews:[   //reviews model
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    // category:{
    //     type:String,
    //     enum:["mountains","arctic","farms","deserts"]
    // }
});


//middelware to delete reviews of a particular listing
listingSchema.post("findOneAndDelete",async (listing) =>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}})  //delete all id of review present inside listing.reviews
    }
})


//creating model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;  //exporting 
