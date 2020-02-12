import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./comment.module.css";

class Comment extends Component {
  state = {
    isCommentChanging: false,
    commentText: this.props.commentText
  };

  commentChangeRef = React.createRef();

  onCommentChange = ref => {
    this.setState({ isCommentChanging: true });
    setTimeout(() => ref.current.focus(), 0);
  };

  onCommentTextChange = e => {
    this.setState({ commentText: e.target.value });
  };

  onCommentSaved = () => {
    this.setState({ isCommentChanging: false });
    setTimeout(
      () => this.props.onCommentTextChanged(this.state.commentText),
      0
    );
  };

  render() {
    return (
      <div className={classes.Comment}>
        <b>{this.props.username}</b>
        <div className={classes.CommentText}>
          <p
            style={{ display: this.state.isCommentChanging ? "none" : "block" }}
          >
            {this.state.commentText}
          </p>
          <div className={classes.CommentTextChange}>
            <textarea
              defaultValue={this.state.commentText}
              ref={this.commentChangeRef}
              onChange={this.onCommentTextChange}
              style={{
                display: this.state.isCommentChanging ? "block" : "none"
              }}
            />
          </div>
          <Button
            className="btn btn-success"
            onClick={this.onCommentSaved}
            style={{
              display: this.state.isCommentChanging ? "block" : "none"
            }}
          >
            Сохранить
          </Button>
        </div>
        <div className={classes.CommentControl}>
          <p onClick={() => this.onCommentChange(this.commentChangeRef)}>
            Изменить
          </p>
          <p onClick={this.props.onCommentDelete}>Удалить</p>
        </div>
      </div>
    );
  }
}

export default Comment;
