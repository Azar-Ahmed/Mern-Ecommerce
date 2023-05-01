const productSchema = require('../models/product.model');
const slugify = require('slugify');

const create = async (req, res) =>{
    try {

        req.body.slug =  slugify(req.body.title)
        const product = await productSchema.create(req.body)
        res.status(201).json(product);
                
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}

const listAll = async (req, res) =>{
    let products = await productSchema.find({})
                        .limit(parseInt(req.params.count))
                        .populate('category')
                        .populate('subs')
                        .sort([["createdAt", "desc"]])
                        .exec()
    res.status(200).json(products)
}

const remove = async (req, res) => {
    try {
        const deleted = await productSchema.findOneAndRemove({slug: req.params.slug})
        res.status(200).json(deleted)
    } catch (error) {
        console.log(err)
        return res.status(400).send('Product delete failed')
    }
}

const read = async (req, res) => {
    const product = await productSchema.findOne({slug: req.params.slug})
    .populate("category")
    .populate("subs")
    .exec()
    res.json(product)
}                                       

const update = async (req, res) => {
    try {
        
        if(req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await productSchema.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}).exec()
        res.status(200).json(updated)

    } catch (error) {
        console.log('Product update err:' + error)
        res.status(400).json({error: error.message})

    }
}

// ---------------> Without Pagination for reference <------------ //
// const list = async (req, res) =>{
//     try {
//         // createdAt, updatedAt, desc/asc , 3
//         const {sort, order, limit} = req.body
//         const products = await productSchema.find({}) 
//                             .populate('category')
//                             .populate('subs')
//                             .sort([[sort, order]])
//                             .limit(limit)
//                             .exec()
//         res.json(products)
//     } catch (error) {
//         console.log(error)
//     }
// }

// With Pagination
const list = async (req, res) =>{
    try {
        // createdAt, updatedAt, desc/asc , 3
        const {sort, order, page} = req.body
        const currentPage = page || 1
        const perPage = 3 // 3 products

        const products = await productSchema.find({})
                            .skip((currentPage -1 ) * perPage) 
                            .populate('category')
                            .populate('subs')
                            .sort([[sort, order]])
                            .limit(perPage)
                            .exec()
        res.json(products)
    } catch (error) {
        console.log(error)
    }
}



const productsCount = async (req, res) => {
    let total = await productSchema.find({}).estimatedDocumentCount().exec()
    res.json(total)
}

module.exports ={
    create, listAll, remove, read, update, list, productsCount
}