'use strict';

let dice   = require("./utils/dice.js");
let utils  = require("./utils/utils.js");
let oracle = require("./oracles/oracle1.js");


//========================================== Adventure

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


//========================================== Scene

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


/


//========================================== Sequence

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

//========================================== Main

function main() {
    let adv = new Adventure("Il était une fois...");
    let scene1 = new Scene(1,"Je tente de rentrer dans le jardin grillagé");
    analyzeScene(adv, scene1);

}

main()
testRoll();
test_oracle1();
