import React from "react";
import "./chess.less";

export default class Chess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chessBoard: getBoard(),
      source_pos: null,
      target_pos: null
    };
    this.rows = 8;
    this.cols = 8;
    this.getCell = this.getCell.bind(this);
    this.initBoard = this.initBoard.bind(this);
  }

  initializeWhitePiece() {
    let board = this.state.chessBoard;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.cols; j++) {
        board[i][j] = {
          img: "",
          bg: board[i][j].bg,
          name: ""
        };
      }
    }
  }

  initializBlackPiece() {
    let board = this.state.chessBoard;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < this.cols; j++) {
        board[i][j] = {
          img: "",
          name: "",
          bg: board[i][j].bg
        };
      }
    }
  }

  initBoard() {
    this.initializBlackPiece();
    this.initializeWhitePiece();
  }

  getCell(row, col) {
    let board = this.state.chessBoard;
    // console.log('board is ',board);
    if (board[row][col]) {
      return (
        <div className={"cell " + board[row][col].bg}>{board[row][col].bg}</div>
      );
    } else {
      return (
        <div className={"cell " + board[row][col].bg}>{board[row][col].bg}</div>
      );
    }
  }

  render() {
    let board = this.state.chessBoard;
    return (
      <div className="chess-container">
        {board.map((row, rIndex) => {
          return (
            <div className="row">
              {row.map((col, colIndex) => {
                return this.getCell(rIndex, colIndex);
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

let getBoard = function () {
  let arr = [];
  let rows = 8;
  let cols = 8;
  arr = new Array(rows);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(cols);
    let bg = "";
    let rbg = i % 2 === 0 ? 0 : 1;
    for (let j = 0; j < cols; j++) {
      if (j % 2 === 0) {
        bg = rbg;
      } else {
        bg = 1 - rbg;
      }

      arr[i][j] = {
        bg: bg ? "red" : "grey"
      };
    }
  }
  return arr;
};
