import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import Comment from "../card/comment/comment";
import classes from "./modal.module.css";

class ModalComponent extends Component {
  state = {
    isNameInputFocused: false,
    isDescFocused: false,
    isCommentChanged: false,
    textarea: "",
    commentText: "",
    commentsCount: 0,
    comments: []
  };

  componentDidMount() {
    this.setState({
      commentsCount:
        JSON.parse(
          localStorage.getItem(
            this.props.colName +
              " " +
              this.props.cardName +
              " " +
              this.props.index +
              " commentsCount"
          )
        ) + 1 || 0,
      comments:
        JSON.parse(
          localStorage.getItem(
            this.props.colName +
              " " +
              this.props.cardName +
              " " +
              this.props.index +
              " comments"
          )
        ) || []
    });
    setTimeout(() => this.props.commentsCount(this.state.comments.length), 0);
  }

  nameInput = React.createRef();

  render() {
    const onDelete = () => {
      this.props.onDelete();
      this.props.onHide();
    };

    const changeCardName = () => {
      this.setState({ isNameInputFocused: true });
      this.nameInput.current.focus();
    };

    const onBlurred = () => {
      this.setState({ isNameInputFocused: false });
      this.props.blurred();
    };

    const onDescFocused = () => {
      this.setState({ isDescFocused: true });
    };

    const textAreaChange = e => {
      this.setState({ textarea: e.target.value });
    };

    const onDescSaved = () => {
      this.setState({ isDescFocused: false });
      this.props.onDescSaved(this.state.textarea);
    };

    const onDescUndo = () => {
      this.setState({ isDescFocused: false });
      this.props.onDescUndo();
    };

    const onCommentChanged = e => {
      if (e.target.value !== "") {
        this.setState({ isCommentChanged: true, commentText: e.target.value });
      } else this.setState({ isCommentChanged: false });
    };

    const onCommentSaved = () => {
      let commentsCount = this.state.commentsCount + 1;
      let comments = this.state.comments;
      comments.unshift({
        index: commentsCount,
        commentText: this.state.commentText,
        commentAuthor: this.props.username
      });
      this.setState({
        comments: comments,
        commentsCount: commentsCount,
        isCommentChanged: false,
        commentText: ""
      });
      localStorage.setItem(
        this.props.colName +
          " " +
          this.props.cardName +
          " " +
          this.props.index +
          " comments",
        JSON.stringify(this.state.comments)
      );
      localStorage.setItem(
        this.props.colName +
          " " +
          this.props.cardName +
          " " +
          this.props.index +
          " commentsCount",
        this.state.commentsCount
      );
      setTimeout(() => this.props.commentsCount(this.state.comments.length), 0);
    };

    const onCommentDelete = key => {
      let comments = this.state.comments;
      comments = comments.filter(comment => comment.index !== key);
      this.setState({ comments: comments });
      console.log(this.state.comments);
      setTimeout(
        () =>
          localStorage.setItem(
            this.props.colName +
              " " +
              this.props.cardName +
              " " +
              this.props.index +
              " comments",
            JSON.stringify(this.state.comments)
          ),
        0
      );
      setTimeout(() => this.props.commentsCount(this.state.comments.length), 0);
    };

    const onCommentTextChanged = (key, commentText) => {
      let comments = this.state.comments;
      comments[
        comments.findIndex(obj => obj.index === key)
      ].commentText = commentText;
      this.setState({ comments: comments });
      setTimeout(
        () =>
          localStorage.setItem(
            this.props.colName +
              " " +
              this.props.cardName +
              " " +
              this.props.index +
              " comments",
            JSON.stringify(this.state.comments)
          ),
        0
      );
    };

    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <p
              style={{
                display: this.state.isNameInputFocused ? "none" : "block",
                cursor: "pointer"
              }}
              onClick={changeCardName}
            >
              {this.props.cardName}
            </p>
            <input
              onChange={this.props.cardNameChanged}
              value={this.props.cardNameValue}
              ref={this.nameInput}
              onFocus={this.props.focused}
              onBlur={onBlurred}
              style={{
                position: this.state.isNameInputFocused ? "static" : "absolute",
                top: "3%",
                marginLeft: "-1px",
                width: "90%",
                border: "1px solid #0079bf",
                fontSize: "24px",
                fontWeight: "500",
                padding: "1px 0",
                marginBottom: "18px",
                lineHeight: "1.2",
                zIndex: this.state.isNameInputFocused ? "1" : "-1"
              }}
            />
            <p className={classes.SubHeading}>в колонке {this.props.colName}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>Описание</b>
          <p
            onClick={onDescFocused}
            style={{
              display: this.state.isDescFocused ? "none" : "block",
              cursor: "pointer"
            }}
          >
            {this.props.cardDesc}
          </p>
          <div
            style={{
              display: this.state.isDescFocused ? "block" : "none"
            }}
          >
            <textarea
              onChange={textAreaChange}
              defaultValue={this.props.cardDesc}
              style={{
                width: "100%",
                height: "100px",
                resize: "none"
              }}
            />
            <Button style={{ marginRight: "20px" }} onClick={onDescSaved}>
              Сохранить
            </Button>
            <Button className="btn btn-secondary" onClick={onDescUndo}>
              Отменить
            </Button>
          </div>
        </Modal.Body>
        <Modal.Body>
          <b>Комментарии</b>
          <div
            className={classes.AddComment}
            style={{ height: this.state.isCommentChanged ? "150px" : "50px" }}
          >
            <textarea
              placeholder="Напишите комментарий..."
              value={this.state.commentText}
              onChange={onCommentChanged}
            />
            <Button
              className="btn btn-success"
              onClick={onCommentSaved}
              style={{
                display: this.state.isCommentChanged ? "block" : "none"
              }}
            >
              Сохранить
            </Button>
          </div>
          <div className={classes.Comment}>
            {this.state.comments.map(comment => (
              <Comment
                key={comment.index}
                onCommentTextChanged={commentText =>
                  onCommentTextChanged(comment.index, commentText)
                }
                commentText={comment.commentText}
                onCommentDelete={() => onCommentDelete(comment.index)}
                username={comment.commentAuthor}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={onDelete}>
            Удалить
          </Button>
          <Button onClick={this.props.onHide}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalComponent;
