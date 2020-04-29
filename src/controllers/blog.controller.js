// https://stackoverflow.com/questions/5539955/how-to-paginate-with-mongoose-in-node-js
const Blog = require('../models/blog.model');
const fileUpload = require('../services/file-upload');
const singleUpload = fileUpload.upload.single('image');

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
      image_key: req.file.key,
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
  singleUpload(req, res, async (error) => {
    if (error) {
      return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
    }

    const setParams = req.file ? { ...req.body, image_url: req.file.location, key: req.file.key } : req.body;

    const blog = await Blog.findOne({ _id: req.params.id });

    if (req.file) {
      const params = {
        Bucket: 'tech-rally-test-bucket', 
        Delete: {
          Objects: [{ Key: blog.image_key }], 
          Quiet: false
        }
      };

      fileUpload.s3.deleteObjects(params, function(err, data) {
        if (err) return next(err);
        else console.log("Successfully deleted myBucket/myKey");   
      });
    }

    Blog.findByIdAndUpdate(
      req.params.id,
      {
        $set: setParams,
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
  })
};

exports.blogDelete = (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id, (err) => {
    if (err) return next(err);

    const params = {
      Bucket: 'tech-rally-test-bucket', 
      Delete: {
        Objects: [{ Key: req.query.image_key }], 
        Quiet: false
      }
    };

    fileUpload.s3.deleteObjects(params, function(err, data) {
      if (err) return next(err);
      else console.log("Successfully deleted myBucket/myKey");   
    });

    res.send({
      message: 'Deleted successfully',
    });
  });
};