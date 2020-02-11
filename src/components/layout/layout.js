import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./layout.module.css";
import ToDo from "../columns/ToDo/todo";
import InProgress from "../columns/inProgress/inProgress";
import Testing from "../columns/testing/testing";
import Done from "../columns/done/done";

const layout = props => {
  return (
    <Container className={classes.Layout}>
      <Row className={classes.Header}>
        <Col md={12}>
          <h1 className="text-center">Trello</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={3} sm={3} md={3}>
          <ToDo />
        </Col>
        <Col xs={3} sm={3} md={3}>
          <InProgress />
        </Col>
        <Col xs={3} sm={3} md={3}>
          <Testing />
        </Col>
        <Col xs={3} sm={3} md={3}>
          <Done />
        </Col>
      </Row>
    </Container>
  );
};

export default layout;
