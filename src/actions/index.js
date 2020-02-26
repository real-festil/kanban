import { createAction } from "redux-actions";

export const editColName = createAction("EDIT_COL_NAME");

export const addCard = createAction("ADD_CARD");

export const editCardName = createAction("EDIT_CARD_NAME");

export const deleteCard = createAction("DELETE_CARD");

export const editCardDesc = createAction("EDIT_CARD_DESC");

export const addComment = createAction("ADD_COMMENT");

export const editComment = createAction("EDIT_COMMENT");

export const deleteComment = createAction("DELETE_COMMENT");
