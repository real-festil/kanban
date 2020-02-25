import React from "react";
import { Modal, Button } from "react-bootstrap";
import Caption from "../caption/caption";
import Description from "../description/description";
import CommentCreateForm from "../comments/commentCreateForm/commentCreateForm";
import CommentItem from "../comments/commentItem/commentItem";
import * as actions from "../../actions";
import { connect } from "react-redux";
import classes from "./modal.module.css";

const modal = props => {
  const {
    colName,
    editCardName,
    editCardDesc,
    deleteCard,
    cardId,
    //changeCardName,
    onDescSaved,
    onDescUndo,
    onCommentSaved,
    comments,
    onCommentChange,
    onCommentDelete,
    username,
    show,
    onHide,
    cardName,
    cardDesc
  } = props;

  const onDelete = () => {
    const { onHide } = props;

    deleteCard(cardId);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Caption
            captionName={cardName}
            changeInputName={text => editCardName(cardId, text)}
          />
          <p className={classes.SubHeading}>в колонке {colName}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Description
          cardDesc={cardDesc}
          onDescSaved={text => editCardDesc(cardId, text)}
        />
      </Modal.Body>
      <Modal.Body>
        <CommentCreateForm onCommentSaved={onCommentSaved} />
        {comments.map((comment, index) => {
          const { id, value } = comment;

          return (
            <CommentItem
              key={index}
              onCommentChange={newValue => onCommentChange(newValue, id)}
              commentText={value}
              onCommentDelete={() => onCommentDelete(id)}
              username={username}
            />
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-danger" onClick={onDelete}>
          Удалить
        </Button>
        <Button onClick={onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, actions)(modal);
