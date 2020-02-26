import React from "react";
import { Modal, Button } from "react-bootstrap";
import Caption from "../../components/caption/caption";
import Description from "../../components/description/description";
import CommentCreateForm from "../../components/comments/commentCreateForm/commentCreateForm";
import CommentItem from "../../components/comments/commentItem/commentItem";
import * as actions from "../../actions";
import { connect } from "react-redux";
import classes from "./cardModal.module.css";
import { v4 as uuidv4 } from "uuid";
import { getCardComments } from "../../selectors";

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

    deleteCard({ id: cardId });
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
            changeInputName={text => editCardName({ text: text, id: cardId })}
          />
          <p className={classes.SubHeading}>в колонке {colName}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Description
          cardDesc={cardDesc}
          onDescSaved={text => editCardDesc({ cardId: cardId, text: text })}
        />
      </Modal.Body>
      <Modal.Body>
        <CommentCreateForm
          onCommentSaved={text =>
            addComment({ id: uuidv4(), cardId: cardId, text: text })
          }
        />
        {comments.map((comment, index) => {
          const { id, value } = comment;

          return (
            <CommentItem
              key={index}
              onCommentChange={text => editComment({ id: id, text: text })}
              commentText={value}
              onCommentDelete={() => deleteComment({ id: id })}
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

function mapStateToProps(state, props) {
  return {
    comments: getCardComments(state, props.cardId)
  };
}

export default connect(mapStateToProps, actions)(modal);
