const blogs = require('./blog.route');
const product = require('./product.route');
const fileRoutes = require('./file-upload');

module.exports = (server) => {
  server.use('/api', fileRoutes);
  server.use('/api/products', product);
  server.use('/api/blogs', blogs);
};
