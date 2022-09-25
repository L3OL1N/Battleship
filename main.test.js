const Ship = require("./main");

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