let namaBuahInput = document.getElementById("namaBuah");
let beratBuahInput = document.getElementById("beratBuah");
let gambarBuahInput = document.getElementById("gambarBuah");
let tableBuah = document.getElementById("tableBuah");

let tableDataStore = [
    // Data Table
]

function renderData(data) {
    tableBuah.innerHTML = generateTable(data);
}

function addData() {
    let newData = {nama: namaBuahInput.value, 
        berat: Number(beratBuahInput.value), 
        gambar: gambarBuahInput.value
    };
    tableDataStore.push(newData);
    renderData(tableDataStore);
}

function generateTable(data) {
    let tableRows = "";
    for (let i = 0; i < data.length; i++) {
        let tr = "<tr>";
        tr += `<td>${i + 1}</td>`;
        tr += `<td>${data[i].nama}</td>`;
        tr += `<td>${data[i].berat} Kg</td>`;
        tr += `<td><img src="${data[i].gambar}" width="80px" alt="Gambar"></td>`;
        tr += `<td>
                <div>
                  <button onclick="editData(this)">Edit</button>
                </div>
               </td>`;
        tr += "</tr>";
        tableRows += tr;
    }
    return tableRows;
}

function createInput(inputType, inputValue) {
    let input = "<input "
    input += `type="${inputType}" `;
    if (inputType === "number") {
        input += `min="1" `;
    }
    input += `value="${inputValue}">`;
    return input;
}

function editData(button) {
    let buttonRow = button.closest('tr');
    let position = Number(buttonRow.children[0].textContent);
    let index = position - 1;

    let nama = tableDataStore[index].nama;
    let berat = tableDataStore[index].berat;
    let gambar = tableDataStore[index].gambar;

    buttonRow.innerHTML = `
        <td>${position}</td>
        <td>${createInput("text", nama)}</td>
        <td>${createInput("number", berat)}</td>
        <td>${createInput("text", gambar)}</td>
        <td>
            <div>
                <button onclick="deleteData(this)">Hapus</button>
                <button onclick="saveData(this)">Save</button>
            </div>
        </td>
    `;
}

function deleteData(button) {
    let buttonRow = button.closest('tr');
    let index = Number(buttonRow.children[0].textContent) - 1;
    tableDataStore.splice(index, 1);
    renderData(tableDataStore);
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

    renderData(tableDataStore);
}