/*--------------------------------------------
Filename: sens.js
Author: https://github.io/orey/gme
Creation date: June 05 2022
Under GNU GPL v3 licence
--------------------------------------------
Ce fichier gère le sens (1d100).

Pour gérer de nouvelles tables de sens, il
serait nécessaire de l'adapter.

On renvoit le tableau et l'index.
--------------------------------------------*/'use strict';

//const dice  = require("../utils/dice.js");
//const utils = require("../utils/utils.js");

const SENS = [
    [ 1, "Buts" ],
    [ 2, "Rêves" ],
    [ 3, "Environnement" ],
    [ 4, "Dehors" ],
    [ 5, "Dedans" ],
    [ 6, "Réalité" ],
    [ 7, "Alliés" ],
    [ 8, "Ennemis" ],
    [ 9, "Mauvais" ],
    [ 10, "Bon" ],
    [ 11, "Emotions" ],
    [ 12, "Opposition" ],
    [ 13, "Guerre" ],
    [ 14, "Paix" ],
    [ 15, "L’innocent" ],
    [ 16, "Amour" ],
    [ 17, "Le spirituel" ],
    [ 18, "L’intellectuel" ],
    [ 19, "Nouvelles idées" ],
    [ 20, "Joie" ],
    [ 21, "Messages" ],
    [ 22, "Energie" ],
    [ 23, "Equilibre" ],
    [ 24, "Tension" ],
    [ 25, "Amitié" ],
    [ 26, "Le physique" ],
    [ 27, "Un projet" ],
    [ 28, "Plaisirs" ],
    [ 29, "Souffrance" ],
    [ 30, "Possessions" ],
    [ 31, "Bénéfices" ],
    [ 32, "Plans" ],
    [ 33, "Mensonges" ],
    [ 34, "Attentes" ],
    [ 35, "Sujets légaux" ],
    [ 36, "Bureaucratie" ],
    [ 37, "Travail" ],
    [ 38, "Un chemin" ],
    [ 39, "Nouvelles" ],
    [ 40, "Facteur extérieurs" ],
    [ 41, "Conseils" ],
    [ 42, "Un complot" ],
    [ 43, "Compétition" ],
    [ 44, "Prison" ],
    [ 45, "Maladie" ],
    [ 46, "Nourriture" ],
    [ 47, "Attention" ],
    [ 48, "Succès" ],
    [ 49, "Echec" ],
    [ 50, "Voyage" ],
    [ 51, "Jalousie" ],
    [ 52, "Dispute" ],
    [ 53, "Chez soi" ],
    [ 54, "Investissement" ],
    [ 55, "Souffrance" ],
    [ 56, "Souhaits" ],
    [ 57, "Tactique" ],
    [ 58, "Impasse" ],
    [ 59, "Aléatoire" ],
    [ 60, "Malchance" ],
    [ 61, "Mort" ],
    [ 62, "Perturbation" ],
    [ 63, "Pouvoir" ],
    [ 64, "Un poids" ],
    [ 65, "Complots" ],
    [ 66, "Peurs" ],
    [ 67, "Embuscades" ],
    [ 68, "Rumeurs" ],
    [ 69, "Blessures" ],
    [ 70, "Extravagance" ],
    [ 71, "Un représentant" ],
    [ 72, "Epreuves" ],
    [ 73, "Opulence" ],
    [ 74, "Liberté" ],
    [ 75, "Militaire" ],
    [ 76, "Le mondain" ],
    [ 77, "Tentatives" ],
    [ 78, "Masses" ],
    [ 79, "Véhicule" ],
    [ 80, "Art" ],
    [ 81, "Victoire" ],
    [ 82, "Dispute" ],
    [ 83, "Fortune" ],
    [ 84, "Statu quo" ],
    [ 85, "Technologie" ],
    [ 86, "Espoir" ],
    [ 87, "Magie" ],
    [ 88, "Illusions" ],
    [ 89, "Portails" ],
    [ 90, "Danger" ],
    [ 91, "Armes" ],
    [ 92, "Animaux" ],
    [ 93, "Météo" ],
    [ 94, "Eléments" ],
    [ 95, "Nature" ],
    [ 96, "Le public" ],
    [ 97, "Leadership" ],
    [ 98, "Célébrité" ],
    [ 99, "Colère" ],
    [ 100, "Information" ]
]

function getSens(num) {
    return SENS[num-1];
}

/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        getSens,
    }
}
