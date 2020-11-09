import React from "react";

import NewsCardContainer from "../NewsCardContainer";
import PostCardContainer from "../PostCardContainer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <NewsCardContainer />
      <PostCardContainer />
    </div>
  );
};

export default Home;
