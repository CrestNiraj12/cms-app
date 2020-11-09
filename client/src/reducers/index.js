import { combineReducers } from "redux";
import flash from "./showFlash";
import auth from "./isAuthenticated";

export default combineReducers({ flash, auth });
