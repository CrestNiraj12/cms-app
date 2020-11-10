import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import PostCard from "../../components/PostCard";
import axios from "axios";
import { connect } from "react-redux";
import { setAllPosts } from "../../actions";

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  setAllPosts: (posts) => dispatch(setAllPosts(posts)),
});

const PostCardContainer = ({ posts, setAllPosts }) => {
  useEffect(() => {
    if (!posts.length)
      axios
        .get("/post/all")
        .then((res) => setAllPosts(res.data))
        .catch((err) => console.log(err));
  }, [posts.length, setAllPosts]);

  return (
    <div>
      <h1 style={{ marginTop: "40px" }}>Blog Posts</h1>
      <Grid container spacing={2} justify="flex-start">
        {posts.map(({ _id, title, description }) => (
          <PostCard
            key={_id}
            id={_id}
            title={title}
            description={description}
          />
        ))}
      </Grid>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCardContainer);
