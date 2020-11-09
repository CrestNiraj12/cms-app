import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import { connect } from "react-redux";
import { deletePost, deleteUser, makeAdmin } from "../../actions";
import { DELETE_POST, DELETE_USER, MAKE_ADMIN } from "../../constants";

const mapStateToProps = (state) => ({ dialog: state.dialog });

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (id) => dispatch(deleteUser(id)),
  makeAdmin: (id) => dispatch(makeAdmin(id)),
  deletePost: (authorId, postId) => dispatch(deletePost(authorId, postId)),
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = ({ dialog, deleteUser, deletePost, makeAdmin }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(dialog.status);
  }, [dialog]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    switch (dialog.action) {
      case DELETE_USER:
        deleteUser(dialog.params.id);
        break;
      case MAKE_ADMIN:
        makeAdmin(dialog.params.id);
        break;
      case DELETE_POST:
        deletePost(dialog.params.authorId, dialog.params.postId);
        break;
      default:
        setOpen(false);
    }
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {dialog.cancel}
        </Button>
        <Button onClick={handleAccept} color="primary" autoFocus>
          {dialog.accept}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogBox);
