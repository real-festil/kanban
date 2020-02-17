import React, { Component } from "react";
import classes from "./caption.module.css";

class Caption extends Component {
  state = {
    labelValue: this.labelValue || this.props.captionName,
    isLabelFocused: false
  };

  inputFocusHandler = () => {
    this.setState({ isLabelFocused: true });
  };

  inputChangeHandler = e => {
    this.setState({ labelValue: e.target.value });
  };

  inputBlurHandler = () => {
    let { labelValue } = this.state;
    let { captionName } = this.props;
    this.setState({ isLabelFocused: false });
    if (!labelValue) this.setState({ labelValue: captionName });
    this.props.changeInputName(labelValue ? labelValue : captionName);
  };

  inputKeyHandler = e => {
    if (e.key === "Enter" || e.key === "Escape") {
      this.setState({ isLabelFocused: false });
      this.inputBlurHandler();
    }
  };

  render() {
    let { isLabelFocused, labelValue } = this.state;
    return (
      <div className={classes.Caption}>
        {!isLabelFocused ? (
          <h5 md={4} onClick={this.inputFocusHandler}>
            {labelValue}
          </h5>
        ) : null}
        {isLabelFocused ? (
          <input
            autoFocus
            onChange={this.inputChangeHandler}
            onBlur={this.inputBlurHandler}
            onKeyUp={this.inputKeyHandler}
            value={labelValue}
          />
        ) : null}
      </div>
    );
  }
}

export default Caption;
