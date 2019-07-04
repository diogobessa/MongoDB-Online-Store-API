const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema(
    {
        id: { type: Number},
        PRODUCTVARIATIONID: { type: Schema.Types.ObjectId, ref: 'product_variations'},
        quantity: { type: Number }
    }
);

module.exports = mongoose.model('stockItem', stockSchema, 'stock');