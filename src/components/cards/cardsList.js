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
        const { name, id, desc } = card;

        return (
          <div key={index}>
            <Card
              index={id}
              cardNameValue={name}
              onCardDelete={() => onCardDelete(id)}
              cardName={name}
              colName={colName}
              changeCardName={value => changeCardName(value, id)}
              cardDesc={desc}
              onDescSaved={value => onDescSaved(value, id)}
              onCommentSaved={value => onCommentSaved(value, id)}
              comments={comments.filter(comment => comment.cardId === id)}
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
