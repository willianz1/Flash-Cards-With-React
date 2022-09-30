import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import DeckDelete from "./DeckDelete";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const deckAbort = new AbortController();

    async function getDeck() {
      try {
        const response = await listDecks(deckAbort.signal);
        setDecks(response);
      } catch (error) {
        console.log(error);
      }
      return () => {
        deckAbort.abort();
      };
    }

    getDeck();
  }, []);

  return decks.map((deck) => {
    return (
      <div className="p-2" key={deck.id}>
        <div>
          <h3>
            {deck.name}
            <p className="float-right">{deck.cards.length} cards</p>
          </h3>
        </div>
        <div>
          <p>{deck.description}</p>
        </div>
        <div>
          <button
            className="btn btn-secondary mx-1"
            onClick={() => history.push(`/decks/${deck.id}`)}
          >
            View
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => history.push(`/decks/${deck.id}/study`)}
          >
            
            Study
          </button>
          <DeckDelete deckId={deck.id} />
        </div>
      </div>
    );
  });

}

export default DeckList;
