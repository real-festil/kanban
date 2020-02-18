import React, { Component } from "react";
import Modal from "../../modal/modal";
import classes from "./card.module.css";

class Card extends Component {
  state = {
    isModalShowed: false
  };

  onModalShowed = () => {
    this.setState({ isModalShowed: !this.state.isModalShowed });
  };

  render() {
    let {
      colName,
      changeCardName,
      onCardDelete,
      onDescSaved,
      onDescUndo,
      onCommentSaved,
      comments,
      onCommentChange,
      onCommentDelete,
      username,
      cardName,
      cardDesc
    } = this.props;

    let { commentsCount, isModalShowed } = this.state;
    return (
      <>
        <div
          className={classes.Card}
          onClick={this.onModalShowed}
          type="button"
        >
          <p>{cardName}</p>
          <div style={{ display: "flex", width: "15%" }}>
            <img
              style={{ width: "50%", marginRight: "5px" }}
              src="https://image.flaticon.com/icons/svg/1946/1946412.svg"
              alt=""
            />
            <p>{commentsCount}</p>
          </div>
        </div>
        <Modal
          cardDesc={cardDesc}
          onDescSaved={value => onDescSaved(value)}
          onDescUndo={onDescUndo}
          onCardDelete={onCardDelete}
          clicked={this.changeDesc}
          show={isModalShowed}
          onHide={this.onModalShowed}
          cardName={cardName}
          colName={colName}
          changeCardName={value => changeCardName(value)}
          onCommentSaved={value => onCommentSaved(value)}
          onCommentChange={(newValue, id) => onCommentChange(newValue, id)}
          onCommentDelete={id => onCommentDelete(id)}
          comments={comments}
          username={username}
        />
      </>
    );
  }
}

export default Card;
