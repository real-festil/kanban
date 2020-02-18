import React, { Component } from "react";
import Modal from "../../modal/modal";
import classes from "./card.module.css";

class Card extends Component {
  state = {
    isModalShowed: false
  };

  onModalShowed = () => {
    this.setState({ isModalShowed: !this.state.isModalShowed });
    console.log(this.props.comments.length);
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
