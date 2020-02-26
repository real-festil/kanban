import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./column.module.css";
import CardsList from "../../containers/cardsList/cardsList";
import Caption from "../caption/caption";

const column = props => {
  const {
    colName,
    colId,
    cards,
    changeCardName,
    changeColumnName,
    comments,
    username
  } = props;

  return (
    <Container className={classes.Column}>
      <Col>
        <Row>
          <Caption captionName={colName} changeInputName={changeColumnName} />
        </Row>
        <Row>
          <Container>
            <CardsList
              colName={colName}
              colId={colId}
              cards={cards}
              changeCardName={changeCardName}
              comments={comments}
              username={username}
            />
          </Container>
        </Row>
      </Col>
    </Container>
  );
};

export default column;
