import { useState } from 'react'; //imports useState hook which manages state in a functional component

function Square({ value, onSquareClick }) { //functional component Square takes props; value to display in square and function to call when clicked
  return (
    <button className="square" onClick={onSquareClick}> //passing a function to square component using onSquareClick prop
      {value} //renders the value prop inside button
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) { //functional component Board, accepts 3 props; boolean, an array representing state of each square, onPlay function called on click 
  function handleClick(i) { //index i as parameter
    if (calculateWinner(squares) || squares[i]) { //checks if theres a winner, or if clicked square is not empty
      return; //if either are true, function exits now
    }
    const nextSquares = squares.slice(); //creates shallow copy of squares array meaning nested elements are not copied, only references to them
    if (xIsNext) {
      nextSquares[i] = 'X'; //if x is next, X
    } else {
      nextSquares[i] = 'O'; //if not, O
    }
    onPlay(nextSquares); //calls onPlay with shallow copy array
  }

  const winner = calculateWinner(squares); //calculates winner with original array
  let status; //holds games status message
  if (winner) { //if winner variable is truthy
    status = 'Winner: ' + winner; //sets status message to declare winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); //ternary operator that if true gives X, false gives O
  }

  return (
    <> //fragment allows returning multiple elements without adding extra nodes
      <div className="status">{status}</div>  
      <div className="board-row">            //^renders div element displaying game status
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> //renders the board with statuses 
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} /> //props are the arguments passed to component when used
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Import the useState hook from React, which allows us to manage state in a functional component
import { useState } from 'react';

// Define the Game component and export it as the default export of this module
export default function Game() {
  // Declare a state variable 'history' to store an array of arrays representing the board state at each move
  // Initialize it with an array containing a single array of 9 null values, representing an empty board
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  // Declare a state variable 'currentMove' to track the index of the current move
  // Initialize it to 0, indicating the start of the game
  const [currentMove, setCurrentMove] = useState(0);
  
  // Determine if 'X' is the next player based on whether the current move index is even
  const xIsNext = currentMove % 2 === 0;
  
  // Get the current board state from the history array based on the current move index
  const currentSquares = history[currentMove];

  // Define a function to handle a play, which occurs when a square is clicked
  function handlePlay(nextSquares) {
    // Create a new history array by slicing the existing history up to the current move
    // Add the new board state (nextSquares) to the end of this new history array
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    
    // Update the history state variable with the new history array
    setHistory(nextHistory);
    
    // Update the current move index to the index of the last element in the new history array
    setCurrentMove(nextHistory.length - 1);
  }

  // Define a function to jump to a specific move in the history
  function jumpTo(nextMove) {
    // Update the current move index to the specified move index
    setCurrentMove(nextMove);
  }

  // Create an array of move buttons by mapping over the history array
  const moves = history.map((squares, move) => {
    // Declare a variable to hold the description for each move button
    let description;
    
    // Set the description based on the move index
    if (move > 0) {
      description = 'Go to move #' + move; // Description for a specific move
    } else {
      description = 'Go to game start'; // Description for the start of the game
    }
    
    // Return a list item containing a button that allows the user to jump to the specified move
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Return the JSX to render the Game component
  return (
    <div className="game">
      {/* Render the Board component and pass the necessary props */}
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* Render the game information, including the list of move buttons */}
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Define a function to calculate the winner of the game based on the current board state
function calculateWinner(squares) {
  // Define an array of arrays, where each inner array represents a winning combination of indices
  const lines = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];
  
  // Loop through each winning combination
  for (let i = 0; i < lines.length; i++) {
    // Destructure the current winning combination into three variables: a, b, and c
    const [a, b, c] = lines[i];
    
    // Check if the squares at indices a, b, and c are equal and not null
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // If so, return the value of the square at index a (either 'X' or 'O'), indicating the winner
      return squares[a];
    }
  }
  
  // If no winner is found, return null
  return null;
}

