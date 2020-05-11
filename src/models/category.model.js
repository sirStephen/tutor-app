const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        category: { 
            type: String,
            required: true,
        },
        courses : [
            {type: 
                mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            }
        ]
    }
);

module.exports = mongoose.model('Category', categorySchema);

