const Tutor = require('../models/tutor.model');

exports.createTutor = (req, res) => {
    let tutor = new Tutor (
        {
            name: req.body.name,
        }
    )

    console.log(tutor)
    tutor.save()
        .then(result => {
            res.status(201).json({
                message: 'Successfully create tutor.',
                result,
            });
        })
        .catch(err => console.log(err))
}

exports.allTutors = (req, res) => {
    Tutor.find()
        .populate('course')
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
