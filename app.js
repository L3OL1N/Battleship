const {Ship,GameBoard} = require("./main");

const gameboard = new GameBoard;
let board = gameboard.board;
board[9][0] = 1;
console.log(board)