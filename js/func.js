const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const submitButton = document.getElementById("submit-button")


function AddTask() {
    listContainer.appendChild(createListItem());
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
    inputBox.value = "";
    saveData();
}

function createListItem() {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.innerHTML = "\u00D7";
    li.appendChild(span);
    return li;
}


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

inputBox.addEventListener('input', function () {
    if (inputBox.value.trim() === "") {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    }
});


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();