'use strict';

const ODDS = {
    impossible: -8,
    no_way: -6,
    very_unlikely: -4,
    unlikely: -2,
    average: 0,
    likely: 2,
    very_likely: 4,
    sure_thing: 6,
    has_to_be: 8
}

//======================================= UTILS

function output(s, debug=true){
    if (debug)
        console.log(s);
}

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
    return !isEven(n);
}


//======================================= DICE

function rollDie(faces){
    return Math.floor((Math.random()*faces)+1);
}

// Dice string 3d6 2d6+1 3d8+4
function roll(dicestring){
    output(dicestring);
    let temp = dicestring.split('+');
    let pips = 0;
    if (temp.length > 1)
        try {
            pips = parseInt(temp[1]);
        }
        catch (e) {
            output("Exception ");
            output(e);
            output(dicestring);
        }
    let temp2 = temp[0].split('d');
    let numb = temp2[0];
    let faces = temp2[1];
    let result = pips;
    let temp3 = 0;
    for (let i=0;i<numb;i++){
        temp3 = rollDie(faces);
        output(temp3);
        result += temp3;
    }
    return result;
}

function testRoll(){
    output("result = " + roll("3d6+1"));
    output("result = " + roll("1d10"));
    output("result = " + roll("1d100"));
    output("result = " + roll("2d8+3"));
    output("result = " + roll("1d4"));
    output("result = " + roll("3d12+4"));
}


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


//========================================== Oracle

/*
 * if the dice roll is < TN, then it's a no, otherwise, it's a yes
 */
function oracle1(evalu,tension){
    // eval
    let modifier = evalu;
    // the oracle will say "yes" more often is the tension is high 
    let tn = 11;
    if (tension == 6)
        tn -= 2; // easier to say yes
    if (tension == 3)
        tn += 2;
    output("TN = " + tn.toString());
    // roll the fate
    let fate1 = roll("1d10");
    let fate2 = roll("1d10");
    output("Oracle rolls: " + fate1.toString() + " - " + fate2.toString());    
    // roll the tension
    let mytension = roll("1d10");
    output("Tension roll: " + mytension.toString());
    // no modification
    if (mytension > tension) {
        if (fate1+fate2+modifier < tn) {
            output("The answer is NO");
            return -1;
        }
        else {
            output("The answer is YES");
            return 1;
        }
    }
    
    if (fate1 == fate2) {
        if (fate1+fate2+modifier < tn) {
            output("The answer is EXCEPTIONAL NO + RANDOM EVENT");
            return -4;
        }
        else {
            output("The answer is EXCEPTIONAL YES + RANDOM EVENT");
            return 4;
        }
    }
        
    if (isOdd(fate1) && isOdd(fate2)) {
        if (fate1+fate2+modifier < tn) {
            output("The answer is EXCEPTIONAL NO");
            return -2;
        }
        else {
            output("The answer is EXCEPTIONAL YES");
            return 2;
        }
    }
        
    if (isEven(fate1) && isEven(fate2)) {
        if (fate1+fate2 < tn) {
            output("The answer is RANDOM EVENT");
            return -3;
        }
        else {
            output("The answer is RANDOM EVENT");
            return 3;
        }
    }

    // Default case
    if (fate1+fate2+modifier < tn) {
        output("The answer is NO");
        return -1;
    }
    else {
        output("The answer is YES");
        return 1;
    }
    
}

function test_oracle1(){
    oracle1(0,4);
    oracle1(0,4);
    oracle1(0,4);
    oracle1(0,5);
    oracle1(4,6);
    


}



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
