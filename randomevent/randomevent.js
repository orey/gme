'use strict';

const dice  = require("../utils/dice.js");
const utils = require("../utils/utils.js");

const EVENT_FOCUS_TABLE = [
    [1, 7, "Evénement distant"],
    [8, 28, "Action d'un PNJ"],
    [29, 35, "Introduire un nouveau PNJ"],
    [36, 45, "Faire avancer une piste"],
    [46, 52, "Faire reculer une piste"],
    [56, 67, "Négatif pour un PJ"],
    [68, 75, "Positif pour un PJ"],
    [76, 83, "Evénement ambigu"],
    [84, 92, "Négatif pour un PNJ"],
    [93, 100, "Positif pour un PNJ"]
]


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

function RandomEvent(verbose = false) {
    utils.output("RANDOM EVENT",true);
    // First d100 is for the focus table
    let focus = dice.roll("1d100");
    utils.output("Roll = " + focus.toString(),verbose);
    let found = false;
    let siz = EVENT_FOCUS_TABLE.length;
    let inf = 0, sup = 0;
    let focus_text = "";
    for (let i=0;i<siz;i++){
        inf = EVENT_FOCUS_TABLE[i][0];
        sup = EVENT_FOCUS_TABLE[i][1];
        if ((focus >= inf) && (focus <= sup)) {
            focus_text = EVENT_FOCUS_TABLE[i][2];
            break;
        }
    }
    utils.output("FOCUS: " + focus_text,true);

    //reprendre ici

}


function test(){
    for (let i=0;i<20;i++)
        RandomEvent(true);

}

test();

