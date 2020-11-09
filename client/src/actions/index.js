import { IS_AUTHENTICATED, SHOW_FLASH } from "../constants";

export const showFlash = (flash) => ({
  type: SHOW_FLASH,
  payload: flash,
});

export const setAuth = (auth) => ({
  type: IS_AUTHENTICATED,
  payload: auth,
});
