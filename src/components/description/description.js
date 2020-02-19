import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./description.module.css";

class Description extends Component {
  state = {
    isOpened: false,
    description: this.props.cardDesc
  };

  onDescOpened = () => {
    this.setState({ isOpened: true });
  };

  onDescSaved = value => {
    this.setState({ isOpened: false });
    this.props.onDescSaved(value);
  };

  onDescUndo = () => {
    this.setState({ isOpened: false, description: this.props.cardDesc });
  };

  onDescChanged = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    const { isOpened, description } = this.state;

    return (
      <>
        <b>Описание</b>
        {isOpened ? (
          <div>
            <textarea
              autoFocus
              onChange={e => this.onDescChanged(e)}
              value={description}
              className={classes.DescriptionTextArea}
            />
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => this.onDescSaved(description)}
            >
              Сохранить
            </Button>
            <Button className="btn btn-secondary" onClick={this.onDescUndo}>
              Отменить
            </Button>
          </div>
        ) : (
          <p onClick={this.onDescOpened}>{description || "Введите описание"}</p>
        )}
      </>
    );
  }
}

export default Description;
