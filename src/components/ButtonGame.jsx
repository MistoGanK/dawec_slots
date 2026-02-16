import React, { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import casinoMusic from "../assets/music/casino-ambient.mp3";
import SlotMachine from "../pages/games/gameSlots/SlotMachine";

// Hacerlo con Props No con la función --- >
export default function ButtonGame() {
  // Constante objeto con metodos de location
  const location = useLocation();

  // Poner dentro según location
  const audioRef = useRef(null);

  function initializeAudio(fileAudio, loop, volume) {
    audioRef.current = new Audio(fileAudio);
    audioRef.current.loop = loop;
    audioRef.current.volume = volume;
  }

  const audio = () => {
    switch (location.pathname) {
      case "/gameSlots": {
        initializeAudio(casinoMusic, true, 0.5);
        break;
      }
      case "/gameCards": {
        initializeAudio(casinoMusic, true, 0.5);
        break;
      }
      default: {
        return;
      }
    }
    audioRef.current
      .play()
      .catch((err) => console.log("Audio blockeed: ", err));
  };

  function createButton(img_src, btn_text, navLinkButton, btn_id, index) {
    return (
      <NavLink key={index} to={navLinkButton}>
        <button id={btn_id} onClick={audio}>
          <p className="btn_p_slot">{btn_text}</p>
          <img src={img_src} />
        </button>
      </NavLink>
    );
  }

  // Object with the button parametres

  const buttonAttr = [
    {
      btn_navlink: "/gameSlots",
      btn_id: "btn_slot_machine",
      btn_text: "Try your luck",
      btn_img_src:
        "icons/casino-slot-machine-3d-rendering-isometric-icon-png-2997725973.png",
    },
    {
      btn_navlink: "/gameSlots",
      btn_id: "btn_slot_machine",
      btn_text: "Try your luck",
      btn_img_src:
        "icons/casino-slot-machine-3d-rendering-isometric-icon-png-2997725973.png",
    },
  ];

  return (
    <div className="buttons_container">
      {buttonAttr.map((button, index) => (
        createButton(
          button.btn_img_src,
          button.btn_text,
          button.btn_navlink,
          button.btn_id,
          index
        )
      ))}
    </div>
  );
}
