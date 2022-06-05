/*--------------------------------------------
Filename: randomevent.js
Author: https://github.io/orey/gme
Creation date: June 05 2022
Under GNU GPL v3 licence
--------------------------------------------
Ce fichier crée un événement aléatoire.

Il appelle trois autres fichiers dans le même
répertoire : focus, action et sens.
--------------------------------------------*/
'use strict';

const dice  = require("../utils/dice.js");
const utils = require("../utils/utils.js");

const focus = require("./focus.js");
const action = require("./action.js");
const sens = require("./sens.js");

//-------------------------------------------------- Random event

function AutoRandomEvent(verbose = false) {
    utils.output("RANDOM EVENT",true);
    // First d100 is for the focus table
    let focusroll = dice.roll("1d100");
    utils.output("Jet de focus = " + focusroll.toString(),verbose);
    let myfocus = focus.getFocus(focusroll); // sur la table par défaut
    utils.output("FOCUS : " + myfocus[1], true);

    // Second d100 on the action table
    let actionroll = dice.roll("1d100");
    utils.output("Jet d'action = " + actionroll.toString(),verbose);
    let myaction = action.getAction(actionroll);
    utils.output("ACTION : " + myaction[1], true);

    // Third d100 on the meaning table (sens)
    let sensroll = dice.roll("1d100");
    utils.output("Jet de sens = " + sensroll.toString(),verbose);
    let mysens = sens.getSens(sensroll);
    utils.output("SENS : " + mysens[1], true);

    return [myfocus, myaction, mysens ];
}

function RandomEvent(ffocus, aaction, mmeaning, verbose = false) {
    utils.output("RANDOM EVENT",true);
d    // Take the provides parameter
    let focusroll = fffocus;
    utils.output("Jet de focus = " + focusroll.toString(),verbose);
    let myfocus = focus.getFocus(focusroll); // sur la table par défaut
    utils.output("FOCUS : " + myfocus[1], true);

d    // Take the provides parameter
    let actionroll = aaction;
    utils.output("Jet d'action = " + actionroll.toString(),verbose);
    let myaction = action.getAction(actionroll);
    utils.output("ACTION : " + myaction[1], true);

d    // Take the provides parameter
    let sensroll = mmeaning;
    utils.output("Jet de sens = " + sensroll.toString(),verbose);
    let mysens = sens.getSens(sensroll);
    utils.output("SENS : " + mysens[1], true);

    return [myfocus, myaction, mysens ];
}



//-------------------------------------------------- Tests

function test(){
    utils.output("------------------- DEFAULT", true);
    for (let i=0;i<5;i++)
        AutoRandomEvent(true);
    utils.output("------------------- EPIC", true);
    for (let i=0;i<5;i++)
        AutoRandomEvent(true, focus.FOCUS.EPIC);
    utils.output("------------------- PERSONAL", true);
    for (let i=0;i<5;i++)
        AutoRandomEvent(true, focus.FOCUS.PERSONAL);
    utils.output("------------------- HORROR", true);
    for (let i=0;i<5;i++)
        AutoRandomEvent(true, focus.FOCUS.HORROR);


}


/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        AutoRandomEvent,
        RandomEvent,
        test,
    }
}
