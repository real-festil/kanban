import { createSelector } from "reselect";

const getComments = state => state.comments;

export const getCardComments = createSelector(
  getComments,
  (_, cardId) => cardId,
  (comments, cardId) => comments.filter(comment => comment.cardId === cardId)
);
