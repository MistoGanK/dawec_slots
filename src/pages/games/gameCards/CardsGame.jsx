import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { stopGlobalAudio } from "../../../components/ButtonGame";
import TitleGame from "../../../components/TitleGame";
import Carta from "../../../components/Carta";
import "../../../assets/style/card-game.css";
import "../../../assets/style/carta.css";

export default function CardsGame() {
  const navigate = useNavigate();
  const [cartas, setCartas] = useState([]);
  const [turnos, setTurnos] = useState(0);
  const [eleccionUno, setEleccionUno] = useState(null);
  const [eleccionDos, setEleccionDos] = useState(null);
  const [deshabilitado, setDeshabilitado] = useState(false);

  const MAX_INTENTOS = 20;
  const [intentosRestantes, setIntentosRestantes] = useState(MAX_INTENTOS);
  const [showPopup, setShowPopup] = useState(false);
  const [premio, setPremio] = useState("");
  const [juegoGanado, setJuegoGanado] = useState(false);

  const imagenesCartas = [
    { src: "/icons/deck/eight-of-spades.png", encontrada: false },
    { src: "/icons/deck/jack-of-spades.png", encontrada: false },
    { src: "/icons/deck/jingle-bell.png", encontrada: false },
    { src: "/icons/deck/joker-hat.png", encontrada: false },
    { src: "/icons/deck/king-of-spades.png", encontrada: false },
    { src: "/icons/deck/seven-of-spades.png", encontrada: false },
    { src: "/icons/deck/six-of-spades.png", encontrada: false },
    { src: "/icons/deck/ten-of-spades.png", encontrada: false },
  ];

  const baraja = () => {
    const cartasBarajadas = [...imagenesCartas, ...imagenesCartas]
      .sort(() => Math.random() - 0.5)
      .map((carta) => ({
        ...carta,
        encontrada: false,
        id: `${Date.now()}-${Math.random()}`,
      }));

    setEleccionUno(null);
    setEleccionDos(null);
    setCartas(cartasBarajadas);
    setTurnos(0);
    setDeshabilitado(false);
    setIntentosRestantes(MAX_INTENTOS);
    setShowPopup(false);
    setJuegoGanado(false);
  };

  const handleEleccion = (carta) => {
    if (carta.id === eleccionUno?.id) return;
    eleccionUno ? setEleccionDos(carta) : setEleccionUno(carta);
  };

  useEffect(() => {
    if (eleccionUno && eleccionDos) {
      setDeshabilitado(true);

      if (eleccionUno.src === eleccionDos.src) {
        setCartas((prev) =>
          prev.map((c) =>
            c.src === eleccionUno.src ? { ...c, encontrada: true } : c,
          ),
        );
        setTimeout(() => resetear(), 500);
      } else {
        setTimeout(() => resetear(), 1000);
      }

      if (!juegoGanado) {
        setIntentosRestantes((prev) => Math.max(prev - 1, 0));
      }
    }
  }, [eleccionUno, eleccionDos, juegoGanado]);

  const resetear = () => {
    setEleccionUno(null);
    setEleccionDos(null);
    setTurnos((t) => t + 1);
    setDeshabilitado(false);
  };

  useEffect(() => {
    if (cartas.length > 0 && !juegoGanado) {
      const todasEncontradas = cartas.every((carta) => carta.encontrada);
      if (todasEncontradas) {
        const premios = ["10%", "20%", "30%", "50%", "2x1"];
        const premioElegido =
          premios[Math.floor(Math.random() * premios.length)];
        setPremio(premioElegido);
        setShowPopup(true);
        setDeshabilitado(true);
        setJuegoGanado(true);
      }
    }
  }, [cartas, juegoGanado]);

  useEffect(() => {
    baraja();
  }, []);

  const handleBack = () => {
    stopGlobalAudio();
    navigate("/");
  };

  const cerrarPopup = () => {
    setShowPopup(false);
    baraja();
  };

  // Forzar victoria
  const handleJuan = () => {
    if (juegoGanado) return; // No activar si se ha ganado

    // Marcar todas las cartas como encontradas
    setCartas((prev) => prev.map((carta) => ({ ...carta, encontrada: true })));

    const premios = ["10%", "20%", "30%", "50%", "2x1"];
    const premioElegido = premios[Math.floor(Math.random() * premios.length)];
    setPremio(premioElegido);
    setShowPopup(true);
    setDeshabilitado(true);
    setJuegoGanado(true);
  };

  return (
    <div className="cards-game-container">
      <TitleGame />
      <button className="slot-button" onClick={handleJuan}>
        Juan
      </button>
      <div className="game-controls">
        <button className="slot-button" onClick={baraja}>
          Nueva Partida
        </button>
        <button className="slot-button" onClick={handleBack}>
          Back
        </button>
      </div>

      <div className="grid-carta">
        {cartas.map((carta) => (
          <Carta
            key={carta.id}
            carta={carta}
            handleEleccion={handleEleccion}
            volteada={
              carta.encontrada ||
              carta.id === eleccionUno?.id ||
              carta.id === eleccionDos?.id
            }
            deshabilitado={deshabilitado || carta.encontrada}
          />
        ))}
      </div>

      <div className="game-stats">
        <p>
          Intentos restantes: <strong>{intentosRestantes}</strong>
        </p>
      </div>

      {showPopup && (
        <div className="slot-popup-overlay">
          <div className="slot-popup-content">
            <h2>¡ENHORABUENA!</h2>
            <p>Has ganado un cupón del</p>
            <div className="prize-tag">{premio}</div>
            <button onClick={cerrarPopup}>CANJEAR</button>
          </div>
        </div>
      )}
    </div>
  );
}
