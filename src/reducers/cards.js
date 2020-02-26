import { handleActions } from "redux-actions";
import { editCardDesc, addCard, editCardName, deleteCard } from "../actions";

const initialState = [];

export default handleActions(
  {
    [addCard](state, action) {
      return [
        ...state,
        {
          id: action.payload.id,
          colId: action.payload.colId,
          name: action.payload.text,
          comments: 0,
          cardDesc: ""
        }
      ];
    },
    [editCardName](state, action) {
      return state.map(card =>
        card.id === action.payload.id
          ? { ...card, name: action.payload.text }
          : card
      );
    },
    [deleteCard](state, action) {
      return state.filter(card => card.id !== action.payload.id);
    },
    [editCardDesc](state, action) {
      console.log(action);
      return state.map(card =>
        card.id === action.payload.cardId
          ? { ...card, cardDesc: action.payload.text }
          : card
      );
    }
  },
  initialState
);

// export default function reducer(state = initialState, action) {
//   const { type, id, colId, text } = action;

//   switch (type) {
//     case ADD_CARD:
//       return [
//         ...state,
//         {
//           id: id,
//           colId: colId,
//           name: text,
//           comments: 0,
//           cardDesc: ""
//         }
//       ];
//     case EDIT_CARD_NAME:
//       return [
//         ...state.map(card => (card.id === id ? { ...card, name: text } : card))
//       ];
//     case DELETE_CARD:
//       return [...state.filter(card => card.id !== id)];
//     case EDIT_CARD_DESC:
//       return [
//         ...state.map(card =>
//           card.id === action.id ? { ...card, cardDesc: text } : card
//         )
//       ];
//     default:
//       return state;
//   }
// }
