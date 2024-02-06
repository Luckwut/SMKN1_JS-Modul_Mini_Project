// Dapatkan Elemen HTML
const namaBuah = document.getElementById("inputNamaBuah");
const beratBuah = document.getElementById("inputBeratBuah");
const gambarBuah = document.getElementById("inputGambarBuah");
const tableBuah = document.getElementById("isiTableBuah");


// Function untuk menetapkan limit berat
function setWeight() {
    let inputLimit = document.getElementById("setWeight");

    if (inputChecker(inputLimit)) {
        let limitValue = Number(inputLimit.value);
        let tableLength = tableBuah.childElementCount;

        for (let i = 1; i < tableLength; i++) {
            let tableDataBerat = tableBuah.getElementsByTagName("tr")[i].getElementsByTagName("td")[2];

            if (parseFloat(tableDataBerat.textContent) >= limitValue) {
                tableDataBerat.style.backgroundColor = "red";
            } else {
                tableDataBerat.style.backgroundColor = "";
            }
        }
    }
    
}


// Buat Function yang sering digunakan
function createInput(inputType, inputValue) {
    let input = document.createElement("input");
    input.setAttribute("type", inputType);
    if (inputType === "number") {
        input.setAttribute("min", "1");
    }
    input.value = inputValue;
    return input;
}

function createButton(textContent, onclickFunction) {
    let button = document.createElement("button");
    button.textContent = textContent;
    button.setAttribute("onclick", onclickFunction);
    return button;
}

function createImg(src) {
    let img = document.createElement("img");
    img.setAttribute("src", src);
    img.setAttribute("alt", "Gambar Buah");
    img.setAttribute("width", "100vw");
    return img;
}

function inputChecker(inputElement) {
    return inputElement && inputElement.value;
}


// Function Utama
// Function menambahkan data input ke table
function addFruitData() {
    event.preventDefault();
    
    if (inputChecker(namaBuah) && inputChecker(beratBuah) && inputChecker(gambarBuah)) {
        let tr = document.createElement("tr");

        let nomorUrut = document.createTextNode(tableBuah.childElementCount);

        let tableInputNama = createInput("text", namaBuah.value);
        let tableInputBerat = createInput("number", Number(beratBuah.value));
        let tableInputGambar = createInput("text", gambarBuah.value);
        
        let deleteButton = createButton("Hapus", "deleteRow(this)");
        let saveButton = createButton("Save", "saveRow(this)");

        let buttonCell = document.createElement("div");
        buttonCell.appendChild(deleteButton);
        buttonCell.appendChild(saveButton);

        let tableDataArray = [
            nomorUrut,
            tableInputNama,
            tableInputBerat,
            tableInputGambar,
            buttonCell
        ]

        for (let i = 0; i < tableDataArray.length; i++) {
            let td = document.createElement("td");
            td.appendChild(tableDataArray[i]);
            tr.appendChild(td);
            tableBuah.appendChild(tr);  
        }

    } else {
        window.alert("INPUT TIDAK BOLEH KOSONG");
    }
}

// Function menyimpan input table dan menampilkan dalam format biasa
function saveRow(button) {
    let tableButtonRow = button.closest("tr");
    if (tableButtonRow) {
        let namaBuah = tableButtonRow.children[1].getElementsByTagName("input")[0];
        let beratBuah = tableButtonRow.children[2].getElementsByTagName("input")[0];
        let gambarBuah = tableButtonRow.children[3].getElementsByTagName("input")[0];
            
        if (inputChecker(namaBuah) && inputChecker(beratBuah) && inputChecker(gambarBuah)) {
            let namaBuahText = document.createTextNode(namaBuah.value);
            let beratBuahText = document.createTextNode(beratBuah.value + " kg");
            let gambarBuahImg = createImg(gambarBuah.value);

            tableButtonRow.children[1].replaceChild(namaBuahText, namaBuah);
            tableButtonRow.children[2].replaceChild(beratBuahText, beratBuah);
            tableButtonRow.children[3].replaceChild(gambarBuahImg, gambarBuah);

            let buttonBuah = tableButtonRow.children[4].getElementsByTagName("div")[0];
            let deleteButton = buttonBuah.children[0];
            let saveButton = buttonBuah.children[1];

            buttonBuah.removeChild(deleteButton);
            buttonBuah.removeChild(saveButton);

            let editButton = createButton("Edit", "editRow(this)");
            buttonBuah.appendChild(editButton);

        } else {
            window.alert("INPUT TABLE TIDAK BOLEH KOSONG");
        }
    }
    setWeight();
}

// Function menghapus row table
function deleteRow(button) {
    let tableButtonRow = button.closest("tr");
    if (tableButtonRow) {
        tableBuah.removeChild(tableButtonRow);
        updateNomorUrut();
    }
}  

// Function mengupdate nomor urut
function updateNomorUrut() {
    let rows = tableBuah.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        rows[i + 1].children[0].textContent = i + 1;
    }
}

// Function mengedit data
function editRow(button) {
    let tableButtonRow = button.closest("tr");

    if (tableButtonRow) {
        let namaBuahText = tableButtonRow.children[1].textContent;
        let beratBuahText = tableButtonRow.children[2].textContent;
        let gambarBuahImgSrc = tableButtonRow.children[3].getElementsByTagName("img")[0].getAttribute("src");

        let inputNamaBuah = createInput("text", namaBuahText);
        let inputBeratBuah = createInput("number", parseFloat(beratBuahText));
        let inputGambarBuah = createInput("text", gambarBuahImgSrc);

        let inputDataArray = [
            inputNamaBuah,
            inputBeratBuah,
            inputGambarBuah
        ];

        for (let i = 0; i < inputDataArray.length; i++) {
            tableButtonRow.children[i + 1].replaceChild(inputDataArray[i], tableButtonRow.children[i + 1].firstChild);
        }

        let buttonBuah = tableButtonRow.children[4].getElementsByTagName("div")[0];
        let editButton = buttonBuah.getElementsByTagName("button")[0];
        buttonBuah.removeChild(editButton);

        let deleteButton = createButton("Hapus", "deleteRow(this)");
        let saveButton = createButton("Save", "saveRow(this)");
        buttonBuah.appendChild(deleteButton);
        buttonBuah.appendChild(saveButton);
    }
}