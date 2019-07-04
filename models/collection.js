const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
    {
        name: {type: String}
    }
)

module.exports = mongoose.model("collection", collectionSchema, "collections");