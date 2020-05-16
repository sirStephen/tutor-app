const Lesson = require('../models/lesson.model');
const User = require('../models/user.model');
const Course = require('../models/course.model');

// create lesson
exports.createLesson = async (req, res) => {
    const { id } = req.params;

    const { courseID, desc, courseName } = req.body;

    const groupID = id + courseID;

    const lesson = new Lesson({
        courseID,
        courseName,
        desc,
        groupID
    });

    try {
        await User.findById({ _id: id });
        await Course.find({ _id: courseID, course: courseName });
        const findGroup = await Lesson.find({ groupID });

        if (findGroup < 1) {
            lesson.save();
            return res.status(201).json({
                message: 'lesson created successfully',
                lesson
            });
        } else {
            return res.json({
                message: 'already created a lesson under this course'
            })
        }
    } catch (error) {
        return res.json({
            error
        });
    }
}

// update lesson by id
exports.updateLessonByID = async (req, res) => {
    const { id } = req.params;
    
    try {
        const findLesson = await Lesson.findById(id);

        if (findLesson) {
            findLesson.set(req.body);
            const updateLesson = await findLesson.save();

            return res.status(200).json({
                message: `lesson updated successfully`,
                updateLesson,
            });
        } else {
            return res.status(404).json({
                message: `lesson id not found`
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

// get lesson by id
exports.getLessonByID = async (req, res) => {
    const { id } = req.params;
    Lesson.findById({ _id: id })
        .populate('course')
        .then(result => {
            if (result) {
                return res.status(200).json({
                    result
                })
            } else {
                return res.status(404).json({
                    message: 'no lesson'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'internal error',
                err
            });
        });
}

// get all lessons
exports.getAllLesson = async (req, res) => {
    Lesson.find()
        .populate('course')
        .then(result => {
            if (result) {
                return res.status(200).json({
                    result
                })
            } else {
                return res.status(404).json({
                    message: 'no lesson'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'internal error',
                err
            });
        });
}

exports.deleteLesson = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deleteLesson = await Lesson.deleteOne({_id: id});

        if (deleteLesson) {
            return res.status(200).json({
                message: `lesson deleted successfully`,
            });
        } else {
            return res.status(404).json({
                message: `lesson id not found`
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}