import cards from "./cards";
import columnsList from "./columnsList";
import comments from "./comments";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cards,
  columnsList,
  comments
});

export default rootReducer;
