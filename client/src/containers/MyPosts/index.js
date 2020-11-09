import React from "react";
import PostsTable from "../../components/PostsTable";

import {
  TableContainer,
  Table,
  Paper,
  TableCell,
  TableRow,
  withStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import styles from "./MyPosts.module.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
}));

const MyPosts = () => {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Typography
        variant="h4"
        color="textSecondary"
        align="center"
        style={{ margin: "50px 0" }}
      >
        My Posts
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <PostsTable
            all={false}
            StyledTableCell={StyledTableCell}
            StyledTableRow={StyledTableRow}
          />
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyPosts;
