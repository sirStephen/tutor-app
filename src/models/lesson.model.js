const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const lessonSchema = new Schema(
//     {
//         user: {
//             type: mongoose.Schema.Types.ObjectId, 
//             ref: 'User'
//         },
//         description: {
//             type: String,
//             required: true,
//         },
//         courses: [{ 
//             type: mongoose.Schema.Types.ObjectId, 
//             ref: 'Course'
//         }],
//         category: [{ 
//             type: mongoose.Schema.Types.ObjectId, 
//             ref: 'Category' 
//         }]
//     }
// );

const lessonSchema = new Schema(
    {
        courseID: {
            type: String,
            required: true,
            trim: true
        },
        courseName: {
            type: String,
            required: true,
            trim: true
        },
        groupID:{
            type: String,
            required: true,
            trim: false,
            unique:true
        },
        desc:{
            type: String,
            required: true,
            trim: false,
            unique:true
        },
        course: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Course' 
        }
    }
);

module.exports = mongoose.model('Lesson', lessonSchema);