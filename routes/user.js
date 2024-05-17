const express = require("express");
const router = express.Router();
const User = require("../models/user.js");  //require user model
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport"); //require passport
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js")




router
    .route("/signup")
    .get(userController.renderSignupForm)      //signup---get
    .post(wrapAsync(userController.signup))    //signup---post


router
    .route("/login")
    .get(userController.renderLoginForm)   //login--get
    .post(   //login--post
        saveRedirectUrl,  //when we login call this method to fetch the path which already saved 
        passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash:true,
        }),
        userController.login
    )
        









// -----------------------signup--------------------

// get request to render a form
// router.get("/signup",(req,res)=>{
//     res.render("users/signup.ejs");
// })

// router.get("/signup",userController.renderSignupForm)

//post request 
// router.post("/signup",wrapAsync(async (req,res)=>{
//     try {
//         let {username,email,password}=req.body; //fetch details
//         const newUser = new User({email,username});  //creating a new user instance
//         const registeredUser = await User.register(newUser,password); //regiater newUser
//         console.log(registeredUser)
//         req.login(registeredUser,(err)=>{   //automatically login when user signup
//             if(err){
//                 return next(err);
//             }
//             req.flash("success","Welcome to Wandarlust");
//             res.redirect("/listings");
//         })
        
//     //   res.send(registeredUser);
//     }catch(e){
//         req.flash("error",e.message)
//         res.redirect("/signup");
//     }
// })
// );

// router.post("/signup",wrapAsync(userController.signup));

// -----------------------signup--------------------




// ------------------------login-------------------------------

//get request
// router.get("/login",(req,res)=>{
//     res.render("users/login.ejs");
// })

// router.get("/login",userController.renderLoginForm)

//post request 
// router.post(
//     "/login",
//     saveRedirectUrl,  //when we login call this method to fetch the path which already saved 
//     passport.authenticate("local",{
//     failureRedirect: "/login",
//     failureFlash:true,
//     }),
//     async(req,res)=>{
//         req.flash("success","welcome to wandarlust you are logged in!");

//         let redirectUrl=res.locals.redirectUrl || "/listings";
//         res.redirect(redirectUrl);

//         // res.redirect(res.locals.redirectUrl)
//     }
// );
// router.post(
//     "/login",
//     saveRedirectUrl,  //when we login call this method to fetch the path which already saved 
//     passport.authenticate("local",{
//     failureRedirect: "/login",
//     failureFlash:true,
//     }),
//     userController.login
// );
// ------------------------login-------------------------------




// ------------------------log out-------------------------------
// router.get("/logout",(req,res,next)=>{
//     req.logOut((err)=>{       //
//         if(err){
//             return next();
//         }
//         req.flash("success","you are logged out");
//         res.redirect("/listings");
//     })
// })
router.get("/logout",userController.logout)
// ------------------------log out-------------------------------




module.exports =router;
