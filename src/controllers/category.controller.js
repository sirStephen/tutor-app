const Category = require('../models/category.model');

// controllers - create category
const createCategory = async (req, res) => {
    let category = new Category (
        {
            category: req.body.category
        }
    )

    console.log(category)
    category.save()
        .then(category => {
            res.status(201).json({
                message: 'Category was created successfully',
                category,
            });
        })
        .catch(err => console.log(err))
}

module.exports = {
    createCategory
}