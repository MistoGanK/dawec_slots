import "./assets/style/App.css";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import GameRoom from "./pages/games/GameRoom";
import SlotMachine from "./pages/games/gameSlots/SlotMachine";
import CardsGame from "./pages/games/gameCards/CardsGame";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/games" element={<GameRoom />}>
        <Route path="gameSlots" element={<SlotMachine />} />
        <Route path="gamesCards" element={<CardsGame />} />
      </Route>
    </Routes>
  );
}

export default App;