import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./commentItem.module.css";

class CommentItem extends Component {
  state = {
    isCommentChanging: false,
    commentText: this.props.commentText
  };

  onCommentSave = () => {
    this.setState({ isCommentChanging: false }, () =>
      this.props.onCommentChange(this.state.commentText)
    );
  };

  onCommentChange = e => {
    this.setState({ isCommentChanging: true, commentText: e.target.value });
  };

  render() {
    const { onCommentDelete, username, commentText } = this.props;

    const { isCommentChanging } = this.state;

    return (
      <div className={classes.Comment}>
        <b>{username}</b>
        <div className={classes.CommentText}>
          {isCommentChanging ? (
            <>
              <div className={classes.CommentTextChange}>
                <textarea
                  autoFocus
                  defaultValue={commentText}
                  onChange={this.onCommentChange}
                />
              </div>
              <Button className="btn btn-success" onClick={this.onCommentSave}>
                Сохранить
              </Button>
            </>
          ) : (
            <p>{commentText}</p>
          )}
        </div>
        <div className={classes.CommentControl}>
          <p onClick={this.onCommentChange}>Изменить</p>
          <p onClick={onCommentDelete}>Удалить</p>
        </div>
      </div>
    );
  }
}

export default CommentItem;
