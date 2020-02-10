import React, { Component } from 'react';
import Modal from '../modal/modal';
import classes from './card.module.css';

class Card extends Component {
  state = {
    isModalShowed: false
  }

  onModalShowed = () => {
    this.setState({isModalShowed: !this.state.isModalShowed});
  }

  render() {
    return (
      <>
        <div
          className={classes.Card}
          onClick={this.onModalShowed}
          type="button"
          >
          <p>{this.props.cardName}</p>
          <p>{this.props.comments}</p>
        </div>
        <Modal
          onDelete={this.props.onDelete}
          show={this.state.isModalShowed}
          onHide={this.onModalShowed}
          cardName={this.props.cardName}
          colName={this.props.colName}
          />
      </>
    )
  }
}

export default Card;