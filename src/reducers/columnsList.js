import { handleActions, createAction } from "redux-actions";

export const editColName = createAction("EDIT_COL_NAME");

const initialState = [
  { id: 0, name: "ToDo" },
  { id: 1, name: "InProgress" },
  { id: 2, name: "Testing" },
  { id: 3, name: "Done" }
];

export default handleActions(
  {
    [editColName](state, action) {
      const { id, text } = action.payload;

      return state.map(column =>
        column.id === id ? { ...column, name: text } : column
      );
    }
  },
  initialState
);
