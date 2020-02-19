import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./description.module.css";

class Description extends Component {
  state = {
    isOpened: false,
    description: this.props.cardDesc
  };

  onDescSaved = value => {
    this.setState({ isOpened: false });
    this.props.onDescSaved(value);
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
              onChange={e => this.setState({ description: e.target.value })}
              value={description}
              className={classes.DescriptionTextArea}
            />
            <Button
              className={classes.SaveButton}
              onClick={() => this.onDescSaved(description)}
            >
              Сохранить
            </Button>
            <Button
              className="btn btn-secondary"
              onClick={() =>
                this.setState({
                  isOpened: false,
                  description: this.props.cardDesc
                })
              }
            >
              Отменить
            </Button>
          </div>
        ) : (
          <p onClick={() => this.setState({ isOpened: true })}>
            {description || "Введите описание"}
          </p>
        )}
      </>
    );
  }
}

export default Description;
