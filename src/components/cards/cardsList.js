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
            onCommentSaved={value => onCommentSaved(value, card.id)}
            comments={comments.filter(comment => comment.cardId === card.id)}
            onCommentChange={onCommentChange}
            onCommentDelete={onCommentDelete}
            username={username}
          />
        </div>
      ))}
      <AddCard cards={cards} colName={colName} onCardAdded={onCardAdded} />
    </>
  );
};

export default cardsList;
