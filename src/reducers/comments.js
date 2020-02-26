import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from "../constants/actionTypes";

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        ...state,
        {
          id: action.id,
          cardId: action.cardId,
          value: action.text
        }
      ];
    case EDIT_COMMENT:
      return [
        ...state.map(comment =>
          comment.id === action.id
            ? { ...comment, value: action.text }
            : comment
        )
      ];
    case DELETE_COMMENT:
      return [...state.filter(comment => comment.id !== action.id)];
    default:
      return state;
  }
}
