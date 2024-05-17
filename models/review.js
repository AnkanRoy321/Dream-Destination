const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({  //creating review schema
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type: Date,
        default:Date.now()  //whenever a new schema created if no date mention then insert current date
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

module.exports = mongoose.model("Review",reviewSchema);