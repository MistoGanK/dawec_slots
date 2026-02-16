import "./assets/style/App.css";
import Menu from "./components/Menu";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TitleGame from "./components/TitleGame";
import GameRoom from "./pages/games/GameRoom";
import SlotMachine from "./pages/games/gameSlots/SlotMachine";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu/>}></Route>
        <Route path="/games" element={
          <GameRoom>
            <Route path="/gameSlots"></Route>
            <Route path="/gamesCards"></Route>
          </GameRoom>
            
          }>
        </Route>
      </Routes>
    </>
  );
}

export default App;
