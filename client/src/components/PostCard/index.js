import React from "react";
import { useHistory } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";

import styles from "./PostCard.module.css";

const NewsCard = ({ id, title, description }) => {
  var history = useHistory();

  return (
    <Grid
      item
      component={Card}
      xs={12}
      className={styles.root}
      variant="outlined"
    >
      <CardContent>
        <Typography className={styles.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          disableElevation
          onClick={() =>
            history.push(
              `/posts/${title.toLowerCase().split(" ").join("-")}-${id}`
            )
          }
        >
          Read more
        </Button>
      </CardActions>
    </Grid>
  );
};

export default NewsCard;
