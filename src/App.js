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
    this.handleSelection = this.handleSelection.bind(this);
    this.getValidPos = this.getValidPos.bind(this);
    this.getPos = this.getPos.bind(this);
    this.initBoard();
  }

  getValidPos(name, c_row, c_col) {
    let valid = [];
    console.log("num is ", c_row * 8 + c_col);
    let num = "";
    // let currPosition = c_row * 8 + c_col;
    // valid.push(currPosition-1,currPosition+1,currPosition+7,currPosition+8,currPosition+9,
    //   currPosition-9,currPosition-8,currPosition-7)
    // let checkPosition = [currPosition-1,currPosition+1,currPosition+7,currPosition+8,currPosition+9,
    //   currPosition-9,currPosition-8,currPosition-7]

    // valid.push(currPosition+1)

    if (name === "wK") {
      if (c_row - 1 >= 0) {
        num = (c_row - 1) * 8 + c_col;
        valid.push(num);
      }

      if (c_col + 1 < 8) {
        num = c_row * 8 + (c_col + 1);
        valid.push(num);
      }

      if (c_col - 1 >= 0) {
        num = c_row * 8 + (c_col - 1);
        valid.push(num);
      }

      if (c_row + 1 < 8) {
        num = (c_row + 1) * 8 + c_col;
        valid.push(num);
      }
      //diagonal
      if (c_row + 1 < 8 && c_col + 1 < 8) {
        num = (c_row + 1) * 8 + (c_col + 1);
        valid.push(num);
      }
      if (c_row + 1 < 8 && c_col - 1 >= 0) {
        num = (c_row + 1) * 8 + (c_col - 1);
        valid.push(num);
      }
      if (c_row - 1 < 8 && c_col - 1 >= 0) {
        num = (c_row - 1) * 8 + (c_col - 1);
        valid.push(num);
      }
      if (c_row - 1 < 8 && c_col + 1 >= 0) {
        num = (c_row - 1) * 8 + (c_col + 1);
        valid.push(num);
      }
    } else if (name === "bK") {
      let num = c_row + 1 * 8 + c_col;
      valid.push(num);
      num = c_row * 8 + c_col + 1;
      valid.push(num);
      num = c_row * 8 + c_col - 1;
      valid.push(num);
    }
    return valid;
  }

  getPos(row, col) {
    console.log("target pos is", row * this.rows + col);
    return row * this.rows + col;
  }

  handleSelection(row, col) {
    let board = this.state.chessBoard;
    // console.log("sourc pos is", this.state.source_pos, row * 8 + col);
    if (this.state.source_pos) {
      let sp = this.state.source_pos;
      let c_row = sp.row;
      let c_col = sp.col;
      // console.log("c_row", c_row, "c_col", c_col);
      if (board[row][col]["name"]) {
        this.setState({
          source_pos: null,
          target_pos: null
        });
        alert("Invalid move");
        console.log("invalid");
      } else if (
        board[c_row][c_col]["name"] === "bK" ||
        board[c_row][c_col]["name"] === "wK"
      ) {
        let validPos = this.getValidPos(
          board[c_row][c_col]["name"],
          c_row,
          c_col
        );
        console.log("valid", validPos);
        if (validPos.includes(this.getPos(row, col))) {
          board[c_row][c_col] = { ...board[c_row][c_col], name: "", img: "" };
          board[row][col] = { ...board[row][col], name: "wK", img: "wK.png" };
          this.setState({
            chessBoard: board,
            source_pos: null
          });
        } else {
          this.setState({
            source_pos: null
          });
          console.log("invalid");
          alert("Invalid move");
        }
      }
    } else {
      console.log("current selected row", row, col);
      board[row][col]["selected"] = true;

      this.setState({
        source_pos: { row: row, col: col },
        chessBoard: board
      });
    }
  }
  initializeBlackPiece() {
    let board = this.state.chessBoard;
    let i = 0;
    board[i][0] = { ...board[i][0], img: "bR.png", name: "bR" };
    board[i][1] = { ...board[i][1], img: "bN.png", name: "bN" };
    board[i][2] = { ...board[i][2], img: "bB.png", name: "bB" };
    board[i][3] = { ...board[i][3], img: "bQ.png", name: "bQ" };
    board[i][4] = { ...board[i][4], img: "bK.png", name: "bK" };
    board[i][5] = { ...board[i][5], img: "bB.png", name: "bB" };
    board[i][6] = { ...board[i][6], img: "bN.png", name: "bN" };
    board[i][7] = { ...board[i][7], img: "bR.png", name: "bR" };
    i = 1;
    for (let j = 0; j < this.cols; j++) {
      board[i][j] = { ...board[i][j], img: "bP.png", name: "bP" };
    }
  }

  initializeWhitePiece() {
    let board = this.state.chessBoard;
    let i = 7;
    board[i][0] = { ...board[i][0], img: "wR.png", name: "wR" };
    board[i][1] = { ...board[i][1], img: "wN.png", name: "wN" };
    board[i][2] = { ...board[i][2], img: "wB.png", name: "wB" };
    board[i][3] = { ...board[i][3], img: "wQ.png", name: "wQ" };
    // board[i][4] = { ...board[i][4], img: "wK.png", name: "wK" };
    board[i][5] = { ...board[i][5], img: "wB.png", name: "wB" };
    board[i][6] = { ...board[i][6], img: "wN.png", name: "wN" };
    board[i][7] = { ...board[i][7], img: "wR.png", name: "wR" };
    i = 6;
    for (let j = 0; j < this.cols; j++) {
      board[i][j] = { ...board[i][j], img: "wP.png", name: "wP" };
    }

    board[4][4] = { ...board[4][4], img: "wK.png", name: "wK" };
  }

  initBoard() {
    this.initializeBlackPiece();
    this.initializeWhitePiece();
  }

  getCell(row, col) {
    let board = this.state.chessBoard;
    // console.log("image is ", board[row][col].img)
    return (
      <div
        className={
          "cell img " + board[row][col].bg + " " + board[row][col]["selected"]
        }
        onClick={() => this.handleSelection(row, col)}
      >
        {board[row][col].img ? (
          <img
            src={"/images/" + board[row][col].img}
            alt="alt"
            name={board[row][col]["name"]}
          />
        ) : (
          ""
        )}
      </div>
    );
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
        bg: bg ? "red" : "grey",
        name: "",
        img: ""
      };
    }
  }
  return arr;
};
