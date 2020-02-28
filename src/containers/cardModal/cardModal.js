import React from "react";
import { Modal, Button } from "react-bootstrap";
import Caption from "../../components/caption/caption";
import Description from "../../components/description/description";
import CommentCreateForm from "../../components/comments/commentCreateForm/commentCreateForm";
import CommentItem from "../../components/comments/commentItem/commentItem";
import { deleteCard, editCardName, editCardDesc } from "../../reducers/cards";
import {
  addComment,
  editComment,
  deleteComment
} from "../../reducers/comments";
import { connect } from "react-redux";
import classes from "./cardModal.module.css";
import { v4 as uuidv4 } from "uuid";
import { getLogin } from "../../selectors/login";
import { getCardComments } from "../../selectors/comments";
import PropTypes from "prop-types";

const modal = props => {
  const {
    colName,
    dispatch,
    cardId,
    comments,
    show,
    onHide,
    cardName,
    cardDesc,
    username
  } = props;

  const onDelete = () => {
    const { onHide } = props;

    dispatch(deleteCard({ id: cardId }));
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
            changeInputName={text =>
              dispatch(editCardName({ text: text, id: cardId }))
            }
          />
          <p className={classes.SubHeading}>в колонке {colName}</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Description
          cardDesc={cardDesc}
          onDescSaved={text =>
            dispatch(editCardDesc({ cardId: cardId, text: text }))
          }
        />
      </Modal.Body>
      <Modal.Body>
        <CommentCreateForm
          onCommentSaved={text =>
            dispatch(addComment({ id: uuidv4(), cardId: cardId, text: text }))
          }
        />
        {comments.map((comment, index) => {
          const { id, value } = comment;

          return (
            <CommentItem
              key={index}
              username={username}
              onCommentChange={text =>
                dispatch(editComment({ id: id, text: text }))
              }
              commentText={value}
              onCommentDelete={() => dispatch(deleteComment({ id: id }))}
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

modal.propTypes = {
  colName: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardDesc: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  cardId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
  return {
    comments: getCardComments(state, props.cardId),
    username: getLogin(state)
  };
}

export default connect(mapStateToProps)(modal);
