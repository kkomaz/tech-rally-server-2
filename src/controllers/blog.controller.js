// https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
const Blog = require('../models/blog.model');
const upload = require('../services/file-upload');
const singleUpload = upload.single('image');

exports.blogList = (req, res, next) => {
  const { limit } = req.query;

  const query = Blog.find({}).sort({ created_at: -1 }).limit(parseInt(limit));

  query.exec((err, blogs) => {
    if (err) return next(err);

    res.send(blogs);
  });
};

exports.blogCreate = (req, res, next) => {
  let blog;

  singleUpload(req, res, (error) => {
    if (error) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }
    blog = new Blog({
      title: req.body.title,
      sub_title: req.body.sub_title,
      video_url: req.body.video_url,
      description: req.body.description,
      image_url: req.file.location,
    });

    blog.save((err, newBlog) => {
      if (err) {
        return next(err);
      }

      res.send({
        message: 'Blog successfully created!!',
        data: newBlog,
      });
    });
  });
};

exports.blogDetail = (req, res, next) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) return next(err);
    res.send(blog);
  });
};

exports.blogUpdate = (req, res, next) => {
  Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    {
      new: true,
    },
    (err, blog) => {
      if (err) return next(err);
      res.send({
        message: 'blog updated',
        blog,
      });
    }
  );
};

exports.blogDelete = (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);

    res.send({
      message: 'Deleted successfully',
    });
  });
};