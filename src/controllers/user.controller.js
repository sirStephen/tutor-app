const User = require('../models/user.model');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res) => {
    let { password, confirmPassword, email, role, adminFlag } = req.body;
    
    if (!email || !password || !confirmPassword || !role) {
        return res.status(400).json({
            message: "Please all fields are required"
       });
    }

    if (password === confirmPassword) {
        User.find({ email })
            .then(user => {
                if (user) {
                    return res.status(409).json({
                        message: 'Email already exist',
                    });
                } else {
                    bcrypt.hash(password, 12)
                        .then(password => {
                            let user = new User (
                                {
                                    email: email,
                                    password: password,
                                    role: role,
                                    adminFlag: adminFlag,
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

