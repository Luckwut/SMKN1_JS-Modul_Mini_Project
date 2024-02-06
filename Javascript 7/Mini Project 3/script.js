let question = document.getElementById("inputQuestion");
let option = document.getElementById("inputOption");
let timeLimit = document.getElementById("inputTime");
let tableExam = document.getElementById("tableExam");
let optionSelect = document.getElementById("selectCorrectOption");

// ---------------------------------------------------------------------------- //
function stringToArray(inputString) {
    let array = inputString.split(',', 4);
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].trim();
    }
    return array;
}

function addAnswerToSelection() {
    let optionArray = stringToArray(option.value);
    optionSelect.innerHTML = "";
    for (let i = 0; i < optionArray.length; i++) {
        if (optionArray[i]) {
            let optionElement = document.createElement("option");
            optionElement.setAttribute("value", optionArray[i]);
            let optionTextNode = document.createTextNode(optionArray[i]);
            optionElement.appendChild(optionTextNode);
            optionSelect.appendChild(optionElement);   
        }
    }
}

option.addEventListener('input', addAnswerToSelection);

// ---------------------------------------------------------------------------- //
function createButton(textContent, onclickFunction) {
    let button = document.createElement("button");
    button.textContent = textContent;
    button.setAttribute("onclick", onclickFunction);
    return button;
}

function isChecked(input) {
    return input && input.value;
}

// ---------------------------------------------------------------------------- //

function generateQuestion() {
    event.preventDefault();

    if (isChecked(question) && isChecked(option) && isChecked(timeLimit)) {
        let tbody = document.createElement("tbody");
        let trTop = document.createElement("tr");
        let trBottom = document.createElement("tr");
    
        let nomorUrut = document.createTextNode(tableExam.childElementCount);
        let questionText = document.createTextNode(question.value);
        let timeLimitText = document.createTextNode(timeLimit.value);
    
        let deleteButton = createButton("Hapus", "deleteQuestion(this)");
        let answerButton = createButton("Jawab", "submitAnswer(this)");
        let buttonCell = document.createElement("div");
        buttonCell.appendChild(deleteButton);
        buttonCell.appendChild(answerButton);
    
        let tableArrayTop = [
            nomorUrut,
            questionText,
            timeLimitText,
            buttonCell
        ];
    
        for (let i = 0; i < tableArrayTop.length; i++) {
            let td = document.createElement("td");
            td.appendChild(tableArrayTop[i]);
            if (i == 0 || i == 2 || i == 3) {
                td.setAttribute("rowspan", "2");
            }
            if (i == 1) {
                td.setAttribute("colspan", "4");
            }
            trTop.appendChild(td);
        }
        tbody.appendChild(trTop);
    
        let optionArray = stringToArray(option.value);
        let letterLabels = ['A', 'B', 'C', 'D'];
    
        for (let i = 0; i < optionArray.length; i++) {
            let td = document.createElement("td");
            let radio = document.createElement("input");
            radio.setAttribute("type", "radio");
            radio.setAttribute("name", String(tableExam.childElementCount));
            radio.setAttribute("value", optionArray[i]);
    
            let mainContainer = document.createElement("div");
            mainContainer.setAttribute("style", "display: flex;");
    
            let optionText = document.createTextNode(letterLabels[i] + '. ' + optionArray[i]);
    
            mainContainer.append(radio);
            mainContainer.append(optionText);
            td.appendChild(mainContainer);
            trBottom.appendChild(td);
        }
        tbody.appendChild(trBottom);
    
        tableExam.appendChild(tbody);
        
        let timeLimitCell = trTop.children[2];
        let timeLimitMinutes = Number(timeLimit.value);
        tbody.timerInterval = countdownTimer(timeLimitMinutes, timeLimitCell);
               
    } else {
        alert("Form tidak boleh kosong")
    }
}

// ---------------------------------------------------------------------------- //

function countdownTimer(minute, tableCell) {   
    tableCell.textContent = minute + ":00";

    let second = minute * 60;
    let interval = setInterval(function() {
        let remainingMinutes = Math.floor(second / 60);
        let remainingSeconds = second % 60;

        let formattedSecond;
        if (remainingSeconds < 10) {
            formattedSecond = "0" + remainingSeconds;
        } else {
            formattedSecond = remainingSeconds;
        }

        tableCell.textContent = remainingMinutes + ":" + formattedSecond;
        second--;

        if (second < 0) {
            clearInterval(interval);
            tableCell.textContent = "Waktu Habis";
            tableCell.closest("tbody").style.color = "red";
        }
    }, 1000);

    return interval;
}

function submitAnswer(button) {
    let selectedOption = optionSelect.value;

    let tbody = button.closest("tbody");
    let inputs = tbody.getElementsByTagName("input");
    let radioButton = [];
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === "radio") {
            radioButton.push(inputs[i]);
        }
    }

    let answeredQuestion = false;
    for (let i = 0; i < radioButton.length; i++) {
        if (radioButton[i].checked) {
            answeredQuestion = true;
            if (radioButton[i].value === selectedOption) {
                tbody.style.backgroundColor = "lawngreen";
            } else {
                tbody.style.backgroundColor = "lightsalmon";
            }
        }
    }

    if (answeredQuestion) {
        radioButton.forEach(radio => { radio.disabled = true; });
        clearInterval(tbody.timerInterval);
    }
}

function deleteQuestion(button) {
    let tbody = button.closest("tbody");
    if (tbody) {
        tableExam.removeChild(tbody);
        updateNomorUrut();
    }
}

function updateNomorUrut() {
    let tbody = tableExam.getElementsByTagName("tbody");
    for (let i = 0; i < tbody.length; i++) {
        tbody[i + 1].children[0].children[0].textContent = i + 1;
    }
}