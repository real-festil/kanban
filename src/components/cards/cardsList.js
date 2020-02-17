import React, { Component } from "react";
import Card from "./card/card";
import AddCard from "./cardControl/addCard/addCard";

class CardsList extends Component {
  commentsFilter = (comments, cardId) => {
    console.log(comments, cardId);
    this.props.comments(comments);
  };

  render() {
    let { cards, username, colName } = this.props;
    return (
      <>
        {cards.map((card, index) => (
          <div key={index}>
            <Card
              index={card.index}
              saveInStorage={value => this.saveInStorage(value, card.index)}
              username={username}
              cardNameValue={card.name}
              onCardDelete={() => this.props.onCardDelete(card.id)}
              cardName={card.name}
              colName={colName}
              changeCardName={value =>
                this.props.changeCardName(value, card.id)
              }
              cardDesc={card.cardDesc}
              onDescSaved={value => this.props.onDescSaved(value, card.id)}
              onDescUndo={() => this.props.onDescUndo(card.id)}
              textAreaChange={e => this.props.textAreaChange(e)}
              onCommentSaved={value =>
                this.props.onCommentSaved(value, card.id)
              }
              comments={() => this.props.comments(card.id)}
            />
          </div>
        ))}
        <AddCard
          cards={cards}
          colName={colName}
          onCardAdded={value => this.props.onCardAdded(value)}
        />
      </>
    );
  }
}

export default CardsList;
