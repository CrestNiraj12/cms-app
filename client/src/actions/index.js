import {
  IS_AUTHENTICATED,
  SHOW_FLASH,
  SHOW_DIALOG,
  ALL_USERS,
  ALL_POSTS,
} from "../constants";

export const showFlash = (flash) => ({
  type: SHOW_FLASH,
  payload: flash,
});

export const setAuth = (auth) => ({
  type: IS_AUTHENTICATED,
  payload: auth,
});

export const showDialog = (dialog) => ({
  type: SHOW_DIALOG,
  payload: dialog,
});

export const setAllUsers = (users) => ({
  type: ALL_USERS,
  payload: users,
});

export const setAllPosts = (posts) => ({
  type: ALL_POSTS,
  payload: posts,
});

export const deleteUser = (id) => (dispatch, getState, axios) =>
  axios
    .delete(`/user/${id}`)
    .then((res) => {
      dispatch(showFlash({ status: true, message: res.data }));
      dispatch(setAllUsers(getState().users.filter((user) => user._id !== id)));
    })
    .catch((err) => console.log(err));

export const makeAdmin = (id) => (dispatch, getState, axios) =>
  axios
    .put(`/user/makeAdmin/${id}`)
    .then((res) => {
      dispatch(showFlash({ status: true, message: res.data.message }));
      res.data.user.admin = true;
      dispatch(
        setAllUsers([
          ...getState().users.filter((user) => user._id !== id),
          res.data.user,
        ])
      );
    })
    .catch((err) => console.log(err));

export const deletePost = (authorId, postId) => (dispatch, getState, axios) => {
  axios
    .delete(`/post/${authorId}/${postId}`)
    .then((res) => {
      dispatch(showFlash({ status: true, message: res.data }));
      if (getState().posts !== null)
        dispatch(
          setAllPosts(getState().posts.filter((post) => post._id !== postId))
        );
    })
    .catch((err) => console.log(err.response));
};
