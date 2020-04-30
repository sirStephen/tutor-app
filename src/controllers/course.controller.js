const Course = require('../models/course.model');

exports.createCourse = (req, res) => {
    let course = new Course (
        {
            course: req.body.course,
            track: req.body.track,
        }
    )

    console.log(course)
    course.save()
        .then(result => {
            res.status(201).json({
                message: 'Successfully create course.',
                result,
            });
        })
        .catch(err => console.log(err))
}