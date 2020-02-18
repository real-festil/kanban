import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./column.module.css";
import CardsList from "../cards/cardsList";
import Caption from "../caption/caption";

const column = props => {
  let {
    colName,
    cards,
    changeCardName,
    changeColumnName,
    onCardAdded,
    onCardDelete,
    onDescSaved,
    onDescUndo,
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
          <Caption
            captionName={colName}
            changeInputName={value => changeColumnName(value)}
          />
        </Row>
        <Row>
          <Container>
            <CardsList
              colName={colName}
              cards={cards}
              changeCardName={(value, cardId) => changeCardName(value, cardId)}
              onCardAdded={value => onCardAdded(value)}
              onCardDelete={cardId => onCardDelete(cardId)}
              onDescSaved={(value, cardId) => onDescSaved(value, cardId)}
              onDescUndo={onDescUndo}
              onCommentSaved={(value, cardId) => onCommentSaved(value, cardId)}
              comments={comments}
              onCommentChange={(newValue, id) => onCommentChange(newValue, id)}
              onCommentDelete={id => onCommentDelete(id)}
              username={username}
            />
          </Container>
        </Row>
      </Col>
    </Container>
  );
};

export default column;
