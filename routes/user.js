const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get("/signin", (req,res)=>{
    return res.render("signin.ejs");
});

router.get("/signup", (req,res)=>{
    return res.render("signup");
});

router.post("/signin", async(req,res)=>{
    const {email, password}= req.body;
    try{
    const token = await User.matchPasswordAndCreateToken(email, password);
    
    return res.cookie("token",token).redirect("/");
    } catch(e){
        console.log(`Error: Problem with token in signin ${e}`);
        return res.render("signin",{error: "Invalid email or password"});
    };
});

router.get("/logout",(req,res)=>{
    return res.clearCookie("token").redirect("/");
});

router.post("/signup", async (req,res)=>{
    const {fullName, email, password}= req.body;
    await User.create({fullName, email, password});
    return res.redirect("/");
});

module.exports = router;
