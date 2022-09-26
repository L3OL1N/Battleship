const {Ship,GameBoard} = require("./main");

const gameboard = new GameBoard;
let board = gameboard.board;
gameboard.shipSet(2,[0,0],"h");
gameboard.shipSet(3,[0,1],"v");
gameboard.receiveAttack([0,0])
// board[0][0].ship.hit(1);
// board[0][0].ship.isSunk();

console.log(board[0][0])