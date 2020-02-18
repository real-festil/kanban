import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./commentItem.module.css";

class CommentItem extends Component {
  state = {
    isCommentChanging: false,
    commentText: this.props.commentText
  };

  onCommentChange = e => {
    this.setState({ isCommentChanging: true, commentText: e.target.value });
  };

  onCommentSaved = () => {
    this.setState(
      {
        isCommentChanging: false,
        commentText: this.props.commentText
      },
      () => this.props.onCommentChange(this.state.commentText)
    );
  };

  render() {
    const { onCommentDelete, username } = this.props;

    const { isCommentChanging, commentText } = this.state;

    return (
      <div className={classes.Comment}>
        <b>{username}</b>
        <div className={classes.CommentText}>
          <p style={{ display: isCommentChanging ? "none" : "block" }}>
            {commentText}
          </p>
          <div className={classes.CommentTextChange}>
            <textarea
              defaultValue={commentText}
              ref={this.commentChangeRef}
              onChange={this.onCommentChange}
              style={{
                display: isCommentChanging ? "block" : "none"
              }}
            />
          </div>
          <Button
            className="btn btn-success"
            onClick={this.onCommentSaved}
            style={{
              display: isCommentChanging ? "block" : "none"
            }}
          >
            Сохранить
          </Button>
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
