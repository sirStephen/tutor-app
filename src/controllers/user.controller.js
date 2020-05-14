const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// controllers - create users
exports.createUser = (req, res) => {
    let { firstName, lastName, password, confirmPassword, email, role } = req.body;
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.status(400).json({
            message: "Please all fields are required"
       });
    }

    if (password === confirmPassword) {
        User.find({ email })
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: 'Email already exist',
                    });
                } else {
                    bcrypt.hash(password, 12)
                        .then(password => {
                            let user = new User (
                                {
                                    firstName,
                                    lastName,
                                    email,
                                    password,
                                    role
                                }
                            );
                            return user.save();
                        })
                        .then((result) => {
                            return res.status(201).json({
                                message: 'User Created successfully',
                                result,
                            });
                        })
                        .catch(err => {
                            console.log(err)
                            return res.json({
                                err
                            });
                        });
                }
            })
            .catch(err => {
                console.log(err);
                return res.json({
                    err,
                });
            })
    } else {
        res.status(406).json('Sorry, password and confirm password does not match');
    }
}

// controllers - login users
exports.loginUser = (req, res) => {
    let { email, password } = req.body;
    
    User.find({ email })
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({
                    message: 'Invalid user'
                });
                return;
            }

            if (user) {
                bcrypt.compare(password, user[0].password).then(result => {
                    try {
                        if (result) {
                            const token = jwt.sign({ 
                                email: user[0].email,
                                userId: user[0]._id 
                            }, process.env.JWT_KEY, {
                                expiresIn: '1h'
                            });
                            res.status(200).json({
                                message: `${req.body.email} logged in successfully`,
                                token
                            });
                            return;
                        } else {
                            res.status(404).json({
                                message: 'Invalid password',
                            });
                            return;
                        }
                    } catch (error) {
                        res.status(500).json({
                            message: 'Internal server error',
                            error
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }
        });
}

// controller - get all users
exports.allUsers = (req, res) => {
    User.find()
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

// controller - delete user
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    User.find({ _id: id })
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({
                    message: 'Invalid user'
                })
                return;
            } else {
                // console.log(user.length)
                User.deleteOne({ _id: id })
                .then(user => {
                    if (user) {
                        res.status(200).json({
                            message: `User deleted successfully`,
                        });
                        return;
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'Internal error',
                        err
                    });
                });
            }
        })
        .catch(err => {
            res.status(404).json({
                message: 'Not found',
                err
            });
        });
}

exports.courseByUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate('courses');
    res.json(user.courses);
}

exports.getTutorByName = async (req, res) => {
    let { firstName } = req.params;

    try {
    const findByName = await User.find({ firstName: {'$regex' : firstName, '$options' : 'i'}, role: 'tutor' }).sort({firstName:1});

        if (findByName) {
            console.log(findByName)
            return res.status(200).json({
                message: 'Found tutor',
                findByName
            });
        } else {
            return res.status(400).json({
                message: 'No tutor was found',
                findByName
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error',
            error
        });
    }
}

exports.getTutorById = (req, res) => {
    const { id } = req.params;

    User.find({_id: id, role: 'tutor'})
        .then(result => {
            if (result.length === 1) {
                return res.status(200).json(result);
            } else {
                return res.status(404).json({
                    message: 'Tutor not found'
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        });
}