const router = require("express").Router();
const Post = require("../models/post.model");

router.get("/all", (req, res) => {
  Post.find()
    .populate("authorId")
    .exec((err, posts) => {
      if (err) return res.status(400).json("Error: " + err);
      return res.json(posts);
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("authorId")
    .exec((err, post) => {
      if (err) res.status(400).json("Error: " + err);
      return res.json(post);
    });
});

router.delete("/:userId/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => {
      User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { posts: mongoose.mongo.ObjectId(req.params.id) } },
        { safe: true, upsert: true },
        (err, obj) => {
          if (err) console.log(err);
        }
      );
      return res.json("Post deleted!");
    })
    .catch((err) => res.status(400).json("Cant find post!"));
});

router.put("/update/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
    post.title = req.body.title;
    post.description = req.body.description;
    post.content = req.body.content;

    post
      .save()
      .then(() => res.json("Post Updated Successfully!"))
      .catch((err) => res.status(400).json(err));
  });
});

module.exports = router;
