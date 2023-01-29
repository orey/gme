/*--------------------------------------------
Filename: db.js
Author: https://github.io/orey/gme
Creation date: June 06 2022
Under GNU GPL v3 licence
--------------------------------------------
Petite DB
--------------------------------------------*/
const fs = require('fs');

function write(content) {
    try {
        fs.writeFileSync('./gme.db', content);
        // file written successfully
    } catch (err) {
        console.error(err);
    }
}

function read() {
    try {
        const data = fs.readFileSync('./gme.db', 'utf8');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

function writeDocument(doc){

}

/*--------------------------------------
 * Exports
 *--------------------------------------*/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        read,
        write,
    }
}


