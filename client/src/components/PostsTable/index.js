import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableBody,
  SvgIcon,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import { ReactComponent as TrashIcon } from "../UsersTable/delete.svg";
import { DELETE_POST } from "../../constants";
import { setAllPosts, showDialog } from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
  showDialog: (dialog) => dispatch(showDialog(dialog)),
  setAllPosts: (users) => dispatch(setAllPosts(users)),
});

const PostsTable = ({
  auth,
  posts,
  all,
  setAllPosts,
  showDialog,
  StyledTableCell,
  StyledTableRow,
}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/post/all")
      .then((res) => {
        setAllPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, [setAllPosts]);

  useEffect(() => {
    if (all) setData(posts);
    else setData(posts.filter((post) => post.authorId._id === auth.authUserId));
  }, [all, auth, posts]);

  const confirmDeletePost = (authorId, postId) => {
    showDialog({
      status: true,
      title: "Remove Post",
      message: "Do you want to remove this post?",
      cancel: "Cancel",
      accept: "Remove",
      action: DELETE_POST,
      params: { authorId, postId },
    });
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <StyledTableCell>Title</StyledTableCell>
          <StyledTableCell>Author</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell align="center">Created on</StyledTableCell>
          <StyledTableCell align="center">Updated on</StyledTableCell>
          <StyledTableCell align="center">Discard</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ _id, title, authorId, createdAt, updatedAt }) => (
          <StyledTableRow key={_id}>
            <StyledTableCell component="th" scope="row">
              <Link
                to={`/posts/${title.toLowerCase().split(" ").join("-")}-${_id}`}
              >
                {title}
              </Link>
            </StyledTableCell>
            <StyledTableCell>{authorId && authorId.fullname}</StyledTableCell>
            <StyledTableCell>{authorId && authorId.email}</StyledTableCell>
            <StyledTableCell align="center">
              {createdAt.slice(0, 10)}
            </StyledTableCell>
            <StyledTableCell align="center">
              {updatedAt.slice(0, 10)}
            </StyledTableCell>
            <StyledTableCell align="center">
              <IconButton onClick={() => confirmDeletePost(authorId._id, _id)}>
                <SvgIcon>
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsTable);
