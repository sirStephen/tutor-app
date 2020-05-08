const Course = require('../models/course.model');
const User = require('../models/user.model')

exports.createCourse = async (req, res) => {
    let { id } = req.params;

    let course = new Course (
        {
            course: req.body.course,
        }
    )

    try {
        await course.save()
            .then(result => {
                return res.status(201).json({
                    message: 'Successfully create course.',
                    result,
                });
            })
            .catch(err => {
                return res.json(err)
            })
            
        } catch (error) {
            return res.json(error)
        }
        
        const userById = await User.findById(id);
    
        userById.courses.push(course);
        // userById.tutor.push(course);
    
        await userById.save();
    
        return res.json(userById);

}

exports.userByCourse = async (req, res) => {
    const { id } = req.params;
    const userByCourse = await Course.findById(id).populate('tutor');
    res.json({
        userByCourse
    })
}

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