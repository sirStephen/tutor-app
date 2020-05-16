const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {
        lessonID: {
            type: String,
            required: true,
            trim: true
        },
        groupID:{
            type: String,
            required: true,
            trim: false,
            unique:true
        }
    }
);

module.exports = mongoose.model('Book', bookSchema);