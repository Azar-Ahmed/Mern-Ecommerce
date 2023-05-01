const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const {readdirSync} = require('fs');
require('dotenv').config()


// App
const app = express();

// Database
mongoose.connect(process.env.DATABASE, {})
        .then(() => console.log("DB connected"))
        .catch((err) => console.log("DB Error => ", err));

// Middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limit: "3mb"}))
app.use(cors())

// Routes
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))

// Port listen
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
