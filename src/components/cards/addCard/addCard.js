import React, { Component } from "react";
import classes from "./addCard.module.css";
import PropTypes from "prop-types";

class AddCard extends Component {
  state = {
    cardName: "",
    isCardFormOpened: false
  };

  onCardAdded = () => {
    if (this.state.cardName.trim()) {
      this.props.onCardAdded(this.state.cardName);
      this.onCardFormClosed();
    } else return alert("Введите имя карточки");
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

AddCard.propTypes = {
  onCardAdded: PropTypes.func.isRequired
};

export default AddCard;
