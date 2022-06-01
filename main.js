'use strict';

/*
 * Main random function
 */
function rollDie(faces){
    return Math.floor((Math.random()*faces)+1);
}

// Dice string 3d6 2d6+1 3D8+4
function roll(dicestring){
    let temp = dicestring.split('+');
    let pips = 0;
    if (temp.length > 1)
        try {
            pips = parseInt(xtemp[1]);
        }
        catch (e) {
            output("Exception ");
            output(
        }
    return Math.floor((Math.random()*faces)+1);
}



function isEven(n) {
   return n % 2 == 0;
}

function output(s){
    console.log(s);
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

