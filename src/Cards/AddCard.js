import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

function AddCard() {
  const [deck, setDeck] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const { deckId } = useParams();
  useEffect(() => {
    const deckAbort = new AbortController();

    async function loadDeck() {
      try {
        const getDecl = await readDeck(deckId, deckAbort.signal);
        setDeck(getDecl);
      } catch (error) {
        console.log(error);
      }

      return () => {
        deckAbort.abort();
      };
    }

    loadDeck();
  }, [deckId]);
  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(front, back)
    createCard(deckId, {
      front: front,
      back: back,
    });
    setFront("");
    setBack("");
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
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
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

export default AddCard;
