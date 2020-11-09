import React from "react";
import { Grid } from "@material-ui/core";
import NewsCard from "../../components/NewsCard";

const NewsCardContainer = () => (
  <div>
    <h1>News</h1>
    <Grid container>
      <NewsCard />
    </Grid>
  </div>
);

export default NewsCardContainer;
