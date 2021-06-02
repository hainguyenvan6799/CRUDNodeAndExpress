const express = require("express");

const router = express.Router();

// load model
const Post = require("../models/Post");

// Giao diện tạo tài viết mới
router.get("/add", (req, res) => {
  res.render("posts/add");
});

// Xử lý tạo bài viết mới
router.post("/", async (req, res) => {
  const { title, text } = req.body;
  let errors = [];

  if (!title) errors.push({ msg: "Title required" });
  if (!text) errors.push({ msg: "Text required" });
  if (errors.length > 0) res.render("posts/add", { errors, title, text });
  else {
    const newPostData = { title, text };
    const newPost = new Post(newPostData);

    await newPost.save();
    res.redirect("/posts");
  }
});

// Giao diện hiển thị tất cả bài viết
router.get("/", async (req, res) => {
  // date: -1 sắp xếp theo thứ tự giảm dần
  const posts = await Post.find().lean().sort({ date: -1 });
  res.render("posts/index", { posts });
});

// Giao diện chỉnh sửa bài viết
router.get("/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  console.log(post);
  res.render("posts/edit", { post });
});

// Xử lý chỉnh sửa bài viết
router.put("/:id", async (req, res) => {
  const { title, text } = req.body;
  await Post.findOneAndUpdate({ _id: req.params.id }, { title, text });
  res.redirect("/posts");
});

router.delete("/:id", async (req, res) => {
  await Post.findOneAndDelete({ _id: req.params.id });
  res.redirect("/posts");
});

module.exports = router;
