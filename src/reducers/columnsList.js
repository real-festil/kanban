import { EDIT_COL_NAME } from "../constants/actionTypes";

const initialState = [
  { id: 0, name: "ToDo" },
  { id: 1, name: "InProgress" },
  { id: 2, name: "Testing" },
  { id: 3, name: "Done" }
];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_COL_NAME:
      return [
        ...state.map(column =>
          column.id === action.id ? { ...column, name: action.text } : column
        )
      ];
    default:
      return state;
  }
}
