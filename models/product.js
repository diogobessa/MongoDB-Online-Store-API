const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String },
        description: { type: String },
        gender: { type: String },
        CATEGORYID: {type: Schema.Types.ObjectId, ref: 'category'},
    }
);

module.exports = mongoose.model("product", productSchema, "products");