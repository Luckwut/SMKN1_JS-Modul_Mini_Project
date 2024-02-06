let textArea = document.getElementById("textArea");
let generateBtn = document.getElementById("generateBtn");
let trayekTable = document.getElementById("trayekTable");

function stringToNestedArray(inputString) {
    inputString = inputString.trim();
    let finalArray = [];
    let wordGroupArray = [];
    let word = "";

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        if (char !== ' ' && char !== ',') {
            word += char;
        }
        else if (char === ' ' && word !== '') {
            wordGroupArray.push(word);
            word = '';
        }
        else if (char === ',') {
            if (word !== '') {
                wordGroupArray.push(word);
                word = '';
            }
            if (wordGroupArray.length > 0) {
                finalArray.push(wordGroupArray);
            }
            wordGroupArray = [];
        }
    }
    if (word !== '') {
        wordGroupArray.push(word);
    }
    if (wordGroupArray.length > 0) {
        finalArray.push(wordGroupArray);
    }
    return finalArray;
}


function generateTrayek() {
    trayekTable.innerHTML = "";
    let trayekArray = stringToNestedArray(textArea.value);
    for (let i = 0; i < trayekArray.length; i++) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let dataTrayek = document.createTextNode(trayekArray[i].join(" - "));
        td.appendChild(dataTrayek);
        tr.appendChild(td);
        trayekTable.appendChild(tr);
    }
}