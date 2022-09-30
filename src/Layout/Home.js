import React from "react";
import DeckList from "../Deck/DeckList";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  return (
    <div>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => history.push("/decks/new")}
      >
        + Create Deck
      </button>

      <DeckList />
    </div>
  );
}

export default Home;
