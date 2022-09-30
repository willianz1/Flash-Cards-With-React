import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import DeckDelete from "./DeckDelete";
import CardDelete from "../Cards/CardDelete";

function Deck() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    const deckAbort = new AbortController();

    async function getDeck() {
      try {
        const decks = await readDeck(deckId, deckAbort.signal);
        setDeck(decks);
        setCards(decks.cards);
      } catch (error) {
        console.log("error creating deck list");
      }
      return () => {
        deckAbort.abort();
      };
    }

    getDeck();
  }, [deckId]);

  let showCards;
  if (cards) {
    showCards = cards.map((card) => {
      return (
        <div className=" m-1" key={card.id}>
          <div className="m-1">
            <p className="font-weight-bold">Front</p>
            <p>{card.front}</p>
          </div>

          <div className="m-1">
            <p className="font-weight-bold">Back</p>
            <p>{card.back}</p>
          </div>
          <div>
            <button
              className="btn btn-secondary m-1"
              onClick={() =>
                history.push(`/decks/${deck.id}/cards/${card.id}/edit`)
              }
            >
              <span className="oi oi-pencil ml-1 float-right"></span>
              Edit
            </button>
            <CardDelete cardId={card.id} deckId={deck.id} />
          </div>
        </div>
      );
    });
  } else {
    showCards = "Loading";
  }

  return (
    <div className="deck">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home mx-1"></span>
              Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="header">
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
      </div>
      <div className="buttons ">
        <button
          className="btn btn-secondary mx-1"
          onClick={() => history.push(`/decks/${deck.id}/edit`)}
        >
          Edit
        </button>

        <button
          className="btn btn-primary mx-1"
          onClick={() => history.push(`/decks/${deck.id}/study`)}
        >
          Study
        </button>

        <button
          className="btn btn-primary mx-1"
          onClick={() => history.push(`/decks/${deck.id}/cards/new`)}
        >
          + Add Cards
        </button>

        <DeckDelete deckId={deck.id} />
      </div>
      <h3 className="my-2">Cards</h3>
      <div>{showCards}</div>
    </div>
  );
}

export default Deck;
