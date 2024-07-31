const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//reviews route
router.post("/",
    isLoggedIn, 
    validateReview,
    wrapAsync(reviewController.createReview)
);

//delete review
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
);

module.exports = router;