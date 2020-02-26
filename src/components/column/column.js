import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./column.module.css";
import CardsList from "../../containers/cardsList/cardsList";
import Caption from "../caption/caption";
import PropTypes from "prop-types";

const column = props => {
  const { colName, colId, changeColumnName } = props;

  return (
    <Container className={classes.Column}>
      <Col>
        <Row>
          <Caption captionName={colName} changeInputName={changeColumnName} />
        </Row>
        <Row>
          <Container>
            <CardsList colName={colName} colId={colId} />
          </Container>
        </Row>
      </Col>
    </Container>
  );
};

column.propTypes = {
  colName: PropTypes.string.isRequired,
  colId: PropTypes.number.isRequired,
  changeColumnName: PropTypes.func.isRequired
};

export default column;
