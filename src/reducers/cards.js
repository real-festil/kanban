import {
  EDIT_COL_NAME,
  ADD_CARD,
  EDIT_CARD_NAME,
  DELETE_CARD,
  EDIT_CARD_DESC
} from "../constants/actionTypes";

const initialState = [{}];

export default function reducer(state = initialState, action) {
  const { type, id, colId, text } = action;

  switch (type) {
    case EDIT_COL_NAME:
    case ADD_CARD:
      return [
        ...state,
        {
          id: id,
          colId: colId,
          name: text,
          comments: 0,
          cardDesc: ""
        }
      ];
    case EDIT_CARD_NAME:
      return [
        ...state.map(card => (card.id === id ? { ...card, name: text } : card))
      ];
    case DELETE_CARD:
      return [...state.filter(card => card.id !== id)];
    case EDIT_CARD_DESC:
      return [
        ...state.map(card =>
          card.id === action.id ? { ...card, cardDesc: text } : card
        )
      ];
    default:
      return state;
  }
}
