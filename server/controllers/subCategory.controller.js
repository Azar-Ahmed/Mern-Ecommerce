const SubCategorySchema = require('../models/subCategory.model')
const slugify = require('slugify');

const create = async (req, res) => {
    try {
        const {name, parent} = req.body

        if(!name){
            res.status(400).json('Sub category name is required');
         }

         if(!parent){
            res.status(400).json('Parent category name is required');
         }
        
        const subCategory = await SubCategorySchema.create({
            name,
            parent,
            slug: slugify(name),
        })
        res.status(201).json(subCategory);

    } catch (error) {
        console.log(error)
        res.status(400).json(`Create Sub Category Failed!`)
    }
}

const list = async (req, res) => {
    await SubCategorySchema.find({}).sort({createdAt: -1})
    .then(subCategories => res.json(subCategories))
    .catch(err => res.status(500).json({ error: err }));
}


const read = async (req, res) => {
    const subCategory = await SubCategorySchema.findOne({slug: req.params.slug})
    if(!subCategory) res.status(404).json({err: "Sub category not found"})
    res.json(subCategory)
}

const update = async (req, res) => {
    const {name} = req.body;
    const {parent} = req.body;

    try {
        const updated = await SubCategorySchema.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug: slugify(name)}, {new: true})
        res.status(200).json(updated)
    } catch (error) {
        res.status(400).json({err: "Sub category update failed"})
    }
}

const remove = async (req, res) => {
    try {
        const deleted = await SubCategorySchema.findOneAndDelete({slug: req.params.slug})
        res.json({msg: `${deleted.name} deleted`})
    } catch (error) {
        res.status(400).json({error: "Failed to delete sub category"})
    }
}




module.exports = {
    create, list,read, update, remove
}