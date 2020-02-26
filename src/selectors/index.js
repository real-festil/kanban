import { createSelector } from "reselect";

const getCards = state => state.cards;
const getComments = state => state.comments;

export const getLogin = state => state.login;

export const getColumns = state => state.columnsList;

export const getColumnCards = createSelector(
  getCards,
  getComments,
  (_, colId) => colId,
  (cards, comments, colId) =>
    cards
      .filter(card => card.colId === colId)
      .map(card => ({
        ...card,
        comments: comments.filter(comment => comment.cardId === card.id)
      }))
);

export const getCardComments = createSelector(
  getComments,
  (_, cardId) => cardId,
  (comments, cardId) => comments.filter(comment => comment.cardId === cardId)
);
