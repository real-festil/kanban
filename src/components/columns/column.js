import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./column.module.css";
import CardsList from "../cards/cardsList";
import Caption from "../caption/caption";

const column = props => {
  const {
    colName,
    cards,
    changeCardName,
    changeColumnName,
    onCardAdded,
    onCardDelete,
    onDescSaved,
    onCommentSaved,
    comments,
    onCommentChange,
    onCommentDelete,
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
              cards={cards}
              changeCardName={changeCardName}
              onCardAdded={onCardAdded}
              onCardDelete={onCardDelete}
              onDescSaved={onDescSaved}
              onCommentSaved={onCommentSaved}
              comments={comments}
              onCommentChange={onCommentChange}
              onCommentDelete={onCommentDelete}
              username={username}
            />
          </Container>
        </Row>
      </Col>
    </Container>
  );
};

export default column;
