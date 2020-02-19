import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./layout.module.css";
import Column from "../column/column";
import Login from "../login/login";
import { v4 as uuidv4 } from "uuid";

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
    isLoginShow: false
  };

  state = JSON.parse(localStorage.getItem("state")) || this.initialState;

  componentDidMount() {
    if (!this.state.username)
      this.setState({ isLoginShow: true }, () =>
        localStorage.setItem("state", JSON.stringify(this.state))
      );
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
    const { cards } = this.state;

    if (value === "") {
      alert("Введите заголовок");
    } else {
      this.setState(
        {
          cards: [
            ...cards,
            {
              id: uuidv4(),
              colId: id,
              name: value,
              comments: 0,
              cardDesc: ""
            }
          ]
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

  changeCardData = (data, cardId) => {
    this.setState(
      prevState => ({
        cards: prevState.cards.map(card =>
          card.id === cardId ? { ...card, ...data } : card
        )
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
    console.log(this.state);
  };

  onCommentSaved = (value, cardId) => {
    const { comments, username } = this.state;

    this.setState(
      {
        comments: [
          ...comments,
          {
            id: uuidv4(),
            cardId: cardId,
            value: value,
            username: username
          }
        ]
      },
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  onCommentChange = (newValue, id) => {
    this.setState(
      prevState => ({
        comments: prevState.comments.map(comment =>
          comment.id === id
            ? { ...comment, value: newValue ? newValue : comment.value }
            : comment
        )
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  onCommentDelete = id => {
    this.setState(
      prevState => ({
        comments: prevState.comments.filter(comment => comment.id !== id)
      }),
      () => localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  onHide = username => {
    this.setState({ username: username, isLoginShow: false }, () =>
      localStorage.setItem("state", JSON.stringify(this.state))
    );
  };

  render() {
    const { columnsList, isLoginShow } = this.state;

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
              const { cards, comments, username } = this.state;
              const filteredCards = cards.filter(
                card => card.colId === column.id
              );

              return (
                <Col xs={6} sm={3} md={3} key={column.id}>
                  <Column
                    colName={column.name}
                    onCardAdded={value => this.onCardAdded(value, column.id)}
                    onCardDelete={this.onCardDelete}
                    changeCardName={(value, cardId) =>
                      this.changeCardData({ name: value }, cardId)
                    }
                    changeColumnName={value =>
                      this.changeColumnName(value, column.id)
                    }
                    cards={filteredCards}
                    onDescSaved={(value, cardId) =>
                      this.changeCardData({ cardDesc: value }, cardId)
                    }
                    onCommentSaved={this.onCommentSaved}
                    comments={comments}
                    onCommentChange={this.onCommentChange}
                    onCommentDelete={this.onCommentDelete}
                    username={username}
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
        <Login show={isLoginShow} onHide={this.onHide} />
      </>
    );
  }
}

export default Layout;
