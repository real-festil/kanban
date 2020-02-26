import { createSelector } from "reselect";

const getCards = state => state.cards;
const getComments = state => state.comments;

export const getColumns = state => state.columnsList;

export const getColumnCards = createSelector(
  getCards,
  (_, colId) => colId,
  (cards, colId) => cards.filter(card => card.colId === colId)
);

export const getCardComments = createSelector(
  getComments,
  (_, cardId) => cardId,
  (comments, cardId) => comments.filter(comment => comment.cardId === cardId)
);
