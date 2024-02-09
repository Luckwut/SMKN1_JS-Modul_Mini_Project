let namaBuahInput = document.getElementById("namaBuah");
let beratBuahInput = document.getElementById("beratBuah");
let gambarBuahInput = document.getElementById("gambarBuah");
let tableBuah = document.getElementById("tableBuah");
let paginationDiv = document.getElementById('pagination-container');

// ------------------------------------------------------------------------- //

let tableDataStore = [
    // Data Here
];

// ------------------------------------------------------------------------- //

let currentPage = 1;
let maxRows = 5;

function renderData(data) {
    tableBuah.innerHTML = "";
    let startIndex = (currentPage - 1) * maxRows;
    let endIndex = startIndex + maxRows;
    let extractedData = data.slice(startIndex, endIndex);
    tableBuah.appendChild(generateTable(extractedData));
}

function renderPagination(data) {
    paginationDiv.innerHTML = "";
    let totalPages = Math.ceil(data.length / maxRows);
    for (let i = 1; i <= totalPages; i++) {
        let pageLink = document.createElement('a');
        pageLink.textContent = i;
        pageLink.setAttribute("onclick", "setPage(this)");
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        paginationDiv.appendChild(pageLink);
    }
}

function setPage(anchorElement) {
    let pageLink = anchorElement;
    currentPage = Number(pageLink.textContent);
    renderAll(tableDataStore);
}

function generateTable(data) {
    let tableRows = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement('tr');

        let tdNomorUrut = document.createElement('td');
        let tdNama = document.createElement('td');
        let tdBerat = document.createElement('td');
        let tdGambar = document.createElement('td');
        let tdAction = document.createElement('td');

        tdNomorUrut.textContent = (currentPage - 1) * maxRows + i + 1;
        tdNama.textContent = data[i].nama;
        tdBerat.textContent = data[i].berat;

        let img = createImg(data[i].gambar);
        tdGambar.appendChild(img);

        let editButton = createButton("Edit", "editData(this)")
        tdAction.appendChild(editButton);
        
        let tdArray = [
            tdNomorUrut,
            tdNama,
            tdBerat, 
            tdGambar,
            tdAction
        ]

        tdArray.forEach(td => tr.appendChild(td));

        tableRows.appendChild(tr);
    }
    return tableRows;
}

function renderAll(data) {
    renderData(data);
    renderPagination(data);
}

renderAll(tableDataStore)

// ------------------------------------------------------------------------- //

function addData() {
    let newData = {
        nama: namaBuahInput.value, 
        berat: Number(beratBuahInput.value), 
        gambar: gambarBuahInput.value
    };
    tableDataStore.push(newData);
    renderAll(tableDataStore);
}

function editData(button) {
    let buttonRow = button.closest('tr');
    let position = Number(buttonRow.children[0].textContent);
    let index = position - 1;

    let nama = tableDataStore[index].nama;
    let berat = tableDataStore[index].berat;
    let gambar = tableDataStore[index].gambar;

    let tdElement = buttonRow.children;
    
    let namaInput = createInput("text", nama);
    let beratInput = createInput("number", berat);
    let gambarInput = createInput("text", gambar);

    let deleteData = createButton("Hapus", "deleteData(this)");
    let saveData = createButton("Save", "saveData(this)");
    let buttonContainer = document.createElement('div');
    buttonContainer.appendChild(deleteData);
    buttonContainer.appendChild(saveData);

    let inputArray = [
        namaInput,
        beratInput,
        gambarInput,
        buttonContainer
    ]

    for (let i = 0; i < inputArray.length; i++) {
        tdElement[i + 1].innerHTML = '';
        tdElement[i + 1].appendChild(inputArray[i]);
    }
}

function deleteData(button) {
    let buttonRow = button.closest('tr');
    let index = Number(buttonRow.children[0].textContent) - 1;
    tableDataStore.splice(index, 1);
    renderAll(tableDataStore);
}

function saveData(button) {
    let buttonRow = button.closest('tr');
    let index = Number(buttonRow.children[0].textContent) - 1;

    let nama = buttonRow.getElementsByTagName('input')[0].value;
    let berat = Number(buttonRow.getElementsByTagName('input')[1].value);
    let gambar = buttonRow.getElementsByTagName('input')[2].value;

    tableDataStore[index].nama = nama;
    tableDataStore[index].berat = berat;
    tableDataStore[index].gambar = gambar;

    renderAll(tableDataStore);
}

// ------------------------------------------------------------------------- //

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
    img.setAttribute("alt", "Gambar");
    img.setAttribute("width", "80px");
    return img;
}