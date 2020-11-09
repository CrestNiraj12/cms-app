/* eslint-disable import/no-anonymous-default-export */
import { ALL_POSTS } from "../constants";

export default (state = [], action) => {
  switch (action.type) {
    case ALL_POSTS:
      return action.payload;
    default:
      return state;
  }
};
