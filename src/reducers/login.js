import { handleActions } from "redux-actions";
import { login } from "../actions";

const initialState = "";

export default handleActions(
  {
    [login](state, action) {
      return action.payload.text;
    }
  },
  initialState
);
