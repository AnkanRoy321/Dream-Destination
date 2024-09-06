const Listing = require("../models/listing")

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//---------------------index Route----------------
module.exports.index=async (req,res)=>{
    let allListings = await Listing.find({})
    // console.log(allListings)
    res.render ("listings/index.ejs",{allListings})
}

//---------------------New Route----------------
module.exports.renderNewForm=(req,res)=>{
      // console.log(req.user);
    res.render("listings/new.ejs")
    }


//---------------------show Route----------------
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    // .populate("reviews")  //information of reviews
    .populate({
        path:"reviews",
        populate: {
        path:"author",
        },
    })
    .populate("owner");   //information of owner
    
    if(!listing){   //if listing does not exist
        req.flash("error","Listing you requested does not exist!")         // flash message when new listing create
        res.redirect("/listings");
    }
    else{
        console.log(listing);  //details of a particular listing
        res.render("listings/show.ejs",{listing});
    }
    };


//---------------------Create Route----------------
module.exports.createListing=async(req,res,next)=>{
    
    // mapb0x
    let responce=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
     .send();

    //   console.log(responce.body.features[0].geometry);
    //   res.send("done!");

    //fetch url and filename from req.file
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url,"..",filename)

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;    // //add current user id to newly created listing
    newListing.image={url,filename}  //add url and filename in image

    newListing.geometry=responce.body.features[0].geometry;
    
    let saveListing=await newListing.save();
    console.log(saveListing)

    req.flash("success","new listing Created!")         // flash message when new listing create
    res.redirect("/listings");
}


//---------------------Edit Route----------------
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested does not exist!")         // flash message when new listing create
    res.redirect("/listings");
    }
    else{
        let originalImageUrl = listing.image.url;
        originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalImageUrl})
    }
}


//---------------------Update Route----------------
module.exports.updateListing=async (req,res)=>{
    let {id}=req.params;
    let liisting = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){  //check in the request file also exists
        let url = req.file.path;
        let filename = req.file.filename;
        liisting.image={url,filename};
        await listing.save();
    }
    

    req.flash("success"," listing Updated!")         // flash message when  listing updated
    res.redirect(`/listings/${id}`);
    }


//---------------------Delete Route----------------
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success"," Listing Deleted!")         // flash message when listing deleted
    res.redirect('/listings');
  }