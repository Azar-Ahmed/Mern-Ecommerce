const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
    },
    role:{
        type: String,
        default: "subscriber",
    },
    address: {
        type: String,
    },
    cart:{
        type: Array,
        default: [],
    },
    // wishlist: [{type: ObjectId, ref: "Product"}],
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema);