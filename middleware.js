
const Listing = require("./models/listing.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;  // Save original URL for redirection
        req.flash("error", "You must be logged in first!");
        return res.redirect("/listing/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (!req.session.redirectUrl) {
        req.session.redirectUrl = req.originalUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listing");
    }
  
    // Ensure user is logged in and owns the listing
    if (!req.user || !listing.owner.equals(req.user._id)) {
      req.flash("error", "You do not have permission to edit this listing");
      return res.redirect(`/listing/${id}`);
    }
    
    next();
  };
  