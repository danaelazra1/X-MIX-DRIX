import { useState ,FC } from 'react';
import Board from './Components/Bord';

const App: FC = () => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [resetTrigger, setResetTrigger] = useState<number>(0);

  const handleGameEnd = (winner: string | null) => {
    setIsGameOver(true);
    setWinner(winner);
  };

  const handlePlayAgain = () => {
    setIsGameOver(false);
    setWinner(null);
    setResetTrigger(prev => prev + 1); 
  };

  return (
    <div className="App">
      <h1>X Mix Drix Game</h1>
      <Board 
        key={resetTrigger} 
        isGameOver={isGameOver} 
        onGameEnd={handleGameEnd} 
      />
      {isGameOver && (
        <div className="winner-message">
          <h2>{winner ? `${winner} wins!` : "It's equal!"}</h2>
          <button className="play-again" onClick={handlePlayAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;