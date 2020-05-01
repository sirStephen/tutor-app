const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
    let { password, confirmPassword, email, role, adminFlag } = req.body;
    
    if (!email || !password || !confirmPassword || !role) {
        return res.status(400).json({
            message: "Please all fields are required"
       });
    }

    if (password === confirmPassword) {
        User.findOne({ email })
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

exports.userLogin = (req, res) => {
    let { email, password } = req.body;
    console.log(email, password);
}

