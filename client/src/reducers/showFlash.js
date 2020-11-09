/* eslint-disable import/no-anonymous-default-export */
import { SHOW_FLASH } from "../constants";

export default (state = { status: false, message: null }, action) => {
  switch (action.type) {
    case SHOW_FLASH:
      return action.payload;
    default:
      return state;
  }
};
