import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./comment.module.css";

class CommentForm extends Component {
  state = {
    isCommentChanging: false,
    commentText: this.props.commentText
  };

  onCommentSave = e => {
    this.props.onCommentSaved(this.state.commentText);
    this.setState({ isCommentChanging: false, commentText: "" });
  };

  onCommentChange = () => {
    this.setState({ isCommentChanging: false }, () =>
      this.props.onCommentChange(this.state.commentText)
    );
  };

  render() {
    const { isCommentChanging, commentText } = this.state;
    const { onCommentDelete, username, isItem } = this.props;

    return (
      <>
        {isItem ? (
          <div className={classes.Comment}>
            <b>{username}</b>
            <div className={classes.CommentText}>
              {isCommentChanging ? (
                <>
                  <div className={classes.CommentTextChange}>
                    <textarea
                      autoFocus
                      defaultValue={this.props.commentText}
                      onChange={e =>
                        this.setState({
                          commentText: e.target.value
                        })
                      }
                    />
                  </div>
                  <Button
                    className="btn btn-success"
                    onClick={this.onCommentChange}
                  >
                    Сохранить
                  </Button>
                </>
              ) : (
                <p>{commentText}</p>
              )}
            </div>
            <div className={classes.CommentControl}>
              <p
                onClick={e =>
                  this.setState({
                    isCommentChanging: true,
                    commentText: e.target.value
                  })
                }
              >
                Изменить
              </p>
              <p onClick={onCommentDelete}>Удалить</p>
            </div>
          </div>
        ) : (
          <>
            <div
              className={classes.AddComment}
              style={{ height: isCommentChanging ? "150px" : "50px" }}
              onChange={e =>
                e.target.value
                  ? this.setState({ isCommentChanging: true })
                  : this.setState({ isCommentChanging: false })
              }
            >
              <textarea
                autoFocus
                placeholder="Напишите комментарий..."
                value={commentText}
                onChange={e => this.setState({ commentText: e.target.value })}
              />
              {isCommentChanging && (
                <Button
                  className="btn btn-success"
                  onClick={e => this.onCommentSave(e)}
                  onFocus={() => this.setState({ isCommentChanging: true })}
                >
                  Сохранить
                </Button>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}

export default CommentForm;
