const blogs = require('./blog.route');
const email = require('./email.route');

module.exports = (server) => {
  server.use('/email', email);
  server.use('/api/blogs', blogs);
};
