import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const j = this.props.board;
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0 + j * 16)}
          {this.renderSquare(1 + j * 16)}
          {this.renderSquare(2 + j * 16)}
          {this.renderSquare(3 + j * 16)}
        </div>
        <div className="board-row">
          {this.renderSquare(4 + j * 16)}
          {this.renderSquare(5 + j * 16)}
          {this.renderSquare(6 + j * 16)}
          {this.renderSquare(7 + j * 16)}
        </div>
        <div className="board-row">
          {this.renderSquare(8 + j * 16)}
          {this.renderSquare(9 + j * 16)}
          {this.renderSquare(10 + j * 16)}
          {this.renderSquare(11 + j * 16)}
        </div>
        <div className="board-row">
          {this.renderSquare(12 + j * 16)}
          {this.renderSquare(13 + j * 16)}
          {this.renderSquare(14 + j * 16)}
          {this.renderSquare(15 + j * 16)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(64).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const index = i ;
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <div className="game-board-row">
          <Board
            squares={current.squares}
            board={0}
            onClick={i => this.handleClick(i)}
          />
          <div className="game-board-row"/>
          <Board
            squares={current.squares}
            board={1}
            onClick={i => this.handleClick(i)}
          />
          </div>
          <div className="game-board-row">
          <Board
            squares={current.squares}
            board={2}
            onClick={i => this.handleClick(i)}
          />
          <div className="game-board-row"/>
          <Board
            squares={current.squares}
            board={3}
            onClick={i => this.handleClick(i)}
          />
          </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

//function countLine(squares, index, offset, count) {
//
// if (squares[index] == null) {
//    return count;
// }
// let result = index + offset;
// if (result >= squares.length) {
//    return count;
// }
//
// if (squares[index] === squares[result]) {
//    count++;
//    return countLine(squares,result,offset,count);
// }
//
//}

function calculateWinner(squares) {

//  const lineDirection = [
//    [0,0,1],
//    [0,1,0],
//    [1,0,0],
//    [0,1,1],
//    [1,0,1],
//    [1,1,0],
//    [1,1,1]
//  ];
//
//  for (let i = 0; i < lineDirection.length; i++) {
//
//    const [dx, dy, dz] = lineDirection[i];
//
//    for (let j = 0 ; j < squares.length; j++) {
//       let count = 0;
//
//       let offset = dx + (dy *4) + (dz * 16);
//
//       count = countLine(squares,j,offset,count);
//
//       if (count > 2) {
//          return squares[j];
//       }
//    }
//
//  }

  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
  ];

  const moreLines = [
    [0, 16, 32, 48], // Vertical lines
    [1, 17, 33, 49],
    [2, 18, 34, 50],
    [3, 19, 35, 51],
    [4, 20, 36, 52],
    [5, 21, 37, 53],
    [6, 22, 38, 54],
    [7, 23, 39, 55],
    [8, 24, 40, 56],
    [9, 25, 41, 57],
    [10, 26, 42, 58],
    [11, 27, 43, 59],
    [12, 28, 44, 60],
    [13, 29, 45, 61],
    [14, 30, 46, 62],
    [15, 31, 47, 63],

    [0, 17, 34, 51], // Diagonal Vertical lines
    [3, 18, 33, 48],
    [12, 29, 46, 63],
    [15, 30, 45, 60],

    [0, 20, 40, 60],
    [1, 21, 41, 61],
    [2, 22, 42, 62],
    [3, 23, 43, 63],

    [4, 21, 38, 55],
    [8, 25, 42, 59],
    [7, 22, 37, 52],
    [11, 26, 41, 56],

    [12, 24, 36, 48],
    [13, 25, 37, 49],
    [14, 26, 38, 50],
    [15, 27, 39, 51],

    [0, 21, 42, 63], // Diagonal diagonal lines
    [3, 22, 41, 60],
    [12, 25, 38, 51],
    [15, 26, 37, 48]
  ];


  for (let j = 0; j < 4; j++) {
      for (let i = 0; i < lines.length; i++) {
        let [a, b, c, d] = lines[i];
        a = a + j * 16;
        b = b + j * 16;
        c = c + j * 16;
        d = d + j * 16;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
          return squares[a];
        }
      }
  }

  for (let i = 0; i < moreLines.length; i++) {
    let [a, b, c, d] = moreLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
      return squares[a];
    }
  }

  return null;
}
