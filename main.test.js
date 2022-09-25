const {Ship,GameBoard} = require("./main");


describe("ship generate",()=>{
    test("ship length",()=>{
        const ship = new Ship(5);
        
        expect(ship.length).toBe(5);
    })
    test("ship hitPos",()=>{
        const ship = new Ship(5);
        const arr = [false,false,false,false,false]
        expect(ship.hitPos).toEqual(arr);
    })
    test("ship hit 2",()=>{
        const ship = new Ship(5);
        ship.hit(2);
        expect(ship.hitPos[1]).toBe(true);
    })
    test("ship hit to sunk",()=>{
        const ship = new Ship(2);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toBe(true);
    })
    test("ship hit no sunk",()=>{
        const ship = new Ship(3);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toBe(false);
    })
})
describe("gameboard generate",()=>{
    test("board size",()=>{
        const gameboard = new GameBoard;
        expect(gameboard.board.length).toBe(10)
        expect(gameboard.board[0].length).toBe(10)
    })
    test("board place ship vertical 2",()=>{
        const gameboard = new GameBoard;
        gameboard.shipSet(2,[0,0],"v");
        const ans0 = gameboard.board[0][0].ship instanceof Ship;
        const ans1 = gameboard.board[1][0].ship instanceof Ship;
        expect(ans0).toBe(true);
        expect(ans1).toBe(true);
    })
    test("board place ship vertical 2 hit",()=>{
        const gameboard = new GameBoard;
        gameboard.shipSet(2,[0,0],"v");
        gameboard.board[0][0].ship.hit(1);
        const ans = gameboard.board[0][0].ship.hitPos;
        const ans1 = gameboard.board[1][0].ship.hitPos;
        expect(ans[0]).toBe(true);
        expect(ans[1]).toBe(false);
        expect(ans1[0]).toBe(true);
    })
    test("board place ship horizon 2",()=>{
        const gameboard = new GameBoard;
        gameboard.shipSet(2,[0,0],"h");
        const ans0 = gameboard.board[0][0].ship instanceof Ship;
        const ans1 = gameboard.board[0][1].ship instanceof Ship;
        expect(ans0).toBe(true);
        expect(ans1).toBe(true);
    })
})