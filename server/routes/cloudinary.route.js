const express = require('express');
const router = express.Router();

// middleware
const {authCheck, adminCheck} = require("../middlewares/auth.middleware")

// controller
const {uploadImages, removeImages} = require('../controllers/cloudinary.controller')

// routes
router.post("/upload-images", authCheck, adminCheck, uploadImages)
router.post("/remove-images", authCheck, adminCheck, removeImages)


module.exports = router;