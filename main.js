class Ship{
    constructor(length){
        this.length = length;
        this.hitPos = new Array(length).fill(false);
    }
    hit(num){
        if(num <= this.length) this.hitPos[num-1] = true
    }
    isSunk(){
        return this.hitPos.every(val=>val==true)? true:false;
    }
}
class GameBoard{
    constructor(){
        this.board = generBoard();
    }
    shipSet(num,pos,dir){
        let ship = new Ship(num);
        let row = pos[0];
        let col = pos[1];
        if(dir == "v"){
            for(let i = 0; i < num; i++){
                this.board[row + i][col] = {"ship" : ship};
            }
        }
        if(dir == "h"){
            for(let i = 0; i < num; i++){
                this.board[row][col+i] = {"ship" : ship};
            }
        }
    }
}
function generBoard(){
    let arr = [];
    for(let i = 0; i <10; i++){
        arr.push(new Array(10).fill([]))
    }
    return arr;
}
module.exports.Ship = Ship;
module.exports.GameBoard = GameBoard;