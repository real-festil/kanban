import React from "react";
import { Modal, Button } from "react-bootstrap";
import CommentItem from "../comment/commentItem/commentItem";
import Caption from "../caption/caption";
import Description from "../description/description";
import CommentForm from "../comment/commentForm/commentForm";
import classes from "./modal.module.css";

const modal = props => {
  const onDelete = () => {
    let { onCardDelete, onHide } = props;
    onCardDelete();
    onHide();
  };

  let {
    colName,
    changeCardName,
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
            changeInputName={value => changeCardName(value)}
          />
          <p className={classes.SubHeading}>в колонке {colName}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Description
          cardDesc={cardDesc}
          onDescSaved={value => onDescSaved(value)}
          onDescUndo={onDescUndo}
        />
      </Modal.Body>
      <Modal.Body>
        <CommentForm onCommentSaved={value => onCommentSaved(value)} />
        <div className={classes.Comment}>
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              onCommentChange={newValue =>
                onCommentChange(newValue, comment.id)
              }
              commentText={comment.value}
              onCommentDelete={() => onCommentDelete(comment.id)}
              username={username}
            />
          ))}
        </div>
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

export default modal;
