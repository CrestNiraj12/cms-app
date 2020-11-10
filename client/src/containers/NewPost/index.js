import React, { Fragment, useState } from "react";
import {
  Button,
  Container,
  Grid,
  makeStyles,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { showFlash } from "../../actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 800,
    height: "100%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const mapDispatchToProps = (dispatch) => ({
  showFlash: (flash) => dispatch(showFlash(flash)),
});

const NewPost = ({ showFlash }) => {
  var history = useHistory();
  const classes = useStyles();

  const [post, setPost] = useState({
    title: "",
    description: "",
    content: "",
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();

    axios
      .post("/user/addpost", post)
      .then((res) => {
        history.push("/");
        showFlash({ status: true, message: res.data });
      })
      .catch((err) => {
        console.log(err.response);
        setError({ status: true, message: err.response.data });
      });
  };

  const handleInputChange = (e, value = null) => {
    setPost({
      ...post,
      [e.target.name]: value === null ? e.target.value : value,
    });
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "scroll",
          }}
          className={classes.paper}
          dangerouslySetInnerHTML={{
            __html:
              `<h1 style="font-size:3em;text-align:center">${post.title}</h1>` +
              `<p style="font-size:1em;color:gray;font-style:italic">${post.description}</p>` +
              post.content,
          }}
        ></div>
      </Modal>
      <Container maxWidth="md">
        <form noValidate autoComplete="off">
          <Grid
            width="100%"
            container
            spacing={3}
            style={{ marginTop: "20px" }}
          >
            <Grid item xs={12}>
              <Typography align="center" variant="h5" color="textSecondary">
                Add Post
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Title"
                name="title"
                variant="outlined"
                size="small"
                value={post.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Description"
                name="description"
                size="small"
                variant="outlined"
                value={post.description}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Editor
                apiKey="1lvin9aa1mtv7lw8kldumik1xbmvujcw56cr1dqatcnedqds"
                value={post.content}
                init={{
                  height: 500,
                  forced_root_block: "",
                  menubar: true,
                  a11y_advanced_options: true,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime table paste imagetools code help wordcount",
                    "importcss searchreplace autosave save directionality visualchars template codesample hr pagebreak nonbreaking toc",
                  ],
                  toolbar:
                    "undo redo | formatselect fontsizeselect | bold italic forecolor backcolor emoticons | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={(content, editor) =>
                  handleInputChange({ target: { name: "content" } }, content)
                }
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography variant="body2" color="secondary" align="center">
                  {error.message}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 80px", margin: "20px 20px" }}
                onClick={handleOpen}
              >
                Preview
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 80px", margin: "20px 0" }}
                onClick={handleSubmitPost}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default connect(null, mapDispatchToProps)(NewPost);
