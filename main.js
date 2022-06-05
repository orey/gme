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

let readlineSync = require('readline-sync');


let VERBOSE = true;

//========================================== Adventure

class Adventure {
    constructor(thename) {
        utils.out("New Adventure: " + thename);
        this.name = thename;
        this.chaos = 5;
        this.scenes = [];
    }

    print(){
        utils.out("Adventure" + this.name);
        utils.out("Chaos"     + this.chaos);
        for (let s of this.scenes)
            s.print();
        
    }
    

    addScene(sce) {
        this._scenes.push(sce);
    }
}


//========================================== Scene

const SCENE_TYPE = {
    NORMAL:      [1, "normale"],
    ALTERED:     [2, "altérée"],
    INTERRUPTED: [3, "interrompue"]
}

class Scene {
    constructor(thenumber, thesetup) {
        this.number = thenumber;
        this.setup = thesetup;
        this.descr = ""
        this.type = SCENE_TYPE.NORMAL;;
    }

    print(){
        utils.out("Scene number " + this.number);
        utils.out("Setup: ");
        utils.out(this.setup);
        utils.out("Description: ");
        utils.out(this.descr);
    }

}

//========================================== Sequence

function analyzeScene(adv, sce) {
    let myroll = dice.roll("1d10");
    utils.output("Roll against Chaos: " + myroll.toString(), true);
    if (myroll <= adv.chaos) {
        if (utils.isEven(myroll))
            utils.output("Scene " + sce.number + " interrupt", true);
        else
            utils.output("Scene " + sce.number + " altered", true);
    }
    else
        utils.output("Scene is normal", true);
        
}

//========================================== Main

const OPTIONS = [
    "Créer une nouvelle histoire",
    "Charger une histoire",
    "Créer une nouvelle scène",
    "Synthèse de l'histoire en cours",
    "Sauvegarder l'histoire en cours"
]

function main() {
    //let adv = new Adventure("Il était une fois...");
    //let scene1 = new Scene(1,"Je tente de rentrer dans le jardin grillagé");
    //analyzeScene(adv, scene1);
    let choix = 0;
    while (true) {
        choix = readlineSync.keyInSelect(OPTIONS, 'Choisissez une option : ');
        if (choix ==-1) break;
        console.log('Option choisie : ' + OPTIONS[choix]);
    }
    utils.out("Au revoir.");
}

main()

