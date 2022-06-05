/*------------------------------------------------------------------------------------
Filename: focus.js
Author: https://github.io/orey/gme
Creation date: June 05 2022
Under GNU GPL v3 licence
------------------------------------------------------------------------------------
Ce fichier met en place le focus pour un événement aléatoire.

Le choix du focus est un mécanisme générique facilement extensible. Une table des 
topics indique tous les points de focus, avec un index qui n'a pas de borne supérieure.
Ces index sont référencés dans la table de tables EVENT_FOCUS_TABLES.

Il est supposé que le programme est appelé par quelqu'un qui a lancé 1d100, soit 
manuellement, soit automatiquement.
------------------------------------------------------------------------------------*/
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
    [10, "Positif pour un PNJ"]
]


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
    ]
]

function getFocus(num, tableref = 0){
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
        getFocus,
    }
}
