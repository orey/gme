'use strict';

function output(s, debug=true){
    if (debug)
        console.log(s);
}

function rollDie(faces){
    return Math.floor((Math.random()*faces)+1);
}

// Dice string 3d6 2d6+1 3d8+4
function roll(dicestring){
    output(dicestring);
    let temp = dicestring.split('+');
    let pips = 0;
    if (temp.length > 1)
        try {
            pips = parseInt(temp[1]);
        }
        catch (e) {
            output("Exception ");
            output(e);
            output(dicestring);
        }
    let temp2 = temp[0].split('d');
    let numb = temp2[0];
    let faces = temp2[1];
    let result = pips;
    let temp3 = 0;
    for (let i=0;i<numb;i++){
        temp3 = rollDie(faces);
        output(temp3);
        result += temp3;
    }
    return result;
}

function testRoll(){
    output("result = " + roll("3d6+1"));
    output("result = " + roll("1d10"));
    output("result = " + roll("1d100"));
    output("result = " + roll("2d8+3"));
    output("result = " + roll("1d4"));
    output("result = " + roll("3d12+4"));
}

function isEven(n) {
   return n % 2 == 0;
}


class Adventure {
    constructor(name) {
        this._name = name;
        this._chaos = 5;
        this._scenes = [];
    }

    get chaos(){
        return this._chaos;
    }

    addScene(sce) {
        this._scenes.push(sce);
    }
}

class Scene {
    constructor(number, setup) {
        this._number = number;
        this._setup = setup;
        this._altered = "";
        this._interrupt = "";
    }

    get number() {
        return this._number
    }
    
}

function analyzeScene(adv, sce) {
    let roll = rollDie(10);
    output("Roll against Chaos: " + roll.toString());
    if (roll <= adv.chaos) {
        if (isEven(roll))
            output("Scene " + sce.number + " interrupt");
        else
            output("Scene " + sce.number + " altered");
    }
    else
        output("Scene is normal");
        
}

function main() {
    let adv = new Adventure("Il était une fois...");
    let scene1 = new Scene(1,"Je tente de rentrer dans le jardin grillagé");
    analyzeScene(adv, scene1);

}

main()
testRoll();
