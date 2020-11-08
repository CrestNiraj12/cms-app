import React from "react";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";

import styles from "./PostCard.module.css";

const NewsCard = () => {
  return (
    <Grid
      item
      component={Card}
      xs={12}
      md={3}
      className={styles.root}
      variant="outlined"
    >
      <CardContent>
        <Typography className={styles.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          benevolent
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly. {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Grid>
  );
};

export default NewsCard;
