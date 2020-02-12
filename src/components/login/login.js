import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Login extends Component {
  state = {
    username: ""
  };

  usernameChanged = e => {
    this.setState({ username: e.target.value });
  };

  onLogin = () => {
    if (this.state.username === "") alert("Введите имя пользователя");
    else this.props.onHide(this.state.username);
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
        <Modal.Body style={{ display: "flex", alignItems: "center" }}>
          <p style={{ margin: "0" }}>Имя пользователя: </p>
          <input
            placeholder="username"
            value={this.state.username}
            onChange={this.usernameChanged}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.onLogin}>Log-in</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Login;
