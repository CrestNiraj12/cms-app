/* eslint-disable import/no-anonymous-default-export */
import { ALL_USERS } from "../constants";

export default (state = [], action) => {
  switch (action.type) {
    case ALL_USERS:
      return action.payload;
    default:
      return state;
  }
};
