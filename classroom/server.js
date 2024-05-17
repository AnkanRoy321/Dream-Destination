const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash');
const path=require("path")
//using views to show message   
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



// //implementing express session  ---->>method 1
// app.use(session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     // cookie: { secure: true }
//     })
// );


//---------------------------------storeing and using session info---------------------------

//implementing express session  ---->>method 2
const sessionOptins = {
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
};
app.use(session (sessionOptins));
app.use(flash());   //for flashing message

//middleware
app.use((req,res,next) =>{
    res.locals.successMsg=req.flash("success");
    res.locals.errorMsg=req.flash("error");
    next();
})



app.get('/register',  (req, res) => {
    let {name="anonymous"} = req.query;
    req.session.name=name;  //store the name
    // console.log(req.session.name);
    if(name === "anonymous"){
        req.flash("error", "user not registerd")
    }
    else{
        req.flash("success", "user registerd successfully!")
    }
    res.redirect("/hello");
    // res.send(name);
})

app.get('/hello',  (req, res)=> {
    // res.send(`hello ${req.session.name}`)
    // console.log(req.flash("success"))

    // res.locals.successMsg=req.flash("success");
    // res.locals.errorMsg=req.flash("error");

    // res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
    res.render("page.ejs",{name:req.session.name});

})


// -----------------------connect flash-------------------------











//   //count number of request in a same session
// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// })






app.get('/test',  (req, res)=> {
    res.send('test succesful')
})


app.get('/',  (req, res)=> {
    res.send('test succesful')
})

app.listen(3000,()=>{
    console.log("server started at 3000")
})