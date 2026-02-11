import React from 'react'
import TitleGame from '../../components/TitleGame'
import { NavLink } from 'react-router-dom'

export default function GameRoom() {
  // Rutas a los diferentes juegos
  return (
    <div className='slot-background'>
      <TitleGame></TitleGame>
      <ul>
        <NavLink to="/gameSlots">
          <li>Slots</li>
        </NavLink>
        
        <NavLink to="/gameCards">
          <li>Cards</li>
        </NavLink>
      </ul>
    </div>
  )
}
