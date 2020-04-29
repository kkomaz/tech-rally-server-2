const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
  },
  sub_title: {
    type: String,
  },
  video_url: {
    type: String,
  },
  image_url: {
    type: String,
  },
  description: {
    type: String,
  },
  image_key: {
    type: String,
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Blog', BlogSchema);