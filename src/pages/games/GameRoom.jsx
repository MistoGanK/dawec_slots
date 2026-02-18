import { Outlet, useMatch } from 'react-router-dom';
import ButtonGame from '../../components/ButtonGame';

export default function GameRoom() {
    const isExactGameRoot = useMatch('/games');

  return (
    <div className='slot-background'>
      {isExactGameRoot && <ButtonGame/> }
      <Outlet />
    </div>
  );
}