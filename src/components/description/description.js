import React, { Component } from "react";
import { Button } from "react-bootstrap";
import classes from "./description.module.css";

class Description extends Component {
  state = {
    isDescFocused: false
  };

  onDescFocused = () => {
    this.setState({ isDescFocused: true });
  };

  onDescSaved = () => {
    this.setState({ isDescFocused: false });
    this.props.onDescSaved();
  };

  onDescUndo = () => {
    this.setState({ isDescFocused: false });
    this.props.onDescUndo();
  };

  render() {
    let { isDescFocused } = this.state;
    let { cardDesc, textAreaChange } = this.props;
    return (
      <>
        <b>Описание</b>
        {isDescFocused ? null : <p onClick={this.onDescFocused}>{cardDesc}</p>}
        {isDescFocused ? (
          <div>
            <textarea
              onChange={e => textAreaChange(e)}
              defaultValue={cardDesc}
              className={classes.DescriptionTextArea}
            />
            <Button style={{ marginRight: "20px" }} onClick={this.onDescSaved}>
              Сохранить
            </Button>
            <Button className="btn btn-secondary" onClick={this.onDescUndo}>
              Отменить
            </Button>
          </div>
        ) : null}
      </>
    );
  }
}

export default Description;
