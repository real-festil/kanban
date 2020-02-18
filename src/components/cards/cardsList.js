import React from "react";
import Card from "./card/card";
import AddCard from "./cardControl/addCard/addCard";

const cardsList = props => {
  let {
    colName,
    cards,
    changeCardName,
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
    <>
      {cards.map((card, index) => (
        <div key={index}>
          <Card
            index={card.index}
            cardNameValue={card.name}
            onCardDelete={() => onCardDelete(card.id)}
            cardName={card.name}
            colName={colName}
            changeCardName={value => changeCardName(value, card.id)}
            cardDesc={card.cardDesc}
            onDescSaved={value => onDescSaved(value, card.id)}
            onDescUndo={() => onDescUndo(card.id)}
            onCommentSaved={value => onCommentSaved(value, card.id)}
            comments={comments.filter(comment => comment.cardId === card.id)}
            onCommentChange={(newValue, id) => onCommentChange(newValue, id)}
            onCommentDelete={id => onCommentDelete(id)}
            username={username}
          />
        </div>
      ))}
      <AddCard
        cards={cards}
        colName={colName}
        onCardAdded={value => onCardAdded(value)}
      />
    </>
  );
};

export default cardsList;
