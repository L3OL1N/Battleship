const {Ship,GameBoard,Player,game} = require("./main");
const board = new GameBoard;

const player = new Player;
player.attack([0,0],board);
console.log(board.board[0]);
// player.attack([0,1],board);
// console.log(board.board);