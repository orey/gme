'use strict';

const dice  = require("../utils/dice.js");
const utils = require("../utils/utils.js");

const TABLE_DESTIN = [
    [
        // TENSION = 1
        [ 0, -20, 77 ], //estim=-4
        [ 0, 0, 81 ],
        [ 1, 5, 82 ],
        [ 1, 5, 82 ],
        [ 2, 10, 83 ],//estim=0
        [ 4, 20, 85 ],
        [ 5, 25, 86 ],
        [ 9, 45, 90 ],
        [ 10, 50, 91 ],
	[ 11, 55, 92 ],
	[ 16, 80, 97 ]//estim=6
    ],
    [
        //tension = 2
        [ 0, 0, 81 ],
        [ 1, 5, 82 ],
        [ 1, 5, 82 ],
        [ 2, 10, 83 ],
        [ 3, 15, 84 ],
        [ 5, 25, 86 ],
        [ 7, 35, 88 ],
        [ 10, 50, 91 ],
        [ 11, 55, 92 ],
        [ 13, 65, 94 ],
        [ 16, 85, 97 ]
    ],
    [
        //tension = 3
        [ 0, 0, 81 ],
        [ 1, 5, 82 ],
        [ 2, 10, 83 ],
        [ 3, 15, 84 ],
        [ 5, 25, 86 ],
        [ 9, 45, 90 ],
        [ 10, 50, 91 ],
        [ 13, 65, 94 ],
        [ 15, 75, 96 ],
        [ 16, 80, 97 ],
        [ 18, 90, 99 ]
    ],
    [
        //tension = 4
        [ 1, 5, 82 ],
        [ 2, 10, 82 ],
        [ 3, 15, 84 ],
        [ 4, 20, 85 ],
        [ 7, 35, 88 ],
        [ 10, 50, 91 ],
        [ 11, 55, 92 ],
        [ 15, 75, 96 ],
        [ 16, 80, 97 ],
        [ 16, 85, 97 ],
        [ 19, 95, 100 ]
    ],
    [
        //tension = 5
        [ 1, 5, 82 ],
        [ 3, 15, 84 ],
        [ 5, 25, 86 ],
        [ 7, 35, 88 ],
        [ 10, 50, 91 ],
        [ 13, 65, 94 ],
        [ 15, 75, 96 ],
        [ 16, 85, 97 ],
        [ 18, 90, 99 ],
        [ 18, 90, 99 ],
        [ 19, 95, 100 ]
    ],
    [
        //tension = 6
        [ 2, 10, 83 ],
        [ 5, 25, 86 ],
        [ 9, 45, 90 ],
        [ 10, 50, 91 ],
        [ 13, 65, 94 ],
        [ 16, 80, 97 ],
        [ 16, 85, 97 ],
        [ 18, 90, 99 ],
        [ 19, 95, 100 ],
        [ 19, 95, 100 ],
        [ 20, 100, 0 ]
    ],
    [
        //tension = 7
        [ 3, 15, 84 ],
        [ 7, 35, 88 ],
        [ 10, 50, 91 ],
        [ 11, 55, 92 ],
        [ 15, 75, 96 ],
        [ 16, 85, 97 ],
        [ 18, 90, 99 ],
        [ 19, 95, 100 ],
        [ 19, 95, 100 ],
        [ 19, 95, 100 ],
        [ 20, 100, 0 ]
    ],
    [
        //tension = 8
        [ 5, 25, 86 ],
        [ 10, 50, 91 ],
        [ 13, 65, 94 ],
        [ 15, 75, 96 ],
        [ 16, 85, 97 ],
        [ 18, 90, 99 ],
        [ 19, 95, 100 ],
        [ 19, 95, 100 ],
        [ 20, 100, 0 ],
        [ 22, 110, 0 ],
        [ 26, 130, 0 ]
    ],
    [
        //tension = 9
        [ 10, 50, 91 ],
        [ 15, 75, 96 ],
        [ 16, 85, 97 ],
        [ 18, 90, 99 ],
        [ 19, 95, 100 ],
        [ 19, 95, 100 ],
        [ 20, 100, 0 ],
        [ 21, 105, 0 ],
        [ 23, 115, 0 ],
        [ 25, 125, 0 ],
        [ 26, 145, 0 ]
    ]
]

const RESULT = {
    EXCEPTIONAL_NO: -2,
    NO: -1,
    YES: 1,
    EXCEPTIONAL_YES: 2
}


//========================================== Oracle

/*
 * if the dice roll is < TN, then it's a no, otherwise, it's a yes
 */
function oracle2(evalu,tension,verbose=false){
    // Décalage dans les indices de tension (pour tension, indice = tension - 1)
    // et d'évaluation (pour evalu, indice = evalu + 4)
    let fate = dice.roll("1d100");
    utils.output("=> Oracle rolls: " + fate.toString(), verbose);
    let arr = TABLE_DESTIN[tension -1][evalu + 4];
    utils.output(arr, verbose);
    // We got an array of 3 numbers
    // threshold for exceptional yes, yes, threshold for exceptional no
    let res = 0;
    if ((arr[0] != 0) && (fate <= arr[0])) {
        utils.output("The answer is EXCEPTIONAL YES",verbose);
        return RESULT.EXCEPTIONAL_YES;
    }
    if ((arr[1] != 0) && (fate <= arr[1])) {
        utils.output("The answer is YES",verbose);
        return RESULT.YES;
    }
    if ((arr[2] != 0) && (fate < arr[2])) {
        utils.output("The answer is NO",verbose);
        return RESULT.NO;
    }
    if ((arr[2] != 0) && (fate >= arr[2])) {
        utils.output("The answer is EXCEPTIONAL NO",verbose);
        return RESULT.EXCEPTIONAL_NO;
    }
    utils.output("Problem: you should not get here",verbose);
}

//========================================== Tests

// excep. no, no, yes, exep yes
const STATS = [0,0,0,0];

function increm(res) {
    switch(res){
    case RESULT.EXCEPTIONAL_NO:
        STATS[0] += 1;
        return;
    case RESULT.NO:
        STATS[1] += 1;
        return;
    case RESULT.YES:
        STATS[2] += 1;
        return;
    case RESULT.EXCEPTIONAL_YES:
        STATS[3] += 1;
        return;
    default:
        utils.output("You should not be here. res = " + res.toString(), true);
        return;
    }
}

function unit_test(verbose){
    for (let i=-4;i<=6;i++) {
        for (let j=1;j<=9;j++) {
            increm(oracle2(i, j, verbose));
            utils.output("---",verbose);
        }
    }
}

function iter(){
    const seuil = 10000;
    for (let i=0;i<seuil;i++)
        unit_test(false);
    utils.output((STATS[0]/seuil) + ", " + (STATS[1]/seuil) + ", "
                 + (STATS[2]/seuil) + ", " + (STATS[3]/seuil),true);

}


function test_simple(){
    unit_test(false);
    utils.output(STATS,true);
    const sum = arr => arr.reduce((a, b) => a + b, 0);
    if (sum(STATS) == 99)
        utils.output("OK",true);
    else
        utils.output("MARCHE PAS",true);
}

function test(){
    //test_simple();
    iter();
}

//test()

/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        TABLE_DESTIN,
        RESULT,
        oracle2,
        test,
    }
}


