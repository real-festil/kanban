import React, { Component } from "react";
import classes from "./addCard.module.css";

class AddCard extends Component {
  state = {
    cardName: "",
    isCardInputFocused: false
  };

  onCardAdded = () => {
    this.props.onCardAdded(this.state.cardName);
    this.inputBlurHandler();
  };

  inputBlurHandler = () => {
    this.setState({ cardName: "", isCardInputFocused: false });
  };

  inputKeyHandler = e => {
    if (e.key === "Enter") this.onCardAdded();
    if (e.key === "Escape") this.inputBlurHandler();
  };

  render() {
    const { isCardInputFocused, cardName } = this.state;

    return (
      <>
        {isCardInputFocused ? (
          <div className={classes.AddCardControl}>
            <input
              autoFocus
              onChange={e => this.setState({ cardName: e.target.value })}
              value={cardName}
              onKeyUp={this.inputKeyHandler}
              placeholder="Введите заголовок"
            />
            <button
              type="button"
              className="btn btn-success"
              onClick={this.onCardAdded}
            >
              Добавить
            </button>
            <button
              onClick={this.inputBlurHandler}
              type="button"
              className="btn btn-secondary"
            >
              Отмена
            </button>
          </div>
        ) : null}
        {isCardInputFocused ? null : (
          <div className={classes.ButtonWrapper}>
            <button
              type="button"
              onClick={() => this.setState({ isCardInputFocused: true })}
              className="btn btn-outline-primary"
            >
              Добавить карточку
            </button>
          </div>
        )}
      </>
    );
  }
}

export default AddCard;
