const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
        minlength: [2, "Too short"],
        maxlength: [32, "Too long"],
        text: true,
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    description:{
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [2000, "Too long"],
        text: true,
    },
    price:{
        type: Number,
        required: true,
        trim: true,
        maxlength: 32,
    },
    category: {type: ObjectId, ref:"Category", required: true},
    subs: [{type: ObjectId, ref:"SubCategory", required: true}],
    quantity: Number,
    sold: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
    },
    shipping:{
        type: String,
        enum: ['Yes', 'No'],
    },
    color:{
        type: String,
        enum: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    },
    brand:{
        type: String,
        enum: ['Apple', 'HP', 'Samsung', 'Lenovo', 'ASUS', 'Dell'],
    },
    // ratings: [{
    //     star: Number,
    //     postedBy: {type: ObjectId, ref: "User"},
    // }],

}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)