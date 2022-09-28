const {Ship,GameBoard,Player} = require("./main");

const gameboard = new GameBoard;
let board = gameboard.board;
let player = new Player;
player.autoAttack(gameboard);
player.autoAttack(gameboard);
player.autoAttack(gameboard);

console.log(player.PChit);