import React from "react";
import { Modal, Button } from "react-bootstrap";
import Caption from "../../components/caption/caption";
import Description from "../../components/description/description";
import CommentCreateForm from "../../components/comments/commentCreateForm/commentCreateForm";
import CommentItem from "../../components/comments/commentItem/commentItem";
import * as actions from "../../actions";
import { connect } from "react-redux";
import classes from "./commentModal.module.css";
import { v4 as uuidv4 } from "uuid";

const modal = props => {
  const {
    colName,
    editCardName,
    editCardDesc,
    deleteCard,
    addComment,
    editComment,
    deleteComment,
    cardId,
    comments,
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
        <CommentCreateForm
          onCommentSaved={text => addComment(uuidv4(), cardId, text)}
        />
        {comments.map((comment, index) => {
          const { id, value } = comment;

          return (
            comment.cardId === cardId && (
              <CommentItem
                key={index}
                onCommentChange={text => editComment(id, text)}
                commentText={value}
                onCommentDelete={() => deleteComment(id)}
                username={username}
              />
            )
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

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default connect(mapStateToProps, actions)(modal);
