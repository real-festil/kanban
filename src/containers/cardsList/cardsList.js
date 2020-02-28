import React from "react";
import CardItem from "../../components/cards/cardItem/cardItem";
import AddCard from "../../components/cards/addCard/addCard";
import { addCard } from "../../reducers/cards";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getColumnCards } from "../../selectors/cards";
import PropTypes from "prop-types";

const cardsList = props => {
  const { colName, dispatch, colId, cards } = props;

  return (
    <>
      {cards.map((card, index) => {
        const { name, id, cardDesc } = card;

        return (
          <div key={id}>
            <CardItem
              index={id}
              cardId={id}
              comments={cards[index].commentsLength}
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
          dispatch(addCard({ id: uuidv4(), colId: colId, text: text }))
        }
      />
    </>
  );
};

cardsList.propTypes = {
  colName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  colId: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
  return {
    cards: getColumnCards(state, props.colId)
  };
}

export default connect(mapStateToProps)(cardsList);
