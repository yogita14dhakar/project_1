const Listing = require("./models/listing");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema}= require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const mongoose = require("mongoose");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to make changes!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isListingOwner = async(req, res, next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the owner of listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "you are not the owner of review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//validation listing middleware
module.exports.validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

// validate listing id 
module.exports.isListingPresent = (req, res, next) =>{
    if(!mongoose.Types.ObjectId.isValid(req.params)){
        req.flash("error", "Listing You Are Looking For Does Not Exist!");
        res.redirect("/listings");
    } next();
}

//validate reviews middleware
module.exports.validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}