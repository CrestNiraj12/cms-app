import { combineReducers } from "redux";
import flash from "./showFlash";
import auth from "./isAuthenticated";
import dialog from "./showDialog";
import users from "./users";
import posts from "./posts";

export default combineReducers({ flash, dialog, auth, users, posts });
