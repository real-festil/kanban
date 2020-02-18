import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./description.module.css";

class Description extends Component {
  state = {
    isDescFocused: false,
    description: this.props.cardDesc
  };

  onDescFocused = () => {
    this.setState({ isDescFocused: true });
  };

  onDescSaved = value => {
    this.setState({ isDescFocused: false });
    this.props.onDescSaved(value);
  };

  onDescUndo = () => {
    this.setState({ isDescFocused: false, description: this.props.cardDesc });
  };

  onDescChanged = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    const { isDescFocused, description } = this.state;

    return (
      <>
        <b>Описание</b>
        {isDescFocused ? (
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
          <p onClick={this.onDescFocused}>
            {description || "Введите описание"}
          </p>
        )}
      </>
    );
  }
}

export default Description;
