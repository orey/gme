'use strict';

const dice  = require("../utils/dice.js");
const utils = require("../utils/utils.js");

const ODDS = {
    IMPOSSIBLE: -8,
    NO_WAY: -6,
    VERY_UNLIKELY: -4,
    UNLIKELY: -2,
    AVERAGE: 0,
    LIKELY: 2,
    VERY_LIKELY: 4,
    SURE_THING: 6,
    HAS_TO_BE: 8
}

const RESULT = {
    EXCEPTIONAL_NO_RANDOM_EVENT: -4,
    NO_RANDOM_EVENT: -3,
    EXCEPTIONAL_NO: -2,
    NO: -1,
    YES: 1,
    EXCEPTIONAL_YES: 2,
    YES_RANDOM_EVENT: 3,
    EXCEPTIONAL_YES_RANDOM_EVENT: 4
}

//========================================== Oracle

/*
 * if the dice roll is < TN, then it's a no, otherwise, it's a yes
 */
function oracle1(evalu,tension,verbose=false){
    // eval
    let modifier = evalu;
    utils.output("eval = " + modifier.toString(),verbose);
    utils.output("tension  = " + tension.toString(),verbose);

    // the oracle will say "yes" more often is the tension is high 
    let tn = 11;
    utils.output("initial TN = " + tn.toString(),verbose);
    if (tension == 6)
        tn -= 2; // easier to say yes
    if (tension == 3)
        tn += 2;
    utils.output("corrected TN = " + tn.toString(),verbose);

    // roll the fate
    let fate1 = dice.roll("1d10");
    let fate2 = dice.roll("1d10");
    utils.output("Oracle rolls: " + fate1.toString() + " / " + fate2.toString(),verbose);    

    // roll the tension
    let mytension = dice.roll("1d10");
    utils.output("Tension roll: " + mytension.toString(),verbose);

    // no modification due to tension
    if (mytension > tension) {
        if (fate1+fate2+modifier < tn) {
            utils.output("The answer is NO",verbose);
            return RESULT.NO;
        }
        else {
            utils.output("The answer is YES",verbose);
            return RESULT.YES;
        }
    }

    //modifications due to tension
    if (fate1 == fate2) {
        if (fate1+fate2+modifier < tn) {
            utils.output("The answer is EXCEPTIONAL NO + RANDOM EVENT",verbose);
            return RESULT.EXCEPTIONAL_NO_RANDOM_EVENT;
        }
        else {
            utils.output("The answer is EXCEPTIONAL YES + RANDOM EVENT",verbose);
            return RESULT.EXCEPTIONAL_YES_RANDOM_EVENT;
        }
    }
        
    if (utils.isOdd(fate1) && utils.isOdd(fate2)) {
        if (fate1+fate2+modifier < tn) {
            utils.output("The answer is EXCEPTIONAL NO",verbose);
            return RESULT.EXCEPTIONAL_NO;
        }
        else {
            utils.output("The answer is EXCEPTIONAL YES",verbose);
            return RESULT.EXCEPTIONAL_YES;
        }
    }
        
    if (utils.isEven(fate1) && utils.isEven(fate2)) {
        if (fate1+fate2 < tn) {
            utils.output("The answer is NO + RANDOM EVENT",verbose);
            return RESULT.NO_RANDOM_EVENT;
        }
        else {
            utils.output("The answer is YES + RANDOM EVENT",verbose);
            return RESULT.YES_RANDOM_EVENT;
        }
    }

    // Default case
    if (fate1+fate2+modifier < tn) {
        utils.output("The answer is NO",verbose);
        return RESULT.NO;
    }
    else {
        utils.output("The answer is YES",verbose);
        return RESULT.YES;
    }
    
}

function test(){
    oracle1(0,4,true);
    oracle1(0,4,true);
    oracle1(0,4,true);
    oracle1(0,5,true);
    oracle1(4,6,true);

}


/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        ODDS,
        RESULT,
        oracle1,
        test,
    }
}

