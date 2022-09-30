import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [thisCard, setThisCard] = useState({});
  const { deckId } = useParams();
  const { cardId } = useParams();

  useEffect(() => {
    const deckAbort = new AbortController();

    async function loadDeck() {
      try {
        const response = await readDeck(deckId, deckAbort.signal);
        setDeck(response);
      } catch (error) {
        console.log(error);
      }
      return () => {
        deckAbort.abort();
      };
    }

    loadDeck();
  }, [deckId]);

  useEffect(() => {
    const cardAbort = new AbortController();

    async function findCard() {
      try {
        const getCard = await readCard(cardId, cardAbort.signal);
        setThisCard(getCard);
        setFront(getCard.front);
        setBack(getCard.back);
      } catch (error) {
        console.log(error);
      }
      return () => {
        cardAbort.abort();
      };
    }

    findCard();
  }, [cardId]);

  //when the form is saved, the card will be added to the deck and the user will be able to add new cards
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(front, back)
    updateCard({
      ...thisCard,
      front: front,
      back: back,
    }).then((updatedCard) => history.push(`/decks/${deck.id}`));
  };
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
            Edit Card {thisCard.id}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>
      <div className="card-info">
        <CardForm
          front={front}
          back={back}
          deck={deck}
          setFront={setFront}
          setBack={setBack}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default EditCard;
