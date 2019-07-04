const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imgSchema = new Schema(
    {
        id: { type: Number },
        PRODUCTID: { type: Schema.Types.ObjectId, ref: 'product' },
        url: { type: String },
        featured: { type: Boolean }
    }
)

module.exports = mongoose.model('img', imgSchema, 'product_imgs');