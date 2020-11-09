/* eslint-disable import/no-anonymous-default-export */
import { IS_AUTHENTICATED } from "../constants";

export default (
  state = { status: false, authUserId: null, admin: false },
  action
) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
};
