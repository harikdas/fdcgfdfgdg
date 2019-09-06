const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productId: { type: String, default: '' },
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    price:{type:Number,default:0},
    status: { type: Number, default: 1 },
    avatar: { type: String, default: '' }
},{
    timestamps: true
});


module.exports = mongoose.model('Product', productSchema);