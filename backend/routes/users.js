const router = require("express").Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");

router.get("/all", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/makeAdmin/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { admin: true },
    { new: true },
    (err, user) => {
      if (err) return res.status(400).json("Error: " + err);
      return res.json({
        message: "User Role changed to admin successfully!",
        user,
      });
    }
  );
});

router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Account deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/addpost", (req, res) => {
  const authorId = req.session.userId;
  const newPost = new Post({ ...req.body, authorId });

  newPost
    .save()
    .then(() => {
      User.findByIdAndUpdate(
        authorId,
        { $push: { posts: newPost._id } },
        { new: true },
        (err, user) => {
          if (err) return res.status(400).json(err);
          return res.json("Post Added Successfully!");
        }
      );
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json("Error saving post! Try again!");
    });
});

module.exports = router;
