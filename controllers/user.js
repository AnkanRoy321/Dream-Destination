const User = require("../models/user")





// -----------------------signup--------------------

// get request to render a form
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs");
}

//post request 
module.exports.signup=async (req,res)=>{
    try {
        let {username,email,password}=req.body; //fetch details
        const newUser = new User({email,username});  //creating a new user instance
        const registeredUser = await User.register(newUser,password); //regiater newUser
        console.log(registeredUser)
        req.login(registeredUser,(err)=>{   //automatically login when user signup
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wandarlust");
            res.redirect("/listings");
        })
        
    //   res.send(registeredUser);
    }catch(e){
        req.flash("error",e.message)
        res.redirect("/signup");
    }
}
// -----------------------signup--------------------






// ------------------------login-------------------------------

//get request
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}

//post request
module.exports.login = async(req,res)=>{
    req.flash("success","welcome to wandarlust you are logged in!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}
// ------------------------login-------------------------------




// ------------------------log out-------------------------------

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{       //
        if(err){
            return next();
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
}
// ------------------------log out-------------------------------
