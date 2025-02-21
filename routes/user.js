
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require('passport');
const { saveRedirectUrl } = require("../middleware.js");

// ✅ FIXED SIGNUP ROUTE: Auto-login after signup
router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        console.log("📩 Signup Request Body:", req.body);
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        // Automatically login user after signup
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to the site!");
            res.redirect("/listing");
        });

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}));

// ✅ FIXED LOGIN ROUTE: Ensure proper redirection
router.post("/login", 
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }), 
    (req, res) => {
        req.flash("success", "Welcome back!");
        const redirectUrl = req.session.redirectUrl || "/listing";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    }
);

// ✅ FIXED LOGOUT ROUTE
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged out!");
        res.redirect("/listing");
    });
});

module.exports = router;
