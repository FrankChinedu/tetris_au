import React from 'react';

interface IBtn {
  callback: () => void
}
const StartButton: React.FC<IBtn> = ({ callback }) => (
  <button onClick={callback} className="bg-white">Start Game</button>
);

export default StartButton;
