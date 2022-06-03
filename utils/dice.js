'use strict';

const utils = require("./utils.js");

//======================================= DICE

function rollDie(faces){
    return Math.floor((Math.random()*faces)+1);
}

// Dice string 3d6 2d6+1 3d8+4
function roll(dicestring, verbose=false){
    utils.output(dicestring,verbose);
    let temp = dicestring.split('+');
    let pips = 0;
    if (temp.length > 1)
        try {
            pips = parseInt(temp[1]);
        }
        catch (e) {
            utils.output("Exception ");
            utils.output(e);
            utils.output(dicestring);
            return -1;
        }
    let temp2 = temp[0].split('d');
    let numb = temp2[0];
    let faces = temp2[1];
    let result = pips;
    let temp3 = 0;
    for (let i=0;i<numb;i++){
        temp3 = rollDie(faces);
        utils.output(temp3,verbose);
        result += temp3;
    }
    return result;
}

function test(){
    utils.output("3d6+1 result = " + roll("3d6+1",true), true);
    utils.output("1d10 result = " + roll("1d10",true), true);
    utils.output("1d100 result = " + roll("1d100",true), true);
    utils.output("2d8+3 result = " + roll("2d8+3",true), true);
    utils.output("1d4 result = " + roll("1d4",true), true);
    utils.output("3d12+4 result = " + roll("3d12+4",true), true);
}

/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        rollDie,
        roll,
        test,
    }
}
