const product = require('./product.route');

module.exports = (server) => {
  server.use('/api/products', product);
};
