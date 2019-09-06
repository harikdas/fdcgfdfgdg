var express = require('express');
var router = express.Router();
var productService = require('../services/product.service');
const Yup = require('yup');
const multer  = require('multer');
const util = require('util');
const fs = require('fs');
const lang = require('../lib/en.json');
const path=require('path');
// const fsunlink = util.promisify(fs.unlink);

const storage = multer.diskStorage(
    
    {
    destination: function (req, file, cb) {
        if(!req.body.id) { return cb(lang.USERIDREQ) }
        cb(null, `./public/uploads/productimage`)
    },
    filename: function (req, file, cb) {
        if(!req.body.id) { return cb(lang.USERIDREQ) }
        const ext = path.extname(file.originalname);
        cb(null, `${req.body.id}_${Date.now()}${ext}`)
    }
})

const upload = multer(
    
    { storage: storage })


//get all datas in dashboard
router.get('/', async function(req, res, next) {
    try {
        let products = await productService.getProducts()
        res.json({ success: true, result: { data:products } });
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});


//get one data for updating the details
router.get('/:id', async function(req, res, next) {
    try {
        var id=req.params.id;
        let response = await productService.getProduct({ _id: id });
        // console.log(response)
        res.json({ success: true, result:response });
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }

});



//post updated data in to database
router.put('/:id', async function(req, res, next) {
    try {
        let { productId, ...rest } = req.body;
        const data = { $set: rest };
        var id=req.params.id;
        let response =await productService.updateProduct({ _id: id },data);
         console.log(response)
        res.json({ success: true, result:response });
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});




//Delete data in  use update method
router.put('/:id', async function(req, res, next) {
    try {
        let { productId, ...rest } = req.body;
        const data = { $set: rest };
        var id=req.params.id;
        let response =await productService.updateProducts({ _id: id },data);
         console.log(response)
        res.json({ success: true, result:response });
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});

//add new product in to database
router.post('/', async function(req, res, next) {
    try {
        console.log(req.body)
        let add_products = await productService.addProduct(req.body)
        res.json({ success: true, result: add_products });
    } catch(e) {
        console.log(e)
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});

// product image upload

router.post('/upload-productimages', upload.single('photo'), async function(req, res, next) {
    try {
        if(req.file) {
            const { id } = req.body;
            const data = { $set: { avatar: req.file.filename } };
            await productService.updateProduct({ _id: id }, data);
            return res.json({ success: true, result: {} });
        }
        throw new Error();
    } catch(e) {
        res.json({ success: false, errors: (e.errors ? e.errors : [e.message]) });
    }
});
   
module.exports = router;
