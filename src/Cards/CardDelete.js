import React from "react";
import { deleteCard } from "../utils/api/index";

function CardDelete({ cardId, deckId }) {
  function handleCardDelete() {
    const deletePromt = window.confirm(
      "Delete this Card? You will not be able to recover it."
    );

    if (deletePromt) {
      deleteCard(cardId).then(window.location.reload());
    }
  }
  return (
    <button className="btn btn-danger float-right" onClick={handleCardDelete}>
      Delete
    </button>
  );
}

export default CardDelete;
