import React from "react";
import Card from "./card/card";
import AddCard from "./cardControl/addCard/addCard";

const cardsList = props => {
  const {
    colName,
    cards,
    changeCardName,
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
    <>
      {cards.map((card, index) => {
        const { cardName, cardId, cardDesc } = card;

        return (
          <div key={index}>
            <Card
              index={cardId}
              cardNameValue={cardName}
              onCardDelete={() => onCardDelete(cardId)}
              cardName={cardName}
              colName={colName}
              changeCardName={value => changeCardName(value, cardId)}
              cardDesc={cardDesc}
              onDescSaved={value => onDescSaved(value, cardId)}
              onCommentSaved={value => onCommentSaved(value, cardId)}
              comments={comments.filter(comment => comment.cardId === cardId)}
              onCommentChange={onCommentChange}
              onCommentDelete={onCommentDelete}
              username={username}
            />
          </div>
        );
      })}
      <AddCard cards={cards} colName={colName} onCardAdded={onCardAdded} />
    </>
  );
};

export default cardsList;
