/*--------------------------------------------
Filename: action.js
Author: https://github.io/orey/gme
Creation date: June 05 2022
Under GNU GPL v3 licence
--------------------------------------------
Ce fichier gère les actions (1d100).

Pour gérer de nouvelles tables d'actions, il
serait nécessaire de l'adapter.

On renvoit le tableau et l'index.
--------------------------------------------*/
'use strict';

//const dice  = require("../utils/dice.js");
//const utils = require("../utils/utils.js");

const ACTION = [
    [ 1, "Atteindre" ],
    [ 2, "Démarrer" ],
    [ 3, "Négliger" ],
    [ 4, "Combattre" ],
    [ 5, "Recruter" ],
    [ 6, "Triompher" ],
    [ 7, "Enfreindre" ],
    [ 8, "Opposer" ],
    [ 9, "Intention malveillante" ],
    [ 10, "Communiquer" ],
    [ 11, "Persécuter" ],
    [ 12, "Augmenter" ],
    [ 13, "Diminuer" ],
    [ 14, "Abandonner" ],
    [ 15, "Gratifier" ],
    [ 16, "Se renseigner" ],
    [ 17, "Contrarier" ],
    [ 18, "Bouger" ],
    [ 19, "Gaspiller" ],
    [ 20, "Trêve" ],
    [ 21, "Relâcher" ],
    [ 22, "Devenir ami" ],
    [ 23, "Juger" ],
    [ 24, "Déserter" ],
    [ 25, "Dominer" ],
    [ 26, "Remettre au lendemain" ],
    [ 27, "Encenser" ],
    [ 28, "Séparer" ],
    [ 29, "Prendre" ],
    [ 30, "Casser" ],
    [ 31, "Soigner" ],
    [ 32, "Retarder" ],
    [ 33, "Stopper" ],
    [ 34, "Mentir" ],
    [ 35, "Revenir" ],
    [ 36, "Imiter" ],
    [ 37, "Lutter" ],
    [ 38, "Informer" ],
    [ 39, "Accorder" ],
    [ 40, "Reporter" ],
    [ 41, "Exposer" ],
    [ 42, "Marchander" ],
    [ 43, "Emprisonner" ],
    [ 44, "Relâcher" ],
    [ 45, "Célébrer" ],
    [ 46, "Développer" ],
    [ 47, "Voyager" ],
    [ 48, "Bloquer" ],
    [ 49, "Blesser" ],
    [ 50, "Dégrader" ],
    [ 51, "Faire des excès" ],
    [ 52, "Ajourner" ],
    [ 53, "Adversité" ],
    [ 54, "Tuer" ],
    [ 55, "Déranger" ],
    [ 56, "Usurper" ],
    [ 57, "Créer" ],
    [ 58, "Trahir" ],
    [ 59, "Etre d’accord" ],
    [ 60, "Abuser" ],
    [ 61, "Oppresser" ],
    [ 62, "Inspecter" ],
    [ 63, "Tendre un piège" ],
    [ 64, "Espionner" ],
    [ 65, "Attacher" ],
    [ 66, "Transporter" ],
    [ 67, "Ouvrir" ],
    [ 68, "Négliger" ],
    [ 69, "Ruiner" ],
    [ 70, "Extravagance" ],
    [ 71, "Duper" ],
    [ 72, "Arriver" ],
    [ 73, "Proposer" ],
    [ 74, "Diviser" ],
    [ 75, "Refuser" ],
    [ 76, "Se méfier" ],
    [ 77, "Tromper" ],
    [ 78, "Etre cruel" ],
    [ 79, "Etre intolérant" ],
    [ 80, "Avoir confiance" ],
    [ 81, "Etre excité" ],
    [ 82, "Activité" ],
    [ 83, "Assister" ],
    [ 84, "S’occuper de/soigner" ],
    [ 85, "Négliger" ],
    [ 86, "Passion" ],
    [ 87, "Travailler dur" ],
    [ 88, "Contrôler" ],
    [ 89, "Attirer" ],
    [ 90, "Echouer" ],
    [ 91, "Poursuivre" ],
    [ 92, "Se venger" ],
    [ 93, "Procédures" ],
    [ 94, "Se disputer" ],
    [ 95, "Punir" ],
    [ 96, "Guider" ],
    [ 97, "Transformer" ],
    [ 98, "Renverser" ],
    [ 99, "Oppresser" ],
    [ 100, "Changer" ]
]

function getAction(num) {
    return ACTION[num-1];
}

/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        getAction,
    }
}




