// Simpan elemen dalam variabel
let tableBuah = document.getElementById("tableBuah");
let namaBuah = document.getElementById("namaBuah");
let beratBuah = document.getElementById("beratBuah");

// Function menyimpan data buah
function saveFruit() {
    // Check jika input memiliki nilai/value
    if ((namaBuah && namaBuah.value) && (beratBuah && beratBuah.value)) {
        event.preventDefault();

        // Buat element tr
        let tr = document.createElement("tr");

        // Buat variable untuk Nomor Urut
        let nomorUrut = document.createTextNode(tableBuah.childElementCount);

        // Buat variable untuk Nama Buah
        let addNamaBuah = document.createTextNode(namaBuah.value);

        // Buat variable untuk Berat Buah
        let addBeratBuah = document.createTextNode(beratBuah.value + " kg");

        // Buat Tombol Reset
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        // tambahkan attribute onclick untuk button dengan function deleteFruit
        // 'this' mengambil elemen (button) bila function dipanggil sebagai parameter
        deleteButton.setAttribute("onclick", "deleteFruit(this)");

        // Buat array agar bisa di iterasi for loops
        let tableDataArray = [
            nomorUrut,
            addNamaBuah,
            addBeratBuah,
            deleteButton
        ];

        // for loops appendChild setiap data di array ke dalam td
        for (let i = 0; i < tableDataArray.length; i++) {
            let td = document.createElement("td");
            td.appendChild(tableDataArray[i]);
            // check jika berat di atas 5, dan apakah index sedang berada di addBeratBuah
            if (Number(beratBuah.value) > 5 && i == tableDataArray.indexOf(addBeratBuah)) {
                td.classList.add("berat");
            }
            tr.appendChild(td);
            tableBuah.appendChild(tr);  
        }
    }
    // Jika tidak ada nilai di input, berikan alert
    else {
        window.alert("Masukan Input")
    }
}

// function untuk menghapus buah
function deleteFruit(button) {
    // mencari elemen 'tr' yang terdekat dari elemen button
    let tableButtonRow = button.closest("tr");
    if (tableButtonRow) { // jika true...
        tableBuah.removeChild(tableButtonRow);
        updateNomorUrut();
    }
}  

// function update Nomor Urut
function updateNomorUrut() {
    let rows = tableBuah.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        // check setiap row (ditambah satu karena index 0 merupakan head)
        // check children pertamanya (column pertama)
        // tambahkan text content dengan index + 1
        rows[i + 1].children[0].textContent = i + 1;
    }
}