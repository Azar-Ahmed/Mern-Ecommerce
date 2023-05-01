const CategorySchema = require('../models/category.model')
const SubCategorySchema = require('../models/subCategory.model')
const slugify = require('slugify');

const create = async (req, res) => {
    try {
        const {name} = req.body

        if(!name){
            res.status(400).json('Category name is required');
         }
        
        const category = await CategorySchema.create({
            name,
            slug: slugify(name),
        })
        res.status(201).json(category);

    } catch (error) {
        console.log(error)
        res.status(400).json(`Create Category Failed!`)
    }
}

const list = async (req, res) => {
    await CategorySchema.find({}).sort({createdAt: -1})
    .then(categories => res.json(categories))
    .catch(err => res.status(500).json({ error: err }));
}


const read = async (req, res) => {
    const category = await CategorySchema.findOne({slug: req.params.slug})
    if(!category) res.status(404).json({err: "Category not found"})
    res.json(category)
}

const update = async (req, res) => {
    const {name} = req.body;
    try {
        const updated = await CategorySchema.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true})
        res.status(200).json(updated)
    } catch (error) {
        res.status(400).json({err: "Category update failed"})
    }
}

const remove = async (req, res) => {
    try {
        const deleted = await CategorySchema.findOneAndDelete({slug: req.params.slug})
        res.json({msg: `${deleted.name} deleted`})
    } catch (error) {
        res.status(400).json({error: "Failed to delete category"})
    }
}

const getSubs = async (req, res) =>{
    SubCategorySchema.find({parent: req.params._id}).exec((err, subs)=>{
        if(err) console.log(err)
        res.json(subs)
        
    })
}



module.exports = {
    create, list,read, update, remove, getSubs
}