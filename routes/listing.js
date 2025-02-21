const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expressError.js");
const listingSchema = require("../schema.js")
const {isLoggedIn} = require("../middleware.js");
const User = require("../models/user.js");

const validateSchema = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
      throw new ExpressError(error.details[0].message, 400);
  }
  next();
};

  router.get("/",
    
    wrapAsync(
    async (req, res)=>{
      const listings = await Listing.find({});
      if(!listings){
        throw new ExpressError('No listings found', 404);
      }
      res.render('home', {listings});
  }))

  router.get("/new",
    isLoggedIn,
    (req, res)=>{
    res.render('new')
  })
  router.get("/login",
    (req, res) => {
      res.render("login");
    });
    
  router.get("/signup",(req, res )=>{
      res.render("signup");
  });

  router.get("/profile", isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate({
            path: "listings",  // ✅ Ensure this matches the User model
            model: "Listing"
        });

        if (!user) {
            throw new ExpressError("User not found", 404);
        }

        console.log("Populated User Data:", user); // ✅ Debugging
        res.render("profile", { user });
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
});



  router.get("/:id", isLoggedIn, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const cleanId = id.replace(/^:/, "");
    const listing = await Listing.findById(cleanId).populate("owner");
    res.render('show', { listing });
  }));
  
  
  // post for new listing
  router.post("/",
    isLoggedIn,
    (req, res, next) => {
      console.log("Incoming Request Body:", req.body); // Log the full request body
      next(); // Move to validation middleware
    },
    validateSchema, // This is causing the error
    wrapAsync(async (req, res) => {
      const listing = new Listing(req.body.listing);
      listing.owner = req.user._id; 
      await listing.save();
      await User.findByIdAndUpdate(req.user._id, { $push: { listings: listing._id } });
      
      res.redirect("/listing");
    })
  );
  
  
  
  // edit 
  
  router.get("/:id/edit",
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listing");
        }

        res.render("edit", { listing });
    })
);

  
  router.put("/:id",
    isLoggedIn,
    validateSchema,
    wrapAsync(
    async(req, res )=>{
    const {id} = req.params;
    let listing = req.body.listing;
    const Updated = await Listing.findByIdAndUpdate(id ,listing)
  
    console.log(Updated)
    res.redirect(`/listing/${id}`)
  }))
  
  router.delete("/:id", 
    isLoggedIn,
    wrapAsync(
    async (req, res )=>{
    const {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    if(!listing){
      throw new Error("Listing not found")
    }
    // console.log(delListing)
    res.redirect("/listing")
  }))
  
  
  
  
  
  router.post("/filter", 
    wrapAsync(async (req, res) => {
    const { search, sortBy, order } = req.body;
    let filter = {};
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { technology: { $regex: search, $options: "i" } }
        ];
    }
    
    let sortOptions = {};
    if (sortBy) {
        sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    const listings = await Listing.find(filter).sort(sortOptions);
    res.render("filter", { listings });
}));

  


  module.exports = router;

