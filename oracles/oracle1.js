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
    utils.output("Evaluation = " + modifier.toString()
                 + " | Tension  = " + tension.toString(),verbose);

    // the oracle will say "yes" more often is the tension is high 
    let tn = 11;
    if (tension == 6)
        tn -= 2; // easier to say yes
    if (tension == 3)
        tn += 2;
    utils.output("Inital TN = 11, corrected TN = " + tn.toString(),verbose);

    // roll the fate
    let fate1 = dice.roll("1d10");
    let fate2 = dice.roll("1d10");
    utils.output("=> Oracle rolls: " + fate1.toString()
                 + " + " + fate2.toString()
                 + " = " + (fate1+fate2).toString(),
                 verbose);    

    // roll the tension
    let mytension = dice.roll("1d10");
    utils.output("=> Tension roll: " + mytension.toString(),verbose);

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


//========================================== Tests
// excep no re, no re, excep. no, no, yes, exep yes, yes re, excep yes re
const STATS = [0,0,0,0,0,0,0,0];

function increm(res) {
    switch(res){
    case RESULT.EXCEPTIONAL_NO_RANDOM_EVENT:
        STATS[0] += 1;
        return;
    case RESULT.NO_RANDOM_EVENT:
        STATS[1] += 1;
        return;
    case RESULT.EXCEPTIONAL_NO:
        STATS[2] += 1;
        return;
    case RESULT.NO:
        STATS[3] += 1;
        return;
    case RESULT.YES:
        STATS[4] += 1;
        return;
    case RESULT.EXCEPTIONAL_YES:
        STATS[5] += 1;
        return;
    case RESULT.YES_RANDOM_EVENT:
        STATS[6] += 1;
        return;
    case RESULT.EXCEPTIONAL_YES_RANDOM_EVENT:
        STATS[7] += 1;
        return;
    default:
        utils.output("You should not be here. res = " + res.toString(), true);
        return;
    }
}

// total of combinations is 28 = 7 x 4
const COMBI = 28;

function unit_test(verbose){
    for (let i=-6;i<=6;i=i+2) {
        for (let j=3;j<=6;j++) {
            increm(oracle1(i, j, verbose));
            utils.output("---",verbose);
        }
    }
    
}

function iter(){
    const seuil = 10000;
    for (let i=0;i<seuil;i++)
        unit_test(false);
    utils.output(
        utils.formatPercentage(STATS[0]/seuil/28*100) + ", "
            + utils.formatPercentage(STATS[1]/seuil/28*100) + ", "
            + utils.formatPercentage(STATS[2]/seuil/28*100) + ", "
            + utils.formatPercentage(STATS[3]/seuil/28*100) + ", "
            + utils.formatPercentage(STATS[4]/seuil/28*100) + ", "
            + utils.formatPercentage(STATS[5]/seuil/28*100) + ", "
            + utils.formatPercentage(STATS[6]/seuil/28*100) + ", "
            + utils.formatPercentage(STATS[7]/seuil/28*100)
        ,true);

}

function test_simple(){
    unit_test(true);
    utils.output(STATS,true);
    const sum = arr => arr.reduce((a, b) => a + b, 0);
    if (sum(STATS) == 28)
        utils.output("OK",true);
    else
        utils.output("MARCHE PAS",true);
}

function test(){
    //test_simple();
    iter();
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

