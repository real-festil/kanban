import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./column.module.css";
import CardsList from "../cards/cardsList";
import Caption from "../caption/caption";

class Column extends Component {
  state = {
    username: localStorage.getItem("username"),
    colName: localStorage.getItem(this.props.colName) || this.props.colName,
    cards:
      JSON.parse(localStorage.getItem(this.props.colName + " Cards")) || [],
    cardsCount: JSON.parse(localStorage.getItem(this.props.colName + " count")),
    cardDesc:
      localStorage.getItem(
        this.props.colName +
          " " +
          this.props.cardName +
          " " +
          this.props.index +
          " desc"
      ) || "Добавьте описание"
  };

  changeColumnName = value => {
    this.setState({ colName: value }, () =>
      localStorage.setItem(this.props.colName, this.state.colName)
    );
  };

  changeCardName = (value, cardIndex) => {
    const { cards } = this.state;
    const index = cards.findIndex(obj => obj.index === cardIndex);
    let updatedCards = cards;
    updatedCards[index].name = value;
    this.setState({
      cards: cards.map(card => {
        if (card.index === cardIndex) return { ...card, name: value };
        return card;
      })
    });
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

  onCardAdded = value => {
    let { cards, cardsCount } = this.state;
    let { colName } = this.props;
    if (value === "") {
      alert("Введите заголовок");
    } else {
      this.setState(
        {
          cards: [...cards, { index: cardsCount, name: value, comments: 0 }],
          cardName: "",
          isCardInputFocused: false,
          cardsCount: cardsCount + 1
        },
        () => {
          console.log(this.state.cards);
          localStorage.setItem(
            colName + " Cards",
            JSON.stringify(this.state.cards)
          );
          localStorage.setItem(colName + " count", this.state.cardsCount);
        }
      );
    }
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
              changeInputName={value => this.changeColumnName(value)}
            />
          </Row>
          <Row>
            <Container>
              <CardsList
                colName={this.props.colName}
                cards={this.state.cards}
                cardsCount={this.state.cardsCount}
                username={this.state.username}
                changeCardName={(value, cardIndex) =>
                  this.changeCardName(value, cardIndex)
                }
                onCardAdded={value => this.onCardAdded(value)}
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
