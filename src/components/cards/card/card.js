import React, { Component } from "react";
import Modal from "../../../containers/commentModal/commentModal";
import classes from "./card.module.css";

class Card extends Component {
  state = {
    isModalShowed: false
  };

  onModalToggle = () =>
    this.setState({ isModalShowed: !this.state.isModalShowed });

  render() {
    const {
      colName,
      cardId,
      changeCardName,
      onCardDelete,
      onDescSaved,
      onCommentSaved,
      comments,
      onCommentChange,
      onCommentDelete,
      username,
      cardName,
      cardDesc
    } = this.props;
    const { isModalShowed } = this.state;

    return (
      <>
        <div
          className={classes.Card}
          onClick={this.onModalToggle}
          type="button"
        >
          <div className={classes.CardName}>
            <p>{cardName}</p>
          </div>
          <div className={classes.CardComments}>
            <img
              src="https://image.flaticon.com/icons/svg/1946/1946412.svg"
              alt=""
            />
            <p>{comments.length}</p>
          </div>
        </div>
        <Modal
          cardDesc={cardDesc}
          cardId={cardId}
          onDescSaved={onDescSaved}
          onCardDelete={onCardDelete}
          clicked={this.changeDesc}
          show={isModalShowed}
          onHide={this.onModalToggle}
          cardName={cardName}
          colName={colName}
          changeCardName={changeCardName}
          onCommentSaved={onCommentSaved}
          onCommentChange={onCommentChange}
          onCommentDelete={onCommentDelete}
          comments={comments}
          username={username}
        />
      </>
    );
  }
}

export default Card;
