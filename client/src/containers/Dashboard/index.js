import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  withStyles,
  makeStyles,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import UsersTable from "../../components/UsersTable";
import PostsTable from "../../components/PostsTable";

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("USERS");

  useEffect(() => {
    setActive(localStorage.getItem("activeTable"));
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSetActive = (text) => {
    setActive(text.toUpperCase());
    localStorage.setItem("activeTable", text.toUpperCase());
  };

  return (
    <div className={styles.container}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>
          {["Users", "Posts"].map((text, index) => (
            <ListItem
              button
              key={text}
              style={
                text.toUpperCase() === active
                  ? { backgroundColor: "#b9b9b9" }
                  : {}
              }
              onClick={() => handleSetActive(text)}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Typography variant="h5" style={{ margin: "50px 0" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        Dashboard
      </Typography>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          {active === "USERS" ? (
            <UsersTable
              StyledTableCell={StyledTableCell}
              StyledTableRow={StyledTableRow}
            />
          ) : (
            <PostsTable
              all={true}
              StyledTableCell={StyledTableCell}
              StyledTableRow={StyledTableRow}
            />
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
