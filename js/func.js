const menuButton = document.getElementById("icon-menu");
const themeButton = document.getElementById("icon-theme");
const projectBox = document.getElementById("project-box");


const inputBox = document.getElementById("to-do-input-box");
const listContainer = document.getElementById("to-do-list-container");
const submitButton = document.getElementById("to-do-submit-button");

// show and hide menu
menuButton.addEventListener('click', function () {
    projectBox.classList.toggle('hiden');
});

// change light/dark theme
themeButton.addEventListener('click', function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        themeButton.setAttribute('src', 'images/darkmodOFF.svg');
        menuButton.setAttribute('src', 'images/menu-dark.svg');

    } else {
        setTheme('theme-dark');
        themeButton.setAttribute('src', 'images/darkmodON.svg');
        menuButton.setAttribute('src', 'images/menu.svg');
    }
});


// main func to set theme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}


// adding new task
function AddTask() {
    listContainer.appendChild(createListItem());
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
    inputBox.value = "";
    saveData();
}

// creating new task
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


// remove task and task checked
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// check inputBox value
inputBox.addEventListener('input', function () {
    if (inputBox.value.trim() === "") {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    }
});

//saving data 
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// load data
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

// to set the theme on load
function loadTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        themeButton.setAttribute('src', 'images/darkmodON.svg');
        menuButton.setAttribute('src', 'images/menu.svg');
    } else {
        setTheme('theme-light');
        themeButton.setAttribute('src', 'images/darkmodOFF.svg');
        menuButton.setAttribute('src', 'images/menu-dark.svg');
    }
};

loadTheme();
showTask();