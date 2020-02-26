import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import classes from "./login.module.css";
import PropTypes from "prop-types";

class Login extends Component {
  state = {
    username: ""
  };

  usernameChanged = e => {
    this.setState({ username: e.target.value });
  };

  onLogin = () => {
    const { username } = this.state;

    if (!username) alert("Введите имя пользователя");
    else this.props.onHide(username);
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Вход</Modal.Title>
        </Modal.Header>
        <Modal.Body className={classes.ModalBody}>
          <p>Имя пользователя: </p>
          <input
            placeholder="username"
            value={this.state.username}
            onChange={this.usernameChanged}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onLogin}>Войти</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Login.propTypes = {
  onHide: PropTypes.func.isRequired
};

export default Login;
