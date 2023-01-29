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

// Utils for the command line
let readlineSync = require('readline-sync');
let clear = require('clear');

let VERBOSE = true;


//========================================== Print

const PROMPT = "~ ";

function question(s) {
    return readlineSync.question(PROMPT + s);
}

const REP = "> ";

function reponse(s) {
    utils.out(REP + s);
}

function sep(){
    utils.out("==============================================");
}


//========================================== Document

class Document {
    descr = [];
    constructor(firstelem){
        this.descr.push(firstelem);
    }

    addLine(elem){
        this.descr.push(elem);
    }

    print(){
        let i = 0;
        for (let e of this.descr)
            reponse("[" + (++i).toString() + "] " + e);
    }
}

//========================================== Adventure

class Adventure {
    constructor(thename, descr) {
        this.name = thename;
        this.descr = new Document(descr);
        this.chaos = 5;
        this.scenes = [];
    }

    print(){
        sep();
        reponse("Aventure : " + this.name);
        reponse("Description de l'aventure : ");
        this.descr.print()
        reponse("Niveau de chaos : " + this.chaos);
        if (this.scenes.length > 0) {
            reponse("Scenes : ");
            for (let s of this.scenes)
                s.print();
        }
        
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
        reponse("Scene number " + this.number);
        reponse("Setup: ");
        reponse(this.setup);
        reponse("Description: ");
        reponse(this.descr);
    }

}

//========================================== Piste

class Piste {
    constructor(lapiste) {
        this.piste = lapiste;
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
    "[1] Créer une nouvelle aventure",
    "[2] Charger une aventure",
    "[3] Créer une nouvelle scène",
    "[4] Synthèse de l'histoire en cours",
    "[5] Sauvegarder l'histoire en cours",
    "[0] Quitter"
]

function mainMenu(){
    sep();
    for (let elem of OPTIONS)
        utils.out(elem);
}

function main() {
    //let adv = new Adventure("Il était une fois...");
    //let scene1 = new Scene(1,"Je tente de rentrer dans le jardin grillagé");
    //analyzeScene(adv, scene1);
    let choix = 0;
    while (true) {
        mainMenu();
        choix = question('Choisissez une option : ');
        clear();
        switch(parseInt(choix)){
        case 0:
            reponse("Au revoir.");
            return;
        case 1:
            let name = question("Nom de l'aventure : ");
            let descr = question("Description de l'aventure : ");
            let av = new Adventure(name, descr);
            av.print();
            break;
        default:
            reponse("Ce cas n'est pas traité");
            break;
            
            
        }

        
    }
}

main()

