import { addComment, editComment, deleteComment } from "../actions";
import { handleActions } from "redux-actions";

const initialState = [];

export default handleActions(
  {
    [addComment](state, action) {
      return [
        ...state,
        {
          id: action.payload.id,
          cardId: action.payload.cardId,
          value: action.payload.text
        }
      ];
    },
    [editComment](state, action) {
      return state.map(comment =>
        comment.id === action.payload.id
          ? { ...comment, value: action.payload.text }
          : comment
      );
    },
    [deleteComment](state, action) {
      return state.filter(comment => comment.id !== action.payload.id);
    }
  },
  initialState
);
