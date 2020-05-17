const Book = require('../models/book.model');
const Lesson = require('../models/lesson.model');
const User = require('../models/user.model');

exports.bookLesson = async (req, res) => {
    const { id } = req.params;

    const { lessonID } = req.body;

    const groupID = id + lessonID;

    const book = new Book({
        lessonID,
        groupID
    });

    try {
        await User.findById({ _id: id });
        await Lesson.find({ _id: lessonID, })
        const findGroup = await Book.find({ groupID });

        if (findGroup < 1) {
            book.save();

            return res.status(201).json({
                message: 'book created successfully',
                book
            })
        } else {
            return res.json({
                message: 'already booked a lesson'
            });
        }
    } catch (error) {
        return res.json({
            error
        });
    }
}

exports.allBookings = (req, res) => {
    Book.find()
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