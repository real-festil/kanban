import React, { Component } from "react";
import Modal from "../modal/modal";
import classes from "./card.module.css";

class Card extends Component {
  state = {
    isModalShowed: false,
    cardDesc: "Добавьте описание"
  };

  componentDidMount() {
    this.setState({
      cardDesc:
        localStorage.getItem(
          this.props.colName +
            " " +
            this.props.cardName +
            " " +
            this.props.index
        ) || "Добавьте описание"
    });
  }

  onModalShowed = () => {
    this.setState({ isModalShowed: !this.state.isModalShowed });
    console.log(this.props.index);
  };

  onDescSaved = textarea => {
    this.setState({ cardDesc: textarea });
    setTimeout(
      () =>
        localStorage.setItem(
          this.props.colName +
            " " +
            this.props.cardName +
            " " +
            this.props.index,
          this.state.cardDesc
        ),
      0
    );
  };

  onDescUndo = () => {
    this.setState({
      cardDesc:
        localStorage.getItem(
          this.props.colName +
            " " +
            this.props.cardName +
            " " +
            this.props.index
        ) || "Добавьте описание"
    });
  };

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
          onDescSaved={textarea => this.onDescSaved(textarea)}
          cardNameValue={this.props.cardNameValue}
          focused={this.props.focused}
          blurred={this.props.blurred}
          onDelete={this.props.onDelete}
          onDescUndo={this.onDescUndo}
          cardDesc={this.state.cardDesc}
          clicked={this.changeDesc}
          show={this.state.isModalShowed}
          onHide={this.onModalShowed}
          cardName={this.props.cardName}
          colName={this.props.colName}
          cardNameChanged={this.props.cardNameChanged}
        />
      </>
    );
  }
}

export default Card;
