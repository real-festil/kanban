import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./column.module.css";
import CardsList from "../cards/cardsList";
import Caption from "../caption/caption";

class Column extends Component {
  // state = {
  //   username: localStorage.getItem("username"),
  //   colName: localStorage.getItem(this.props.colName) || this.props.colName,
  //   cards:
  //     JSON.parse(localStorage.getItem(this.props.colName + " Cards")) || [],
  //   cardsCount: JSON.parse(localStorage.getItem(this.props.colName + " count")),
  //   cardDesc:
  //     localStorage.getItem(
  //       this.props.colName +
  //         " " +
  //         this.props.cardName +
  //         " " +
  //         this.props.index +
  //         " desc"
  //     ) || "Добавьте описание"
  // };

  initialState = {
    username: "",
    colName: this.props.colName,
    cards: [],
    cardDesc: []
  };

  state =
    JSON.parse(localStorage.getItem(this.props.colName)) || this.initialState;

  componentDidMount() {}

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

  onDescSaved = () => {
    let { cardDesc } = this.state;
    if (cardDesc !== "") {
      localStorage.setItem(
        this.props.colName +
          " " +
          this.props.cardName +
          " " +
          this.props.index +
          " desc",
        cardDesc
      );
    } else this.setState({ cardDesc: "Добавьте описание" });
  };

  onDescChanged = e => {
    this.setState({ cardDesc: e.target.value });
  };

  onDescUndo = () => {
    this.setState({
      cardDesc:
        localStorage.getItem(
          this.props.colName +
            " " +
            this.props.cardName +
            " " +
            this.props.index +
            " desc"
        ) || "Добавьте описание"
    });
  };

  render() {
    return (
      <Container className={classes.Column}>
        <Col>
          <Row>
            <Caption
              captionName={this.props.colName}
              changeInputName={value => this.props.changeColumnName(value)}
            />
          </Row>
          <Row>
            <Container>
              <CardsList
                colName={this.props.colName}
                cards={this.props.cards}
                cardsCount={this.state.cardsCount}
                username={this.state.username}
                changeCardName={(value, cardId) =>
                  this.props.changeCardName(value, cardId)
                }
                onCardAdded={value => this.props.onCardAdded(value)}
                onCardDelete={cardId => this.props.onCardDelete(cardId)}
                cardDesc={this.state.cardDesc}
                onDescSaved={this.onDescSaved}
                onDescUndo={this.onDescUndo}
                textAreaChange={e => this.onDescChanged(e)}
              />
            </Container>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default Column;
