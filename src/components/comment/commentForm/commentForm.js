import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./commentForm.module.css";

class CommentForm extends Component {
  state = {
    isCommentFocus: false,
    commentText: ""
  };

  onCommentSaved = e => {
    // if (this.state.commentText !== "") {
    //   console.log("1");
    //   this.setState({ isCommentChanging: false });
    //   setTimeout(
    //     () => this.props.onCommentTextChanged(this.state.commentText),
    //     0
    //   );
    // } else {
    //   console.log("2");
    //   this.setState({ isCommentChanging: false });
    //   setTimeout(
    //     () => this.props.onCommentTextChanged(this.props.commentText),
    //     0
    //   );
    // }
    this.props.onCommentSaved(this.state.commentText);
    this.setState({ isCommentFocus: false, commentText: "" });
  };

  render() {
    let { isCommentFocus, commentText } = this.state;
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
          {isCommentFocus ? (
            <Button
              className="btn btn-success"
              onClick={e => this.onCommentSaved(e)}
              onFocus={() => this.setState({ isCommentFocus: true })}
            >
              Сохранить
            </Button>
          ) : null}
        </div>
      </>
    );
  }
}

export default CommentForm;
