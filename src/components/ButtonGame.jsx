import React from "react";
import { NavLink } from "react-router-dom";
import casinoMusic from "../assets/music/casino-ambient.mp3";
import casinoMusic2 from "../assets/music/casino-ambient2.mp3";


const audioManager = {
  current: null
};

export default function ButtonGame() {
  
  const playAudio = (audioFile) => {
    // Si existe audio, se para
    if (audioManager.current) {
      audioManager.current.pause();
      audioManager.current.currentTime = 0;
    }

    audioManager.current = new Audio(audioFile);
    audioManager.current.loop = true;
    audioManager.current.volume = 0.2;
    audioManager.current.play().catch((err) => console.log("Audio blocked: ", err));
  };

  const buttonAttr = [
    {
      btn_navlink: "/games/gameSlots",
      btn_class: "btn_slot_machine",
      btn_text: "Try your luck",
      btn_img_src: "icons/casino-slot-machine-3d-rendering-isometric-icon-png-2997725973.png",
      btn_audio: casinoMusic,
    },
    {
      btn_navlink: "/games/gamesCards",
      btn_class: "btn_slot_machine",
      btn_text: "Test Your Memory",
      btn_img_src: "icons/3d-rendering-of-game-icon-illustration-card-game-png-155481501.png",
      btn_audio: casinoMusic2,
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

export const stopGlobalAudio = () => {
  if (audioManager.current) {
    audioManager.current.pause();
    audioManager.current = null;
  }
};