// src/components/Game.jsx
import React, { useState } from 'react';
import './Game.css'; // Ensure you create corresponding CSS for styles

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return combo;
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return; // Ignore click if square is already filled or if there's a winner

    const newBoard = board.slice();
    newBoard[index] = isPlayerOne ? 'X' : 'O';
    setBoard(newBoard);

    const winningCombo = checkWinner(newBoard);
    if (winningCombo) {
      setWinner(isPlayerOne ? 'Player 1' : 'Player 2');
      setWinningLine(winningCombo);
    } else {
      setIsPlayerOne(!isPlayerOne);
    }
  };

  const renderSquare = (index) => (
    <button 
      className={`square ${winningLine.includes(index) ? 'highlight' : ''}`} 
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <div className="board">
        {board.map((_, index) => renderSquare(index))}
      </div>
      {winner && <div className="winner-announcement">{winner} wins!</div>}
    </div>
  );
};

export default Game;
