/*--------------------------------------------
Filename: main.js
Author: https://github.io/orey/gme
Creation date: June 05 2022
Under GNU GPL v3 licence
--------------------------------------------
Ce fichier est le point d'entrée principal du GME

--------------------------------------------*/
'use strict';

let dice   = require("./utils/dice.js");
let utils  = require("./utils/utils.js")


/*
oracle1 et oracle2 ont tous les deux la même interface d'entrée mais pas
la même interface de sortie

function oracle...(evalu,chaos,verbose=false)

*/

// let oracle = require("./oracles/oracle1.js");
let oracle = require("./oracles/oracle2.js");

let ea = require("./randomevent/randomevent.js");

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
