const express = require('express');
const router = express.Router();

// middleware
const {authCheck, adminCheck} = require("../middlewares/auth.middleware")

// controller
const {create, read, update, remove, list} = require('../controllers/subCategory.controller')


// routes
router.post("/sub-category", authCheck, adminCheck, create)
router.get("/sub-categories", list)
router.get("/sub-category/:slug", authCheck, adminCheck, read)
router.put("/sub-category/:slug", authCheck, adminCheck, update)
router.delete("/sub-category/:slug", authCheck, adminCheck, remove)


module.exports = router;