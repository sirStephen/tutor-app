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

// get all category
const allCategory = async (req, res) => {
    Category.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}

// retrieve course by category
const retrieveCourseByCat = async (req, res) => {
    const { id } = req.params;

    try {
        const courseByCat = await Category.findById(id).populate('courses');
        res.json({
            courseByCat
        });
    } catch (error) {
        return res.json({
            message: 'something went wrong',
            error
        });
    }
}

module.exports = {
    createCategory,
    allCategory,
    retrieveCourseByCat
}