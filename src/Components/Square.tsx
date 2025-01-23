import { FC } from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick} disabled={!!value}>
      {value && (
        <img
          src={`/images/${value === 'X' ? 'x.png' : 'o.png'}`} 
          alt={value}
        />
      )}
    </button>
  );
};

export default Square;