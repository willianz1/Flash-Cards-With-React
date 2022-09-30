import React, { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useParams } from "react-router-dom";
import CardList from "../Cards/CardList";
import { Link } from "react-router-dom";

function Study() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [cardCount, setCardCount] = useState(0);
  const { deckId } = useParams();

  //loading the selected deck
  useEffect(() => {
    const deckAbort = new AbortController();
    async function showCard() {
      try {
        const response = await readDeck(deckId, deckAbort.signal);
        setDeck(response);
        setCardCount(response.cards.length);
        setCards(response.cards);
      } catch (error) {
        console.log("error creating card list");
      }
      return () => {
        deckAbort.abort();
      };
    }

    showCard();
  }, [deckId]);

  // console.log(deck);
  // console.log(cardCount);
  // console.log(deck.cards);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mx-1"></span>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Study</h3>
      <div>
        {" "}
        <CardList deck={deck} cardCount={cardCount} cards={cards} />{" "}
      </div>
    </div>
  );
}

export default Study;
