var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var router = express.Router();
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

var db = require('./db/dbConfig');
var allProducts = db.allProductLists;
var cart =  db.cart ;
var wishlist =  db.wishlist ;
var port = process.env.PORT || 3003;
let data = {
    "data": "",
    "error": false,
    "message": "",
    "status": "ERR"
};
app.use(express.static('public'));
app.get("/",  (req, res) => {
    res.sendFile(path.resolve(_dirname, 'public', 'index.html'))
});

async function lookForProducts(categories) {
    let foundProducts = [];
    for (let category of categories) {
        eval("var " + category + " = 'db.category';");
        const findProucts = db[category];
        try {
            let found = await findProucts.find({}).exec();
            const cType = `${category}`;
            foundProducts.push({ category: cType, lists: found });
        } catch (e) {
            console.log(`did not find rider ${category} in database`);
        }
    }
    // console.log(foundProducts);
    return foundProducts;
}
async function fetchProductDetails(datas) {
    let listDetails = [];
    for (let row of datas) {
        let addSuf;
        let category = row.category.toLowerCase();
        if (category === "watch") addSuf = "es"; else addSuf = "s";
        category = category + addSuf ;
        const id = row.id;
        eval("var " + category + " = 'db.category';");
        const findProucts = db[category];
        try {
            let found = await findProucts.find({"productId":id}).exec();
            const getData = found[0];
            listDetails.push(getData) ;
        } catch (e) {
            console.log(`did not find rider ${category} in database`);
        }
    }
    return listDetails;
}
app.get('/api/allProducts',  (req, res) => {
    allProducts.find({},  (err, products) => {
        if (err) return next(err);
        if (products.length > 0) {
            // var sendData = [];
            var categories = [];
            products.map(function (productList) {
                var category = productList.cname;
               
                categories.push(category);
            })
            lookForProducts(categories).then(foundProducts => {
                data['data'] = foundProducts;
                data['status'] = "OK";
                res.json(data);
            }).catch(err => {
                data['data'] = [];
                data['status'] = "ERR";
                data['message'] = "List is Empty";
                res.json(data);
            });
        }

    });
});

app.get('/api/allWatches', (req, res) => {
    watches.find({}, function (err, watches) {
        if (err) return next(err);
        data['data'] = watches;
        data['status'] = "OK";
        res.json(data);
    });
});
app.post('/api/getCartProductDetails', (req, res)=> {
    const datas = req.body.data;
    fetchProductDetails(datas).then(foundProducts => {
        data['data'] = foundProducts;
        data['status'] = "OK";
        res.json(data);
    }).catch(err => {
        data['data'] = [];
        data['status'] = "ERR";
        data['message'] = "List is Empty";
        res.json(data);
    });
});
app.post('/api/addCart', (req, res) => {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    const current_time =  localISOTime.replace(/T/, ' ').replace(/\..+/, '') ;
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    let product_type = req.body.product_type;
    product_type = product_type.toLowerCase();
    if (product_type === "watch") addSuf = "es"; else addSuf = "s";
    product_type = product_type + addSuf ;
    const addCartData = {
        "user_id": parseInt(user_id),
        "product_id": parseInt(product_id),
        "product_table": product_type,
        "added_at": current_time
      }
      cart.create(addCartData, (err, response) => {
        if (err) return next(err);
        data['data'] = response;
        data['status'] = "OK";
        res.json(data);
      });  
});
app.listen(3003, () => {
    console.log("server  3003");
})
