const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        id: {type: Number, required: true},
        title: {type: String},
        parent: {type: Number}
    }
)

module.exports = mongoose.model("category", categorySchema, "categories");