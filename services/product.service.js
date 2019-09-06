const Product = require('../models/product');

module.exports.getProducts = (params={}, project={}) => {
    return Product.find(params, project).lean().exec();
}
module.exports.getProduct = (params, project) => {
    return Product.findOne(params, project).lean().exec();
}
module.exports.addProduct = (params) => {
    return new Product(params).save();
}
module.exports.updateProduct = (params, data) => {
    return Product.updateOne(params, data).exec();
}

module.exports.updateProducts = (params, data) => {
    return Product.updateOne(params, data).exec();
}

module.exports.updateProductss= (params, data) => {
    return Product.updateOne(params, data).exec();
}

// controller for product
