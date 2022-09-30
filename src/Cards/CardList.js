import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function CardList({ deck, cardCount, cards }) {
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(true);
  const history = useHistory();

  if (cardCount < 3) {
    return (
      <div>
        <h4> Not Enough Cards</h4>
        <p>
          You need at least 3 cards to study. There are {cardCount} cards in
          this deck
        </p>
        <button
          className="btn btn-primary"
          onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
        >
          <span className="oi oi-plus mr-1"></span>
          Add Cards
        </button>
      </div>
    );
  }

  function flipCard() {
    setFlip(!flip);
  }
  function nextClick() {
    if (index < cardCount - 1) {
      setIndex(index + 1);
      setFlip(true);
    } else {
      const restartPrompt = window.confirm(
        "Restart? Click 'Cancel' to return to the home page."
      );
      if (restartPrompt) {
        setIndex(0);
        setFlip(true);
      } else history.push("/");
    }
  }

  return (
    <div className="card-body border rounded p-2 my-2">
      <div className="card-title">
        <h4>
          Card {index + 1} of {cardCount}
        </h4>
        <p>{flip ? cards[index]?.front : cards[index]?.back}</p>
      </div>
      <div className="buttons">
        <button className="btn btn-secondary mx-1" onClick={flipCard}>
          Flip
        </button>
        {!flip && (
          <button className="btn btn-primary" onClick={nextClick}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default CardList;
