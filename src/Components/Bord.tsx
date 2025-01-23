import { useState, FC } from 'react';
import Square from './Square';
import '../Bord.css';

interface BoardProps {
  isGameOver: boolean;
  onGameEnd: (winner: string | null) => void;
}

const Board: FC<BoardProps> = ({ isGameOver, onGameEnd }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const handleClick = (index: number) => {
    if (board[index] || isGameOver) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    if (winner) {
      onGameEnd(winner);
    } else if (newBoard.every((square) => square !== null)) {
      onGameEnd(null);
    }
  };

  
  const renderSquare = (index: number) => {
    return <Square value={board[index]} onClick={() => handleClick(index)} />;
  };

  return (
    <div className="board">
      {Array.from({ length: 3 }).map((_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {Array.from({ length: 3 }).map((_, colIndex) => {
            const index = rowIndex * 3 + colIndex;
            return (
              <div key={index} className="board-cell">
                {renderSquare(index)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const calculateWinner = (squares: (string | null)[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;