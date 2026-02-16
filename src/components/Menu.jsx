import "../assets/style/slot-machine.css";
import TitleGame from "./TitleGame";
import ButtonGame from "./ButtonGame";

export default function Menu() {
  // Convertir el audio + button en un componente
  return (
    <div className="slot-background">
      <TitleGame /> 
      <ButtonGame />
    </div>
  );
}
