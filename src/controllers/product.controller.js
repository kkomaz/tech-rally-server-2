const Product = require('../models/product.model');

exports.test = (req, res) => {
  res.send('Greetings from the Test Controller!');
};

exports.productList = (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) return next(err);

    res.send({ products });
  });
};

exports.productCreate = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  product.save((err, newProduct) => {
    if (err) {
      return next(err);
    }

    res.send({
      message: 'Product successfully created!!',
      data: newProduct,
    });
  });
};

exports.productDetail = (req, res, next) => {
  Product.findById(req.params.id, (err, product) => {
    if (err) return next(err);
    res.send(product);
  });
};

exports.productUpdate = (req, res, next) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, product) => {
      if (err) return next(err);
      res.send({
        message: 'Product updated',
        product,
      });
    }
  );
};

exports.productDelete = (req, res, next) => {
  Product.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);

    res.send({
      message: 'Deleted successfully',
    });
  });
};