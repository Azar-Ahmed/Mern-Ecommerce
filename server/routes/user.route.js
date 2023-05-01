const express = require('express');

const router = express.Router();

// import controller
const {user} = require('../controllers/user.controller');

router.get('/user', user)


 module.exports= router;