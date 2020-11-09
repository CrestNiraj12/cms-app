import React from "react";
import { Grid } from "@material-ui/core";
import PostCard from "../../components/PostCard";

const PostCardContainer = () => (
  <div>
    <h1 style={{ margin: "40px 0 0 0" }}>Blog Posts</h1>
    <Grid container justify="flex-start">
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </Grid>
  </div>
);

export default PostCardContainer;
