const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isListingOwner, validateListing, isListingPresent} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });
//root route 
router
.route("/")
.get(wrapAsync(listingController.index)
)
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createNewListing)
);

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//id route
router.route("/:id")
.get( 
    isListingPresent,
    wrapAsync(listingController.showIndividualListing)
)
.put(
    isLoggedIn,
    isListingOwner,
    isListingPresent,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(
    isLoggedIn,
    isListingOwner, 
    isListingPresent,
    wrapAsync(listingController.deleteListing)
);

//edit route
router.get("/:id/edit", 
    isLoggedIn,
    isListingOwner, 
    isListingPresent,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;
