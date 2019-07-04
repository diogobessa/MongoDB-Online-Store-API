const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema(
    {
        id: Number,
        message: String
    }
);

module.exports = mongoose.model("data", dataSchema);