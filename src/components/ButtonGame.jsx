import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import casinoMusic from "../assets/music/casino-ambient.mp3";
import SlotMachine from "../pages/games/gameSlots/SlotMachine";

// Hacerlo con Props No con la función --- >
export default function ButtonGame() {
  // Constante objeto con metodos de location

  // Poner dentro según location
  const audioRef = useRef(null);

  function initializeAudio(fileAudio, loop, volume) {
    audioRef.current = new Audio(fileAudio);
    audioRef.current.loop = loop;
    audioRef.current.volume = volume;
  }

  const playAudio = (audioFile) => {
    initializeAudio(audioFile, true, 0.5);
    audioRef.current.play().catch((err) => console.log("Audio blocked: ", err));
  };

  // Object with the button parametres

  const buttonAttr = [
    {
      btn_navlink: "/games/gameSlots",
      btn_class: "btn_slot_machine",
      btn_text: "Try your luck",
      btn_img_src:
        "icons/casino-slot-machine-3d-rendering-isometric-icon-png-2997725973.png",
      btn_audio: casinoMusic,
    },
    {
      btn_navlink: "/games/gamesCards",
      btn_class: "btn_slot_machine",
      btn_text: "Test Your Memory",
      btn_img_src:
        "icons/3d-rendering-of-game-icon-illustration-card-game-png-155481501.png",
      btn_audio: casinoMusic,
    },
  ];

  return (
    <div className="buttons_container">
      {buttonAttr.map((button, index) => (
        <NavLink key={index} to={button.btn_navlink}>
          <button
            className={button.btn_class}
            onClick={() => playAudio(button.btn_audio)}
          >
            <p className='btn_p_slot'>{button.btn_text}</p>
            <img src={button.btn_img_src} alt={button.btn_text} />
          </button>
        </NavLink>
      ))}
    </div>
  );
}
