const blogs = require('./blog.route');
const product = require('./product.route');

module.exports = (server) => {
  server.use('/api/products', product);
  server.use('/api/blogs', blogs);
};
