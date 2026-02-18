import { useNavigate } from "react-router-dom";
import "../../../assets/style/slot-machine.css";
import SlotTapes from "../../../components/SlotTapes";
import TitleGame from "../../../components/TitleGame";
import slootTry from "../../../assets/sounds/slot_try_V1.mp3";
import { useRef, useEffect, useState } from "react";

export default function SlotMachine() {
  const navigate = useNavigate();

  // Objetos Iconos
  const baseItems = [
    { item_id: 1, item_img: "/icons/cherry.png", item_name: "cherry" },
    { item_id: 2, item_img: "/icons/clover.png", item_name: "clover" },
    { item_id: 3, item_img: "/icons/diamond-icon.png", item_name: "diamond" },
    { item_id: 4, item_img: "/icons/jingle-bell.png", item_name: "bell" },
  ];

  // Objeto descuentos
  const discounts = { 1: "10%", 2: "25%", 3: "50%", 4: "100%" };

  const [reels, setReels] = useState([
    [...baseItems],
    [...baseItems],
    [...baseItems],
  ]);
  const [isSpinning, setIsSpinning] = useState([false, false, false]);
  const [showPopup, setShowPopup] = useState(false);
  const [prize, setPrize] = useState("");

  const audioRef = useRef(null);

  // Al cargar el componente, se prepara el sonido
  useEffect(() => {
    audioRef.current = new Audio(slootTry);
    audioRef.current.volume = 0.5;
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Funcion movimiento y tiempo
  const startAnimation = (currentReels) => {
    setShowPopup(false); // Si hay premio se quita
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log(e));
    }

    setIsSpinning([true, true, true]); // Ponemos los 3 rieles a girar

    // Frenado en cascada (para que no paren todos a la vez, estilo casino)
    setTimeout(() => setIsSpinning([false, true, true]), 3000); // 1º > 3 seg
    setTimeout(() => setIsSpinning([false, false, true]), 4000); // 2º > 4 seg
    setTimeout(() => {
      setIsSpinning([false, false, false]); // Para el último a los 5 seg
      checkWinner(currentReels); // Comprobamos si ha ganado
    }, 5000);
  };

  // Logica de victoria
  const checkWinner = (currentReels) => {
    // IDs resultantes
    const res1 = currentReels[0][0].item_id;
    const res2 = currentReels[1][0].item_id;
    const res3 = currentReels[2][0].item_id;

    // Victoria si hay coincidencia
    if (res1 === res2 && res2 === res3) {
      setPrize(discounts[res1]); // Descuento
      setShowPopup(true); // Pop up
    }
  };

  // Acción del botón SPIN (Suerte pura)
  const handleSpinning = () => {
    if (isSpinning.some((s) => s)) return; // Proteger si ya gira

    // Random iconos para cada riel
    const newReels = reels.map(() =>
      [...baseItems].sort(() => Math.random() - 0.5),
    );
    setReels(newReels);
    startAnimation(newReels); // Spin
  };

  // Forzar Victoria
  const forceWin = () => {
    if (isSpinning.some((s) => s)) return;

    // Icono ganador random
    const winnerItem = baseItems[Math.floor(Math.random() * baseItems.length)];

    const winningReels = reels.map(() => {
      const others = baseItems.filter((i) => i.item_id !== winnerItem.item_id);
      return [winnerItem, ...others.sort(() => Math.random() - 0.5)];
    });

    setReels(winningReels);
    startAnimation(winningReels); // Empezar el spin con conbinación ganadora (no visual)
  };

  return (
    <div className="slot-machine">
      <div className="slot-scoop"></div>
      <TitleGame />

      <div className="slot-body">
        {reels.map((items, i) => (
          <SlotTapes key={i} items={items} spinning={isSpinning[i]} />
        ))}
      </div>

      {showPopup && (
        <div className="slot-popup-overlay">
          <div className="slot-popup-content">
            <h2>¡ENHORABUENA!</h2>
            <p>Has ganado un cupón del</p>
            <div className="prize-tag">{prize}</div>
            <button onClick={() => setShowPopup(false)}>CANJEAR</button>
          </div>
        </div>
      )}

      <div className="slot-button-container">
        <button className="slot-button" onClick={forceWin}>
          JOAN
        </button>
        <button className="slot-button" onClick={() => navigate("/")}>Back</button>
        <button className="slot-button" onClick={handleSpinning}>
          {isSpinning.some((s) => s) ? "Spining..." : "SPIN"}
        </button>
      </div>
    </div>
  );
}
