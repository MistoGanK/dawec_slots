import React from "react";
import { useLocation } from "react-router-dom";

import '../assets/style/title.css'

export default function TitleGame() {
  // Change the title depending of with path he is
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/": {
        return "Welcome";
      }
      case "/slotMachine": {
        return "Slot Machine";
      }case "/games":{
        return "Game Selection";
      }case "/Cards":{
        return "Memory Game";
      }
      default: {
        return "default";
      }
    }
  };
  return <h1 className="title-page">{getTitle()}</h1>;
}
