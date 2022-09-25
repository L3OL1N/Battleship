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

module.exports = Ship;