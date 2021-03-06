const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: { 
            type: String,
            required: true,
            unique: true,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String,
            enum: ['student', 'tutor', 'admin'],
            default: 'student',
        },
        adminFlag: {
            type: String,
            enum: ['n', 'y'],
            default: 'n'
        },
        courses : [
            {type: 
                mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]
    }
);

module.exports = mongoose.model('User', userSchema);

