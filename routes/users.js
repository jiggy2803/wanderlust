const express = require("express");
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

router.get("/signup", (req, res) => {
    res.render("./userPages/signup.ejs");
})

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome Onboard ! ")
            res.redirect("/listings")
        })
        
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("/signup")
    }

}))

router.get("/login", (req, res) => {
    res.render("./userPages/login.ejs")
})

router.post("/login",savedRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}),async(req,res)=>{
    req.flash("success","Logged in Successfully");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
})

router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","you logged out successfully");
        res.redirect("/listings");
    })
})

module.exports = router;