import React from "react";
import Card from "../../components/cards/card/card";
import AddCard from "../../components/cards/addCard/addCard";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getColumnCards } from "../../selectors";
import PropTypes from "prop-types";

const cardsList = props => {
  const { colName, addCard, colId, cards } = props;

  return (
    <>
      {cards.map((card, index) => {
        const { name, id, cardDesc } = card;
        return (
          <div key={index}>
            <Card
              index={id}
              cardId={id}
              cardNameValue={name}
              cardName={name}
              colName={colName}
              cardDesc={cardDesc}
            />
          </div>
        );
      })}
      <AddCard
        colName={colName}
        onCardAdded={text =>
          addCard({ id: uuidv4(), colId: colId, text: text })
        }
      />
    </>
  );
};

cardsList.propTypes = {
  colName: PropTypes.string.isRequired,
  addCard: PropTypes.func.isRequired,
  colId: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
  return {
    cards: getColumnCards(state, props.colId)
  };
}

export default connect(mapStateToProps, actions)(cardsList);
