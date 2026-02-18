import React from "react";
import { useLocation } from "react-router-dom";

import "../assets/style/title.css";

export default function TitleGame() {
  // Change the title depending of with path he is
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Welcome";
      case "/games":
        return "Game Selection";
      case "/games/gameSlots": // Ruta correcta para SlotMachine
        return "Slot Machine";
      case "/games/gamesCards": // Ruta correcta para CardsGame
        return "Memory Game";
      default:
        return "Default Title";
    }
  };
  
  return <h1 className="title-page">{getTitle()}</h1>;
}
