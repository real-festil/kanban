import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./column.module.css";
import Card from "../card/card";

class Column extends Component {
  state = {
    colName: this.props.colName,
    cardName: "",
    isHeadingInputFocused: false,
    isCardInputFocused: false,
    cards: [],
    cardsCount: 0
  };

  headingInput = React.createRef();
  cardInput = React.createRef();

  cards = [];
  defaultCardName = "";

  componentDidMount() {
    this.setState({
      colName: localStorage.getItem(this.props.colName) || this.props.colName,
      cards:
        JSON.parse(localStorage.getItem(this.props.colName + " Cards")) || [],
      cardsCount: JSON.parse(
        localStorage.getItem(this.props.colName + " count")
      )
    });
    setTimeout(() => (this.cards = this.state.cards), 0);
    console.log(this.state.cardsCount);
  }

  inputChangeHandler = (e, ref) => {
    switch (ref) {
      case this.headingInput:
        this.setState({ colName: e.target.value });
        break;
      case this.cardInput:
        this.setState({ cardName: e.target.value });
        break;
      default:
        break;
    }
  };

  inputKeyHandler = e => {
    if (e.key === "Enter" || e.key === "Escape") {
      this.headingInput.current.blur();
    }
  };

  inputBlurHandler = ref => {
    switch (ref) {
      case this.headingInput:
        if (this.state.colName === "")
          this.setState({ colName: this.props.colName });
        this.setState({ isHeadingInputFocused: false });
        localStorage.setItem(this.props.colName, this.state.colName);
        break;
      case this.cardInput:
        this.setState({ isCardInputFocused: false });
        break;
      default:
        break;
    }
  };

  inputFocusHandler = ref => {
    ref.current.focus();
    switch (ref) {
      case this.headingInput:
        this.setState({
          isHeadingInputFocused: true,
          isCardInputFocused: false
        });
        break;
      case this.cardInput:
        this.setState({ isCardInputFocused: true });
        break;
      default:
        break;
    }
  };

  onDelete = cardName => {
    let cards = this.state.cards;
    cards = cards.filter(card => cardName !== card.name);
    if (cards.length === 0) {
      this.setState({ cards: [] });
      localStorage.removeItem(this.state.colName + " Cards");
    } else {
      this.setState({ cards: cards });
      setTimeout(() =>
        localStorage.setItem(
          this.state.colName + " Cards",
          JSON.stringify(this.state.cards),
          0
        )
      );
    }
    setTimeout(() => (this.cards = this.state.cards), 0);
  };

  cardNameChanged = (e, cardIndex) => {
    const cards = this.state.cards;
    cards[this.state.cards.findIndex(obj => obj.index === cardIndex)].name =
      e.target.value;
    this.setState({ cards: cards });
  };

  cardNameInputBlurred = cardIndex => {
    if (
      this.state.cards[
        this.state.cards.findIndex(obj => obj.index === cardIndex)
      ].name === ""
    ) {
      this.cards[
        this.state.cards.findIndex(obj => obj.index === cardIndex)
      ].name = this.defaultCardName;
      this.setState({ cards: this.cards });
      setTimeout(
        () =>
          localStorage.setItem(
            this.colName + " Cards",
            JSON.stringify(this.state.cards)
          ),
        0
      );
    } else {
      setTimeout(
        () =>
          localStorage.setItem(
            this.props.colName + " Cards",
            JSON.stringify(this.state.cards)
          ),
        0
      );
    }
  };

  cardNameInputFocused = cardIndex => {
    this.defaultCardName = this.state.cards[
      this.state.cards.findIndex(obj => obj.index === cardIndex)
    ].name;
  };

  addCard = () => {
    let cards = this.state.cards;
    if (this.state.cardName === "") {
      alert("Введите заголовок");
    } else {
      cards.push({
        index: this.state.cardsCount,
        name: this.state.cardName,
        comments: 0
      });
      this.setState({
        cards: cards,
        cardName: "",
        isCardInputFocused: false,
        cardsCount: this.state.cardsCount + 1
      });
      this.cardInput.current.value = "";
      localStorage.setItem(
        this.props.colName + " Cards",
        JSON.stringify(this.state.cards)
      );
      setTimeout(
        () =>
          localStorage.setItem(
            this.props.colName + " count",
            this.state.cardsCount
          ),
        0
      );
    }
    this.cards = this.state.cards;
  };

  render() {
    return (
      <Container className={classes.Column}>
        <Col>
          <Row>
            <h5
              md={4}
              onClick={() => this.inputFocusHandler(this.headingInput)}
              style={{
                display: this.state.isHeadingInputFocused ? "none" : "block",
                width: "100%",
                marginTop: "2px",
                overflowWrap: "break-word"
              }}
            >
              {this.state.colName}
            </h5>
            <input
              onChange={e => this.inputChangeHandler(e, this.headingInput)}
              onBlur={() => this.inputBlurHandler(this.headingInput)}
              onKeyPress={this.inputKeyHandler}
              value={this.state.colName}
              ref={this.headingInput}
              style={{
                position: this.state.isHeadingInputFocused
                  ? "static"
                  : "absolute",
                top: "3%",
                marginLeft: "-1px",
                width: "90%",
                border: "1px solid #0079bf",
                fontSize: "1.25rem",
                fontWeight: "500",
                padding: "1px 0",
                marginBottom: "6px",
                lineHeight: "1.2",
                zIndex: this.state.isHeadingInputFocused ? "1" : "-1"
              }}
            />
          </Row>
          <Row>
            <Container>
              {this.state.cards.map((card, index) => {
                return (
                  <div key={index}>
                    <Card
                      index={card.index}
                      cardNameValue={card.name}
                      focused={() => this.cardNameInputFocused(card.index)}
                      blurred={() => this.cardNameInputBlurred(card.index)}
                      onDelete={() => this.onDelete(card.name)}
                      cardName={card.name}
                      comments={card.comments}
                      colName={this.state.colName}
                      cardNameChanged={e => this.cardNameChanged(e, card.index)}
                    />
                  </div>
                );
              })}
            </Container>
          </Row>
          <Row>
            <div>
              <div
                style={{
                  position: this.state.isCardInputFocused
                    ? "static"
                    : "absolute",
                  top: "-3%",
                  marginBottom: "15px",
                  zIndex: this.state.isCardInputFocused ? "1" : "-1"
                }}
              >
                <input
                  onChange={e => this.inputChangeHandler(e, this.cardInput)}
                  onKeyPress={this.inputKeyHandler}
                  placeholder="Введите заголовок"
                  ref={this.cardInput}
                  style={{
                    marginLeft: "-1px",
                    width: "90%",
                    border: "1px solid #0079bf",
                    fontSize: "16px",
                    padding: "1px 0",
                    marginBottom: "6px",
                    lineHeight: "1.2"
                  }}
                />
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.addCard}
                  style={{ marginRight: "20px" }}
                >
                  Добавить
                </button>
                <button
                  onClick={() => this.inputBlurHandler(this.cardInput)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Отмена
                </button>
              </div>
              <button
                type="button"
                onClick={() => this.inputFocusHandler(this.cardInput)}
                className="btn btn-outline-primary"
                style={{
                  display: this.state.isCardInputFocused ? "none" : "block",
                  marginBottom: "15px"
                }}
              >
                Добавить карточку
              </button>
            </div>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default Column;
