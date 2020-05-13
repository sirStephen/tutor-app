const Course = require('../models/course.model');
const User = require('../models/user.model')
const Category = require('../models/category.model');

exports.createCourse = async (req, res) => {
    // users id
    let { id } = req.params;
    // category id
    const { _id } = req.body;
    
    let course = new Course (
        {
            course: req.body.course,
        }
    )

    try {
        await course.save();
        const findCategory = await Category.findById({ _id });
        if (findCategory) {
            findCategory.courses.push(course);
            await findCategory.save();
        }
        
        const userById = await User.findById(id);
        if (userById) {
            userById.courses.push(course);
            await userById.save();
            return res.status(201).json({
                message: "Course created successfully",
                course
            })
        }
    } catch (error) {
        console.log(error)
        return res.json({
            error
        });
    }
}

// get user by courses
exports.userByCourse = async (req, res) => {
    const { id } = req.params;
    const userByCourse = await Course.findById(id).populate('tutor');
    res.json({
        userByCourse
    })
}

// get all courses
exports.allCourses = (req, res) => {
    Course.find()
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

// get course by name
exports.getCourseByName = async (req, res) => {
    let { name } = req.params;

    try {
    const findByName = await Course.find({ course: {'$regex' : name, '$options' : 'i'} }).sort({course:1});

        if (findByName) {
            return res.status(200).json({
                message: 'Found courses',
                findByName
            });
        } else {
            return res.status(400).json({
                message: 'No course was found',
                findByName
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

exports.updateCourse = async (req, res) => {
    const { id } = req.params;
    
    try {
        const findCourse = await Course.findById(id);

        if (findCourse) {
            findCourse.set(req.body);
            const updateCourse = await findCourse.save();

            return res.status(200).json({
                message: `Course updated successfully`,
                updateCourse,
            });
        } else {
            return res.status(404).json({
                message: `Course id not found`
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}