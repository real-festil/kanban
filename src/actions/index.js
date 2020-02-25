import * as types from "../constants/actionTypes";

export const editColName = (id, text) => ({
  type: types.EDIT_COL_NAME,
  id,
  text
});

export const addCard = (id, colId, text) => ({
  type: types.ADD_CARD,
  id,
  colId,
  text
});

export const editCardName = (id, text) => ({
  type: types.EDIT_CARD_NAME,
  id,
  text
});

export const deleteCard = id => ({
  type: types.DELETE_CARD,
  id
});

export const editCardDesc = (id, text) => ({
  type: types.EDIT_CARD_DESC,
  id,
  text
});

export const addComment = (id, text) => ({
  type: types.ADD_COMMENT,
  id,
  text
});

export const editComment = (id, text) => ({
  type: types.EDIT_COMMENT,
  id,
  text
});

export const deleteComment = id => ({
  type: types.DELETE_COMMENT,
  id
});
