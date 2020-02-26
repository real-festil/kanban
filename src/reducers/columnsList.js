import { handleActions } from "redux-actions";
import { editColName } from "../actions";

const initialState = [
  { id: 0, name: "ToDo" },
  { id: 1, name: "InProgress" },
  { id: 2, name: "Testing" },
  { id: 3, name: "Done" }
];

export default handleActions(
  {
    [editColName](state, action) {
      return state.map(column =>
        column.id === action.payload.id
          ? { ...column, name: action.payload.text }
          : column
      );
    }
  },
  initialState
);
