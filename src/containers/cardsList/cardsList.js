import React from "react";
import Card from "../../components/cards/card/card";
import AddCard from "../../components/cards/addCard/addCard";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const cardsList = props => {
  const {
    colName,
    addCard,
    colId,
    cards,
    changeCardName,
    // onCardAdded,
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
        const { name, id, cardDesc } = card;
        return (
          card.colId === colId && (
            <div key={index}>
              <Card
                index={id}
                cardId={id}
                cardNameValue={name}
                onCardDelete={() => onCardDelete(id)}
                cardName={name}
                colName={colName}
                changeCardName={value => changeCardName(value, id)}
                cardDesc={cardDesc}
                onDescSaved={value => onDescSaved(value, id)}
                onCommentSaved={value => onCommentSaved(value, id)}
                comments={comments.filter(comment => comment.cardId === id)}
                onCommentChange={onCommentChange}
                onCommentDelete={onCommentDelete}
                username={username}
              />
            </div>
          )
        );
      })}
      <AddCard
        cards={cards}
        colName={colName}
        onCardAdded={text => addCard(uuidv4(), colId, text)}
      />
    </>
  );
};

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

export default connect(mapStateToProps, actions)(cardsList);
