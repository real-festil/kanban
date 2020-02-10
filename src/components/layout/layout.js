import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./layout.module.css";
import ToDo from "../columns/ToDo/todo";

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
      </Row>
    </Container>
  );
};

export default layout;
