import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from './Modal';
import './index.css';

  function Square(props) {
    return (
      <button 
        className="square" 
        onClick={props.onClick}
       >
        {props.value}
      </button>
    );
  }
  
  // Contains the game
  class Board extends React.Component {
    renderSquare(i) {
      return <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        />;
    }
  
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          isEnded: false
        };
    }
    
    onRestart = (closeOpen) => {
        this.setState({
            isEnded: closeOpen
        })
        console.log(this.state.isEnded)
        window.location.reload(false);
    }

    setIsEnded = (closeOpen) => {
        this.setState({
            isEnded: closeOpen
        })
    }

    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
    }

    // Change the value of the squares
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } 
    else if(this.state.stepNumber === 9) {
      status = "No one won ;("
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>

          <Modal
            isEnded={winner || this.state.stepNumber === 9}
            onRestart={() => this.onRestart(false)}
            >{status}</Modal>
        
        </div>
      );
    }
  }
  
  // ========================================
  function calculateWinner(squares) {
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
            console.log(squares)
            return squares[a];
        }
    }

    
    return null;
  }
  // ========================================
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  