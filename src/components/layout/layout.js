import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./layout.module.css";
import Column from "../columns/column";
import Login from "../login/login";

class Layout extends Component {
  initialState = {
    columnsList: [
      { id: 0, name: "ToDo" },
      { id: 1, name: "InProgress" },
      { id: 2, name: "Testing" },
      { id: 3, name: "Done" }
    ],
    username: "",
    cards: [],
    comments: [],
    cardsCount: 1,
    isLoginShow: false
  };

  state = JSON.parse(localStorage.getItem("state")) || this.initialState;

  componentDidMount() {
    if (
      localStorage.getItem("username") === "" ||
      !localStorage.getItem("username")
    ) {
      this.setState({ isLoginShow: true });
    }
  }

  changeColumnName = (value, id) => {
    this.setState(
      prevState => ({
        columnsList: prevState.columnsList.map(column =>
          column.id === id ? { ...column, name: value } : column
        )
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  onCardAdded = (value, id) => {
    const { cards, cardsCount } = this.state;
    if (value === "") {
      alert("Введите заголовок");
    } else {
      this.setState(
        {
          cards: [
            ...cards,
            {
              id: cardsCount,
              colId: id,
              name: value,
              comments: 0,
              cardDesc: ""
            }
          ],
          cardsCount: cardsCount + 1
        },
        () => localStorage.setItem("state", JSON.stringify(this.state))
      );
    }
  };

  onCardDelete = cardId => {
    this.setState(
      prevState => ({
        cards: prevState.cards.filter(card => card.id !== cardId)
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  changeCardName = (value, cardId) => {
    this.setState(
      prevState => ({
        cards: prevState.cards.map(card =>
          card.id === cardId ? { ...card, name: value } : card
        )
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  onDescSaved = (value, cardId) => {
    this.setState(
      prevState => ({
        cards: prevState.cards.map(card =>
          card.id === cardId ? { ...card, cardDesc: value } : card
        )
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  onDescUndo = cardId => {
    this.setState(
      prevState => ({
        cards: prevState.cards.map(card =>
          card.id === cardId ? { ...card, cardDesc: this.state.cardDesc } : card
        )
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  onCommentSaved = (value, cardId) => {
    const { comments, cardsCount } = this.state;
    if (value === "") {
      alert("Введите заголовок");
    } else {
      this.setState(
        {
          comments: [
            ...comments,
            {
              cardId: cardId,
              value: value
            }
          ]
        },
        () => localStorage.setItem("state", JSON.stringify(this.state))
      );
    }
  };

  filterComments = cardId => {
    const filteredComments = this.state.comments.filter(
      comment => cardId === comment.cardId
    );
    console.log(filteredComments);
  };

  onHide = username => {
    this.setState({ username: username, isLoginShow: false });
    setTimeout(() => localStorage.setItem("username", this.state.username), 0);
  };

  render() {
    const { columnsList } = this.state;
    return (
      <>
        <Container className={classes.Layout}>
          <Row className={classes.Header}>
            <Col md={12}>
              <h1 className="text-center">Trello</h1>
            </Col>
          </Row>
          <Row>
            {columnsList.map(column => {
              const cards = this.state.cards.filter(
                card => card.colId === column.id
              );
              return (
                <Col xs={6} sm={3} md={3} key={column.id}>
                  <Column
                    colName={column.name}
                    onCardAdded={value => this.onCardAdded(value, column.id)}
                    onCardDelete={cardId => this.onCardDelete(cardId)}
                    changeCardName={(value, cardId) =>
                      this.changeCardName(value, cardId)
                    }
                    changeColumnName={value =>
                      this.changeColumnName(value, column.id)
                    }
                    cards={cards}
                    onDescSaved={(value, cardId) =>
                      this.onDescSaved(value, cardId)
                    }
                    onDescUndo={cardId => this.onDescUndo(cardId)}
                    onCommentSaved={(value, cardId) =>
                      this.onCommentSaved(value, cardId)
                    }
                    comments={cardId => this.filterComments(cardId)}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
        <Login show={this.state.isLoginShow} onHide={this.onHide} />
      </>
    );
  }
}

export default Layout;
