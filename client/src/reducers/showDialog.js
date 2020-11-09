/* eslint-disable import/no-anonymous-default-export */
import { SHOW_DIALOG } from "../constants";

export default (
  state = {
    status: false,
    title: null,
    message: null,
    cancel: null,
    accept: null,
    action: null,
    params: {},
  },
  action
) => {
  switch (action.type) {
    case SHOW_DIALOG:
      return action.payload;
    default:
      return state;
  }
};
