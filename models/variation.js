const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const variationSchema = new Schema(
    {
        PRODUCTID: { type: Schema.Types.ObjectId, ref: 'products'},
        variation_type: { type: String },
        value: { type: String }
    }
)

module.exports = mongoose.model( "variation", variationSchema, "product_variation");