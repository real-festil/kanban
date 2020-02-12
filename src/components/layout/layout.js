import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./layout.module.css";
import ToDo from "../columns/ToDo/todo";
import InProgress from "../columns/inProgress/inProgress";
import Testing from "../columns/testing/testing";
import Done from "../columns/done/done";
import Login from "../login/login";

class Layout extends Component {
  state = {
    username: "",
    isLoginShow: false
  };

  componentDidMount() {
    if (
      localStorage.getItem("username") === "" ||
      !localStorage.getItem("username")
    ) {
      this.setState({ isLoginShow: true });
    }
  }

  onHide = username => {
    this.setState({ username: username, isLoginShow: false });
    setTimeout(() => localStorage.setItem("username", this.state.username), 0);
  };

  render() {
    return (
      <>
        <Container className={classes.Layout}>
          <Row className={classes.Header}>
            <Col md={12}>
              <h1 className="text-center">Trello</h1>
            </Col>
          </Row>
          <Row>
            <Col xs={6} sm={3} md={3}>
              <ToDo />
            </Col>
            <Col xs={6} sm={3} md={3}>
              <InProgress />
            </Col>
            <Col xs={6} sm={3} md={3}>
              <Testing />
            </Col>
            <Col xs={6} sm={3} md={3}>
              <Done />
            </Col>
          </Row>
        </Container>
        <Login show={this.state.isLoginShow} onHide={this.onHide} />
      </>
    );
  }
}

export default Layout;
