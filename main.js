class Ship{
    constructor(length){
        this.length = length;
        this.hitPos = new Array(length).fill(false);
        this.sink = false;
    }
    hit(index){
        if(index <= this.length){
            this.hitPos[index] = true;
            this.isSunk();
        } 
    }
    isSunk(){
        if(this.hitPos.every(val=>val==true)){
            this.sink = true;
            return  true;
        }
        return false;
    }
}
class GameBoard{
    constructor(){
        this.board = generBoard();
        this.ships = [];
    }
    shipSet(num,pos,dir){
        let ship = new Ship(num);
        let row = pos[0];
        let col = pos[1];
        for(let i = 0; i < num; i++){
            if(row + i > 9 || col + i > 9) return "can't set";
            if(dir == "v" && this.board[row + i][col] != "") return "can't set";
            if(dir == "h" && this.board[row][col + i] != "") return "can't set";
        }
        this.ships.push(ship);
        if(dir == "v"){
            for(let i = 0; i < num; i++){
                this.board[row + i][col] = {"ship" : ship,"index":i};
            }
        }
        if(dir == "h"){
            for(let i = 0; i < num; i++){
                this.board[row][col+i] = {"ship" : ship,"index":i};
            }
        }
    }
    receiveAttack(pos){
        let row = pos[0];
        let col = pos[1];
        let boardPos = this.board[row][col];
        if(boardPos.hit == true) return;
        boardPos.hit = true;
        if(boardPos.ship instanceof Ship){
            boardPos.ship.hit(boardPos.index);
        }
    }
    isAllSunk(){
       return this.ships.every(ship=>ship.sink == true)? true:false;
    }
}
function generBoard(){
    let arr = [];
    for(let i = 0; i < 10; i++){
        let arr2 = []
        for(let j = 0; j < 10; j++){
            arr2.push([])
        }
        arr.push(arr2);
    }
    return arr;
}
class Player{
    constructor(){
        this.PChit = [];
    }
    attack(pos,board){
        let boardPos = board.board[pos[0]][pos[1]];
        if(boardPos.hit == true) return "already attack";
        board.receiveAttack(pos)
        if(boardPos.ship instanceof Ship){
            return "hit"
        }
        return "miss";
    }
    autoAttack(board){
        let rand = Math.floor(Math.random() * 1000) % 100;
        while(this.PChit.includes(rand)){
            rand++;
        }
        this.PChit.push(rand);
        console.log(this.PChit);
        let row = Math.floor((rand-1) / 10);
        let col = (rand + 9) % 10;
        console.log("PC: " +[row,col]);
        let message = this.attack([row,col],board);
        return message;
    }
}
const typeOfShips = {
    "Carrier":5,
    "Battleship":4,
    "Cruiser":3,
    "Submarine":3,
    "Destroyer":2
}
function boardSet(board){
    let i = 0;
    for(ship in typeOfShips){
        while(!(board.ships[i] instanceof Ship)){
            let rand = Math.floor(Math.random() * 1000) % 100;
            let row = Math.floor(rand / 10);
            let col = (rand + 9) % 10;
            let num = typeOfShips[ship];
            let pos = [row,col];
            let dir = rand % 2 == 0? "v":"h";
            board.shipSet(num,pos,dir);
        }
        i++;
    }
}

//html
let wrapDiv = document.getElementById("wrap");
let winnerDiv = document.getElementById("winner");
let coverDiv = document.getElementById("cover");
let clickPos;
const generGrid = function(){
    let num = 10
    let numPow = num*num;
    for(let i =0; i < numPow; i++){
        let newDiv = document.createElement("div");
        // var textNode = document.createTextNode(i+1);
        // newDiv.appendChild(textNode);
        newDiv.dataset.item = i;
        newDiv.classList.add("create");
        wrapDiv.appendChild(newDiv);
    }
}();
for(let i = 0; i < wrapDiv.children.length; i++){
    wrapDiv.children[i].addEventListener("click",game,{once:true});
}
function divStyle(e,message){
    let target = e.target;
    if(message == "hit"){
        target.innerHTML = "O";
        target.style.color = "red";
    } 
    if(message == "miss"){
        target.innerHTML = "X";
    } 
}

//game
const PCgameboard = new GameBoard;
const HUgameboard = new GameBoard;
const PCplayer = new Player;
const HuPlayer = new Player;
function game(e){
    let item = e.target.dataset.item;
    // board set
    boardSet(PCgameboard);
    boardSet(HUgameboard);
    //game
    let selectPos = Number.parseInt(item,10) + 1;
    let row = Math.floor((selectPos-1) / 10);
    let col = (selectPos + 9) % 10;
    let Hupos = [row,col];
    let message = HuPlayer.attack(Hupos,PCgameboard);
    divStyle(e,message);
    console.log("hu " + message);
    if(PCgameboard.isAllSunk()){
        console.log("Human win");
        winnerDiv.innerHTML = "Human win !!";
        coverDiv.style.display = "block";
        winnerDiv.style.display = "block";
        return;
    }
    message = PCplayer.autoAttack(HUgameboard);
    console.log("pc " + message);
    //end
    if(HUgameboard.isAllSunk()){
        console.log("PC win");
        winnerDiv.innerHTML = "PC win !!";
        coverDiv.style.display = "block";
        winnerDiv.style.display = "block";
        return;
    } 
}
// module.exports.Ship = Ship;
// module.exports.GameBoard = GameBoard;
// module.exports.Player = Player;