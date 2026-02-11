import { useRef } from "react";
import { NavLink } from "react-router-dom";
import "../assets/style/slot-machine.css";
import casinoMusic from "../assets/music/casino-ambient.mp3";
import TitleGame from "./TitleGame";

export default function Menu() {
  // Convertir el audio + button en un componente
  const audioRef = useRef(null);

  const startMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(casinoMusic);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }

    audioRef.current
      .play()
      .catch((err) => console.log("Audio blocked:", err));
  };

  return (
    <div className="slot-background">
      <TitleGame /> 

      <div className="buttons_container">
        <NavLink to="/games">
          <button id="btn_slot_machine" onClick={startMusic}> 
            <p className="btn_p_slot">Try your luck</p>
            <img
              src="/icons/casino-slot-machine-3d-rendering-isometric-icon-png-2997725973.png"
              alt="Slot Machine"
            />
          </button>
        </NavLink>
      </div>
    </div>
  );
}
