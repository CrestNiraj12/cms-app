import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const mapStateToProps = (state) => ({
  flash: state.flash,
});

const FlashCard = ({ flash }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(flash.status);
  }, [flash]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success">
        {flash.status && flash.message}
      </Alert>
    </Snackbar>
  );
};

export default connect(mapStateToProps)(FlashCard);
