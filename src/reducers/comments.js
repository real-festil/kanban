import { handleActions, createAction } from "redux-actions";

const initialState = [];

export const addComment = createAction("ADD_COMMENT");
export const editComment = createAction("EDIT_COMMENT");
export const deleteComment = createAction("DELETE_COMMENT");

export default handleActions(
  {
    [addComment](state, action) {
      const { id, cardId, text } = action.payload;

      return [
        ...state,
        {
          id,
          cardId,
          value: text
        }
      ];
    },
    [editComment](state, action) {
      const { id, text } = action.payload;

      return state.map(comment =>
        comment.id === id ? { ...comment, value: text } : comment
      );
    },
    [deleteComment](state, action) {
      return state.filter(comment => comment.id !== action.payload.id);
    }
  },
  initialState
);
