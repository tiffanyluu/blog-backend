require("dotenv").config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(morgan("tiny"));

// {
//   "title": "my first blog",
//   "author": "tiffany",
//   "url": "www.blogs.com",
//   "likes": "5",
// }

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
mongoose.connect(MONGODB_URI);

app.use(express.json());

app.get("/api/blogs", (req, res) => {
  Blog.find({}).then((b) => res.json(b));
});

app.post("/api/blogs", (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => res.status(201).json(result));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
