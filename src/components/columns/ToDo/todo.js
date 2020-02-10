import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./todo.module.css";

let headingInput = React.createRef();
let cardInput = React.createRef();

class Todo extends Component {
  state = {
    colName: "ToDo",
    cardName: "",
    headingInputFocused: false,
    cardInputFocused: false,
    cards: []
  };

  inputChangeHandler = (e, ref) => {
    switch (ref) {
      case headingInput:
        this.setState({ colName: e.target.value });
        break;
      case cardInput:
        this.setState({ cardName: e.target.value });
        break;
      default:
        break;
    }
  };

  inputKeyHandler = e => {
    if (e.key === "Enter" || e.key === "Escape") {
      headingInput.current.blur();
    }
  };

  inputBlurHandler = ref => {
    switch (ref) {
      case headingInput:
        if (this.state.colName === "") this.setState({ colName: "ToDo" });
        this.setState({ headingInputFocused: false });
        break;
      default:
        break;
    }
  };

  inputFocusHandler = ref => {
    ref.current.focus();
    switch (ref) {
      case headingInput:
        this.setState({ headingInputFocused: true });
        break;
      case cardInput:
        this.setState({ cardInputFocused: true });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Container className={classes.ToDo}>
        <Col>
          <Row>
            <h5
              md={4}
              onClick={() => this.inputFocusHandler(headingInput)}
              style={{
                display: this.state.headingInputFocused ? "none" : "block",
                width: "100%",
                marginTop: "2px",
                overflowWrap: "break-word"
              }}
            >
              {this.state.colName}
            </h5>
            <div>
              <input
                onChange={e => this.inputChangeHandler(e, headingInput)}
                onBlur={() => this.inputBlurHandler(headingInput)}
                onKeyPress={this.inputKeyHandler}
                value={this.state.colName}
                ref={headingInput}
                style={{
                  position: this.state.headingInputFocused
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
                  zIndex: this.state.headingInputFocused ? "1" : "-1"
                }}
              />
              <button type="button" class="btn btn-success">
                Success
              </button>
            </div>
          </Row>
          <Row>
            <Container className={classes.Card}></Container>
          </Row>
          <Row>
            <button
              type="button"
              onClick={() => this.inputFocusHandler(cardInput)}
              class="btn btn-outline-primary"
              style={{
                display: this.state.cardInputFocused ? "none" : "block"
              }}
            >
              Добавить карточку
            </button>
            <input
              onChange={e => this.inputChangeHandler(e, cardInput)}
              onBlur={() => this.inputBlurHandler(cardInput)}
              onKeyPress={this.inputKeyHandler}
              placeholder="Введите заголовок"
              ref={cardInput}
              style={{
                position: this.state.cardInputFocused ? "static" : "absolute",
                top: "-3%",
                marginLeft: "-1px",
                width: "90%",
                border: "1px solid #0079bf",
                fontSize: "16px",
                padding: "1px 0",
                marginBottom: "6px",
                lineHeight: "1.2",
                zIndex: this.state.cardInputFocused ? "1" : "-1"
              }}
            />
          </Row>
        </Col>
      </Container>
    );
  }
}

export default Todo;
