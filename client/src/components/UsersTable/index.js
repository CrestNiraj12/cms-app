import React, { useEffect } from "react";
import {
  TableHead,
  TableRow,
  TableBody,
  Button,
  SvgIcon,
  IconButton,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { ReactComponent as TrashIcon } from "./delete.svg";
import { DELETE_USER, MAKE_ADMIN } from "../../constants";
import axios from "axios";
import { setAllUsers, showDialog } from "../../actions";

const mapStateToProps = (state) => ({
  authUserId: state.auth.authUserId,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  showDialog: (dialog) => dispatch(showDialog(dialog)),
  setAllUsers: (users) => dispatch(setAllUsers(users)),
});

const UsersTable = ({
  users,
  authUserId,
  setAllUsers,
  showDialog,
  StyledTableCell,
  StyledTableRow,
}) => {
  useEffect(() => {
    axios
      .get("/user/all")
      .then((res) => {
        setAllUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, [setAllUsers]);

  const confirmDeleteUser = (id) => {
    showDialog({
      status: true,
      title: "Remove User",
      message: "Do you want to remove this user?",
      cancel: "Cancel",
      accept: "Remove",
      action: DELETE_USER,
      params: { id },
    });
  };

  const confirmMakeAdmin = (id) => {
    showDialog({
      status: true,
      title: "Make Admin",
      message: "Do you want to make this user an admin?",
      cancel: "Cancel",
      accept: "Promote",
      action: MAKE_ADMIN,
      params: { id },
    });
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <StyledTableCell>Fullname</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell align="center">Posts</StyledTableCell>
          <StyledTableCell align="center">Role</StyledTableCell>
          <StyledTableCell align="center">Discard</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(({ fullname, _id, email, posts, admin }) => (
          <StyledTableRow key={_id}>
            <StyledTableCell component="th" scope="row">
              {fullname}
            </StyledTableCell>
            <StyledTableCell>{email}</StyledTableCell>
            <StyledTableCell align="center">{posts.length}</StyledTableCell>
            <StyledTableCell align="center">
              {admin ? (
                <Typography color="textSecondary" variant="body1" spacing="3">
                  Admin
                </Typography>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => confirmMakeAdmin(_id)}
                >
                  Make Admin
                </Button>
              )}
            </StyledTableCell>
            <StyledTableCell align="center">
              {authUserId !== _id ? (
                <IconButton onClick={() => confirmDeleteUser(_id)}>
                  <SvgIcon>
                    <TrashIcon />
                  </SvgIcon>
                </IconButton>
              ) : (
                <Typography color="textSecondary" variant="body1" spacing="3">
                  Logged in
                </Typography>
              )}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
