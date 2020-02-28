import { handleActions, createAction } from "redux-actions";

const initialState = [];

export const addCard = createAction("ADD_CARD");
export const editCardName = createAction("EDIT_CARD_NAME");
export const deleteCard = createAction("DELETE_CARD");
export const editCardDesc = createAction("EDIT_CARD_DESC");

export default handleActions(
  {
    [addCard](state, action) {
      const { id, colId, text } = action.payload;

      return [
        ...state,
        {
          id,
          colId,
          name: text,
          comments: 0,
          cardDesc: ""
        }
      ];
    },
    [editCardName](state, action) {
      const { id, text } = action.payload;

      return state.map(card =>
        card.id === id ? { ...card, name: text } : card
      );
    },
    [deleteCard](state, action) {
      return state.filter(card => card.id !== action.payload.id);
    },
    [editCardDesc](state, action) {
      const { cardId, text } = action.payload;

      return state.map(card =>
        card.id === cardId ? { ...card, cardDesc: text } : card
      );
    }
  },
  initialState
);
