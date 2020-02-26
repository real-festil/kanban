// import {
//   EDIT_COL_NAME,
//   ADD_CARD,
//   EDIT_CARD_NAME,
//   DELETE_CARD,
//   EDIT_CARD_DESC,
//   ADD_COMMENT,
//   EDIT_COMMENT,
//   DELETE_COMMENT
// } from "../constants/actionTypes";

// const initialState = {
//   columnsList: [
//     { id: 0, name: "ToDo" },
//     { id: 1, name: "InProgress" },
//     { id: 2, name: "Testing" },
//     { id: 3, name: "Done" }
//   ],
//   username: "",
//   cards: [],
//   comments: []
// };

// export default function reducer(state = initialState, action) {
//   switch (action.type) {
//     case EDIT_COL_NAME:
//       return {
//         ...state,
//         columnsList: state.columnsList.map(column =>
//           column.id === action.id ? { ...column, name: action.text } : column
//         )
//       };
//     case ADD_CARD:
//       return {
//         ...state,
//         cards: [
//           ...state.cards,
//           {
//             id: action.id,
//             colId: action.colId,
//             name: action.text,
//             comments: 0,
//             cardDesc: ""
//           }
//         ]
//       };
//     case EDIT_CARD_NAME:
//       return {
//         ...state,
//         cards: state.cards.map(card =>
//           card.id === action.id ? { ...card, name: action.text } : card
//         )
//       };
//     case DELETE_CARD:
//       return {
//         ...state,
//         cards: state.cards.filter(card => card.id !== action.id)
//       };
//     case EDIT_CARD_DESC:
//       return {
//         ...state,
//         cards: state.cards.map(card =>
//           card.id === action.id ? { ...card, cardDesc: action.text } : card
//         )
//       };
//     case ADD_COMMENT:
//       return {
//         ...state,
//         comments: [
//           ...state.comments,
//           {
//             id: action.id,
//             cardId: action.cardId,
//             value: action.text
//           }
//         ]
//       };
//     case EDIT_COMMENT:
//       return {
//         ...state,
//         comments: state.comments.map(comment =>
//           comment.id === action.id
//             ? { ...comment, value: action.text }
//             : comment
//         )
//       };
//     case DELETE_COMMENT:
//       return {
//         ...state,
//         comments: state.comments.filter(comment => comment.id !== action.id)
//       };
//     default:
//       return state;
//   }
// }
import cards from "./cards";
import columnsList from "./columnsList";
import comments from "./comments";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cards,
  columnsList,
  comments
});

export default rootReducer;
