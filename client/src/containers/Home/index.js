import React from "react";
import PostCardContainer from "../PostCardContainer";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <PostCardContainer />
    </div>
  );
};

export default Home;
