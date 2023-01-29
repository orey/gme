/*--------------------------------------------
Filename: focus.js
Author: https://github.io/orey/gme
Creation date: June 05 2022
Under GNU GPL v3 licence
--------------------------------------------
Ce fichier met en place le focus pour un 
événement aléatoire.

Le choix du focus est un mécanisme générique
facilement extensible. Une table des TOPICS
indique tous les points de focus, avec un 
index qui n'a pas de borne supérieure.

Ces index sont référencés dans la table 
de tables EVENT_FOCUS_TABLES qui peut 
proposer plusieurs tables.

Il est supposé que le programme est 
appelé par quelqu'un qui a lancé 1d100, soit 
manuellement, soit automatiquement.
--------------------------------------------*/
'use strict';

const TOPICS = [
    // Tous les sujets qui peuvent être au centre du focus
    // Leur index est celui du tableau
    [1, "Evénement distant"],
    [2, "Action d'un PNJ"],
    [3, "Introduire un nouveau PNJ"],
    [4, "Faire avancer une piste"],
    [5, "Faire reculer une piste"],
    [6, "Négatif pour un PJ"],
    [7, "Positif pour un PJ"],
    [8, "Evénement ambigu"],
    [9, "Négatif pour un PNJ"],
    [10, "Positif pour un PNJ"],
    [11, "Horreur pour un PJ"],
    [12, "Horreur pour un PNJ"],
    [13, "Action!"],
    [14, "Poser une bombe!"],
    [15, "Fermer une piste"],
    [16, "Action d'un PNJ envers un PJ"],
    [17, "Faire avancer une piste PJ"],
    [18, "Faire reculer une piste PJ"],
    [19, "Fermer une piste PJ"],
    [20, "Négatif pour un PNJ envers un PJ"],
    [21, "Positif pour un PNJ envers un PJ"],
    [22, "La piste est plus grave que prévue"]
]

const FOCUS = {
    DEFAULT: 0,
    HORROR: 1,
    ADVENTURE: 2,
    MYSTERY: 3,
    SOCIAL: 4,
    PERSONAL: 5,
    EPIC: 6
}


const EVENT_FOCUS_TABLES = [
    [
        // default table - ref = 0
        // inf, sup, index dans la table TOPICS
        [1, 7, 1],
        [8, 28, 2],
        [29, 35, 3],
        [36, 45, 4],
        [46, 52, 5],
        [56, 67, 6],
        [68, 75, 7],
        [76, 83, 8],
        [84, 92, 9],
        [93, 100,10]
    ],
    [
        // Horror focus table - ref = 1
        [  1, 10, 11 ],
        [ 11, 23, 12 ],
        [ 24, 30,  1 ],
        [ 31, 49,  2 ],
        [ 50, 52,  3 ],
        [ 53, 55,  4 ],
        [ 56, 62,  5 ],
        [ 63, 72,  6 ],
        [ 73, 75,  7 ],
        [ 76, 82,  8 ],
        [ 83, 97,  9 ],
        [ 98, 100, 10],
    ],
    [
        // Adventure focus table - ref = 2
        [  1, 16, 13 ],
        [ 17, 24,  1 ],
        [ 25, 44,  2 ],
        [ 45, 52,  3 ],
        [ 53, 56,  4 ],
        [ 57, 64,  5 ],
        [ 65, 76,  6 ],
        [ 77, 80,  7 ],
        [ 81, 84,  8 ],
        [ 85, 96,  9 ],
        [ 97, 100, 10],
    ],
    [
        // Mystery focus table - ref = 3
        [1, 8, 1],
        [9, 20, 2],
        [21, 32, 3],
        [33, 52, 4],
        [53, 64, 5],
        [65, 72, 6],
        [73, 80, 7],
        [81, 88, 8],
        [89, 96, 9],
        [97, 100,10]
    ],
    [
        // Social focus table - ref = 4
        [  1, 12, 14 ],
        [ 13, 24,  1 ],
        [ 25, 36,  2 ],
        [ 37, 44,  3 ],
        [ 45, 56,  4 ],
        [ 57, 60,  5 ],
        [ 61, 64, 15 ],
        [ 65, 72,  6 ],
        [ 73, 80,  7 ],
        [ 81, 92,  8 ],
        [ 93, 96,  9 ],
        [ 97, 100, 10]
    ],
    [
        // Personal focus table - ref = 5
        [  1,  7,  1 ],
        [  8, 24,  2 ],
        [ 25, 28, 16 ],
        [ 29, 35,  3 ],
        [ 36, 42,  4 ],
        [ 43, 45, 17 ],
        [ 46, 50,  5 ],
        [ 51, 52, 18 ],
        [ 53, 54, 15 ],
        [ 55, 55, 19 ],
        [ 56, 67,  6 ],
        [ 68, 75,  7 ],
        [ 76, 83,  8 ],
        [ 84, 90,  9 ],
        [ 91, 92, 20 ],
        [ 93, 99, 10 ],
        [ 100, 100, 21 ]
    ],
    [
        // Epic focus table - ref = 6
        [  1, 12, 22 ],
        [ 13, 16,  1 ],
        [ 17, 30,  2 ],
        [ 31, 42,  3 ],
        [ 43, 46,  4 ],
        [ 47, 58,  5 ],
        [ 59, 72,  6 ],
        [ 73, 80,  7 ],
        [ 81, 84,  8 ],
        [ 85, 92,  9 ],
        [ 93, 100, 10],
    ]
]

function getFocus(num, tableref = FOCUS.DEFAULT){
    let siz = EVENT_FOCUS_TABLES[tableref].length;
    let inf = 0, sup = 0;
    let focus_text = "";
    let index = 0;
    for (let i=0;i<siz;i++){
        inf = EVENT_FOCUS_TABLES[tableref][i][0];
        sup = EVENT_FOCUS_TABLES[tableref][i][1];
        if ((num >= inf) && (num <= sup)) {
            index = EVENT_FOCUS_TABLES[tableref][i][2];
            focus_text = TOPICS[index-1][1];
            break;
        }
    }
    return [index, focus_text];
}


/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        FOCUS,
        getFocus,
    }
}
