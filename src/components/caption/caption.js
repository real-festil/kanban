import React, { Component } from "react";
import classes from "./caption.module.css";

class Caption extends Component {
  state = {
    labelValue: this.props.captionName,
    isLabelShowed: false
  };

  onInputBlurred = () => {
    const { labelValue } = this.state;
    const { captionName } = this.props;

    this.setState({ isLabelShowed: false });
    if (!labelValue) this.setState({ labelValue: captionName });

    this.props.changeInputName(labelValue ? labelValue : captionName);
  };

  inputKeyHandler = e => {
    if (e.key === "Enter" || e.key === "Escape") {
      this.setState({ isLabelShowed: false });
      this.onInputBlurred();
    }
  };

  render() {
    const { isLabelShowed, labelValue } = this.state;

    return (
      <div className={classes.Caption}>
        {isLabelShowed ? (
          <input
            autoFocus
            onChange={e => this.setState({ labelValue: e.target.value })}
            onBlur={this.onInputBlurred}
            onKeyUp={this.inputKeyHandler}
            value={labelValue}
          />
        ) : (
          <h5 md={4} onClick={() => this.setState({ isLabelShowed: true })}>
            {labelValue}
          </h5>
        )}
      </div>
    );
  }
}

export default Caption;
