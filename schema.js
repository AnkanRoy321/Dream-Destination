//create a joi schema
const Joi = require('joi');  //require joi


// ---------------------------for listing validation--------------------
module.exports.listingSchema = Joi.object({  //exporting schema
    listing : Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null)  //image can be empty or null
    }).required()
});


// ---------------------------for review validation--------------------
module.exports.reviewSchema = Joi.object({  //exporting schema which required in app.js
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})