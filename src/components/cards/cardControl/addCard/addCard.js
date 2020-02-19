import React, { Component } from "react";
import classes from "./addCard.module.css";

class AddCard extends Component {
  state = {
    cardName: "",
    isCardFormOpened: false
  };

  onCardAdded = () => {
    this.props.onCardAdded(this.state.cardName);
    this.onCardFormClosed();
  };

  onCardFormClosed = () =>
    this.setState({ cardName: "", isCardFormOpened: false });

  inputKeyHandler = e => {
    if (e.key === "Enter") this.onCardAdded();
    if (e.key === "Escape") this.onCardFormClosed();
  };

  render() {
    const { isCardFormOpened, cardName } = this.state;

    return (
      <>
        {isCardFormOpened ? (
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
              onClick={this.onCardFormClosed}
              type="button"
              className="btn btn-secondary"
            >
              Отмена
            </button>
          </div>
        ) : (
          <div className={classes.ButtonWrapper}>
            <button
              type="button"
              onClick={() => this.setState({ isCardFormOpened: true })}
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
