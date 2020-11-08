import React from "react";
import styles from "./App.module.css";
import NewsCard from "./components/NewsCard";
import PostCard from "./components/PostCard";
import { Grid } from "@material-ui/core";

class App extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <h1>News</h1>
        <Grid container>
          <NewsCard />
        </Grid>
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
  }
}

export default App;
