import React from "react";

export default function Carta({ carta, handleEleccion, volteada, deshabilitado }) {
  const handleClick = () => {
    if (!deshabilitado && !volteada) handleEleccion(carta);
  };

  return (
    <div
      className={`carta ${volteada ? "is-flipped" : ""}`}
      role="button"
      aria-pressed={volteada}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      tabIndex={0}
    >
      <div className="carta-inner">
        <div className="carta-front">
          <img className="img-front" src={carta.src} alt="figura" />
        </div>
        <div className="carta-back">
          <img className="img-back" src="/icons/deck/playing-card.png" alt="reverso" />
        </div>
      </div>
    </div>
  );
}