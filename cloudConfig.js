const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//pass configaration details------to add backend with cloudanary we nedd those information
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


//define storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',     //where you store in cloudanary, that folder name
      allowerdFormates:["png","jpg","jpng"] // expected formate of file
    },
});

module.exports={
    cloudinary,
    storage,
}