import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import casinoMusic from "../assets/music/casino-ambient.mp3";

export default function ButtonGame() {
  // Constante objeto con metodos de location
  const location = useLocation();

  // Poner dentro según location
  const audioRef = useRef(null);

  const audio = () => {
    switch (location.pathname) {
    }
  };

  const StartMusic = () => {};

  const getTitle = () => {
    switch (location.pathname) {
      case "/": {
        return "Welcome";
      }
      case "/slotMachine": {
        return "Slot Machine";
      }
      case "/games": {
        return "Game Selection";
      }
      case "/Cards": {
        return "Memory Game";
      }
      default: {
        return "default";
      }
    }
  };
  return <div>ButtonGame</div>;
}
