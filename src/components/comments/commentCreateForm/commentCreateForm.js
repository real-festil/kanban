import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./commentCreateForm.module.css";
import PropTypes from "prop-types";

class CommentCreateForm extends Component {
  state = {
    isCommentFocus: false,
    commentText: ""
  };

  onCommentSaved = e => {
    this.props.onCommentSaved(this.state.commentText);
    this.setState({ isCommentFocus: false, commentText: "" });
  };

  render() {
    const { isCommentFocus, commentText } = this.state;

    return (
      <>
        <b>Комментарии</b>
        <div
          className={classes.AddComment}
          style={{ height: isCommentFocus ? "150px" : "50px" }}
          onChange={e =>
            e.target.value
              ? this.setState({ isCommentFocus: true })
              : this.setState({ isCommentFocus: false })
          }
        >
          <textarea
            placeholder="Напишите комментарий..."
            value={commentText}
            onChange={e => this.setState({ commentText: e.target.value })}
          />
          {isCommentFocus && (
            <Button
              className="btn btn-success"
              onClick={this.onCommentSaved}
              onFocus={() => this.setState({ isCommentFocus: true })}
            >
              Сохранить
            </Button>
          )}
        </div>
      </>
    );
  }
}

CommentCreateForm.propTypes = {
  onCommentSaved: PropTypes.func.isRequired
};

export default CommentCreateForm;
