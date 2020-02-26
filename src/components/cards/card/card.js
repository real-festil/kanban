import React, { Component } from "react";
import Modal from "../../../containers/cardModal/cardModal";
import classes from "./card.module.css";
import PropTypes from "prop-types";

class Card extends Component {
  state = {
    isModalShowed: false
  };

  onModalToggle = () =>
    this.setState({ isModalShowed: !this.state.isModalShowed });

  render() {
    const { colName, cardId, cardName, cardDesc, comments } = this.props;
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
            <p>{comments}</p>
          </div>
        </div>
        <Modal
          cardDesc={cardDesc}
          cardId={cardId}
          clicked={this.changeDesc}
          show={isModalShowed}
          onHide={this.onModalToggle}
          cardName={cardName}
          colName={colName}
        />
      </>
    );
  }
}

Card.propTypes = {
  colName: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardDesc: PropTypes.string,
  comments: PropTypes.number.isRequired
};

export default Card;
