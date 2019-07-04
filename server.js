const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const Data = require('./data');
const Product = require('./models/product');
const Category = require('./models/category');
const Collection = require('./models/collection');
const Stock = require('./models/stock');
const port = 3001;
const app = express();

app.use(cors());

const router = express.Router();

const uri = 'mongodb+srv://diogo:diogo@cluster0-dihuo.mongodb.net/onlinestore?retryWrites=true&w=majority';

mongoose.connect(uri, {useNewUrlParser: true});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database!'));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// logging
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/getStock', (req, res) => {
    Stock.
    find().
    exec((err, data) => {
        return res.json({ sucess: true, data: data})
    })
})

router.get('/getProducts', (req, res) => {
    /*Product.
    find().
    populate('CATEGORYID').
    exec((err, data) => {
        console.log('data', data);
        return res.json({ sucess: true, data: data})
    });*/
    Product.aggregate(
        [
            { "$lookup": {
                    from: "product_imgs",
                    localField: "_id",
                    foreignField: "PRODUCTID",
                    as: "imgs"
            }   },
            { "$lookup": {
                    from: "categories",
                    localField: "CATEGORYID",
                    foreignField: "_id",
                    as: "category"
            }   },
            { "$lookup": {
                    from: "product_variations",
                    localField: "_id",
                    foreignField: "PRODUCTID",
                    as: "variations"
                }   },
            { "$lookup": {
                    from: "collections",
                    localField: "_id",
                    foreignField: "COLLECTIONID",
                    as: "collection"
            }   },
            { "$project": {
                    id: 0,
                    __v: 0,
                    CATEGORYID: 0,
                    category: { id: 0 },
                    imgs: { PRODUCTID: 0, id: 0 }
            }   },
            { "$sort": {
                "category.title": 1,
                "title": 1
            }   }
        ],
        (err, results) => {
            return res.json({sucess: true, data: results});
        }
    )
});

router.post('/putProduct', (req, res) => {
    let product = new Product();
    const {id, title, description, CATEGORYID} = req.body;
    
    console.log(id, title);
    
    if(!id && id !== 0 || !title){
        return res.json({
            success: false,
            error: 'invalid inputs'
        })
    }
    
    product.title = title;
    product.id = id;
    console.log('product title', title);
    product.save((err) => {
        if(err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
    
});
app.use('/api', router);
app.listen(port, () => console.log(`Hello on port ${port}`));