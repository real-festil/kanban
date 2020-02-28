import React, { Component } from "react";
import classes from "./caption.module.css";
import PropTypes from "prop-types";

class Caption extends Component {
  state = {
    labelValue: this.props.captionName,
    isLabelShowed: false
  };

  onInputBlurred = () => {
    const { labelValue } = this.state;
    const { captionName, changeInputName } = this.props;

    this.setState({ isLabelShowed: false });
    if (!labelValue.trim()) {
      this.setState({ labelValue: captionName });
      return;
    }

    changeInputName(labelValue);
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

Caption.propTypes = {
  captionName: PropTypes.string.isRequired,
  changeInputName: PropTypes.func.isRequired
};

export default Caption;
