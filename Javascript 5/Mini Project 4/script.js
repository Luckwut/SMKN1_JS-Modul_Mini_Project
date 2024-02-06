// simpan list dan unordered list
let list = document.getElementsByTagName("li");
let ul = document.getElementById("unorderedList");

// Simpan input konfigurasi
let isiText = document.getElementById("inputIsiList");
let jumlahList = document.getElementById("inputJumlahList");

// simpan elemen radio untuk text color
let textBiru = document.getElementById("textBiru-Btn");
let textHijau = document.getElementById("textHijau-Btn");
let textKuning = document.getElementById("textKuning-Btn");

// simpan elemen radio untuk hover color
let hoverTeal = document.getElementById("hoverTeal-Btn");
let hoverGold = document.getElementById("hoverGold-Btn");
let hoverLightGreen = document.getElementById("hoverLightGreen-Btn");

// Fungsi Konfigurasi
function generateList() {
    // agar page tidak refresh
    event.preventDefault();
    // clear isi ul untuk membuat list baru
    ul.innerHTML = '';
    // check input jika memiliki value
    if ((isiText && isiText.value) && (jumlahList && jumlahList.value)) {
        // loop untuk membuat element list
        for (let i = 0; i < Number(jumlahList.value); i++) {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(isiText.value + (i + 1)));
            ul.appendChild(li);
        }
    } 
}

// Untuk otomatis mengganti Isi list jika input diganti valuenya
isiText.addEventListener('input', generateList);
jumlahList.addEventListener('input', generateList);


function textColor() {
    for (let i = 0; i < list.length; i++) {
        if (textBiru.checked) {
            list[i].style.color = "blue";
        } else if (textHijau.checked) {
            list[i].style.color = "green";
        } else if (textKuning.checked) {
            list[i].style.color = "yellow";
        } else {
            list[i].style.color = "";
        }
    }
}

function hoverColor() {
    for (let i = 0; i < list.length; i++) {
        list[i].onmouseover = function() {
            if (hoverTeal.checked) {
                list[i].style.color = "teal";
            } else if (hoverGold.checked) {
                list[i].style.color = "gold";
            } else if (hoverLightGreen.checked) {
                list[i].style.color = "lightgreen";
            }
        }
        
        list[i].onmouseout = function() {
            textColor();
        }
    }
}