import React, { Component } from "react";
import Modal from "../../modal/modal";
import classes from "./card.module.css";

class Card extends Component {
  state = {
    isModalShowed: false,
    commentsCount: 0,
    cardDesc: "Добавьте описание",
    username: ""
  };

  componentDidMount() {
    this.setState({
      cardDesc:
        localStorage.getItem(
          this.props.colName +
            " " +
            this.props.cardName +
            " " +
            this.props.index +
            " desc"
        ) || "Добавьте описание",
      username: localStorage.getItem("username")
    });
  }

  onModalShowed = () => {
    this.setState({ isModalShowed: !this.state.isModalShowed });
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
          <div style={{ display: "flex", width: "15%" }}>
            <img
              style={{ width: "50%", marginRight: "5px" }}
              src="https://image.flaticon.com/icons/svg/1946/1946412.svg"
              alt=""
            />
            <p>{this.state.commentsCount}</p>
          </div>
        </div>
        <Modal
          cardDesc={this.props.cardDesc}
          onDescSaved={this.props.onDescSaved}
          onDescUndo={this.props.onDescUndo}
          textAreaChange={e => this.props.textAreaChange(e)}
          commentsCount={commentsCount =>
            this.setState({ commentsCount: commentsCount })
          }
          cardNameValue={this.props.cardNameValue}
          focused={this.props.focused}
          blurred={this.props.blurred}
          username={this.state.username}
          onCardDelete={this.props.onCardDelete}
          index={this.props.index}
          clicked={this.changeDesc}
          show={this.state.isModalShowed}
          onHide={this.onModalShowed}
          cardName={this.props.cardName}
          colName={this.props.colName}
          changeCardName={value => this.props.changeCardName(value)}
          saveInStorage={value => this.props.saveInStorage(value)}
        />
      </>
    );
  }
}

export default Card;
