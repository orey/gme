'use strict';

//======================================= UTILS

function output(s, verbose=false){
    if (verbose)
        console.log(s);
}

function out(s, verbose = true){
    if (verbose)
        console.log(s);
}

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
    return n % 2 != 0;
}

function formatPercentage(x) {
    return parseFloat(x).toFixed(2)+"%";
}


//=========================================TEST

function test(){
    output("invisible output");
    output("visible output", true);
    output("22 is even?", true);
    output(isEven(22),true);
    output("22 is odd?", true);
    output(isOdd(22),true);
    
}

/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        output,
        out,
        isEven,
        isOdd,
        formatPercentage,
        test,
    }
}

