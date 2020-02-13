import React, { Component } from "react";
import Card from "./card/card";
import AddCard from "./cardControl/addCard/addCard";

class CardsList extends Component {
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
              onDelete={() => this.onDelete(card.name)}
              cardName={card.name}
              comments={card.comments}
              colName={colName}
              changeCardName={value =>
                this.props.changeCardName(value, card.index)
              }
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
