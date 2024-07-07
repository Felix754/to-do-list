// nav
const menuButton = document.getElementById("icon-menu");
const themeButton = document.getElementById("icon-theme");
const projectBox = document.getElementById("project-box");
// to-do-app
const inputBox = document.getElementById("to-do-input-box");
const listContainer = document.getElementById("to-do-list-container");
const submitButton = document.getElementById("to-do-submit-button");
//Project-app
const projectInputBox = document.getElementById('project-input-box');
const projectListContainer = document.getElementById('projects-list-container');
const projectSubmitButton = document.getElementById('project-submit-button');
const projectName = document.getElementById('project-name');
const projectNotSelected = document.getElementById('no-project-selected');

let projects = {};
let selectedProject = null;

// selectedProject check
function selectedProjectExists() {
    if (selectedProject !== null) {
        inputBox.classList.remove('hiddenp');
        listContainer.classList.remove('hiddenp');
        submitButton.classList.remove('hiddenp');
        projectName.classList.remove('hiddenp');
        projectNotSelected.classList.add('hiddenp');
    }
    else {
        inputBox.classList.add('hiddenp');
        listContainer.classList.add('hiddenp');
        submitButton.classList.add('hiddenp');
        projectName.classList.add('hiddenp');
        projectNotSelected.classList.remove('hiddenp');
    }
}

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

// check project inputBox value
projectInputBox.addEventListener('input', function () {
    if (projectInputBox.value.trim() === "") {
        projectSubmitButton.disabled = true;
        projectSubmitButton.classList.add('disabled');
    } else {
        projectSubmitButton.disabled = false;
        projectSubmitButton.classList.remove('disabled');
    }
});


// Adding new project
function addProject() {
    const newProject = projectInputBox.value.trim();
    if (projects[newProject]) {
        alert("Project already exists.");
        return;
    }

    projects[newProject] = [];
    projectListContainer.appendChild(createProjectListItem(newProject));
    projectSubmitButton.disabled = true;
    projectSubmitButton.classList.add('disabled');
    projectInputBox.value = "";
    saveData();
}

// Creating new project
function createProjectListItem(projectName) {
    let li = document.createElement("li");
    li.innerHTML = projectName;
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.innerHTML = "\u00D7";
    li.appendChild(span);
    return li;
}

// Adding new task
function addTask() {
    const task = inputBox.value.trim();
    projects[selectedProject.innerText.trim()].push(task);
    listContainer.appendChild(createListItem(task));
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
    inputBox.value = "";
    saveData();
}

// Creating new task
function createListItem(task) {
    let li = document.createElement("li");
    li.innerHTML = task;
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.innerHTML = "\u00D7";
    li.appendChild(span);
    return li;
}

// delete task and task checked
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        const taskText = e.target.parentElement.innerText.slice(0, -1);
        projects[selectedProject.innerText.trim()] = projects[selectedProject.innerText.trim()].filter(element => element !== taskText);
        saveData();
    }
}, false);

//choose project and remove project
projectListContainer.addEventListener("click", function (e) {
    const prevSelected = document.querySelector('.selected');
    if (e.target.tagName === "LI") {
        if (selectedProject !== null) {
            if (prevSelected) {
                prevSelected.classList.remove("selected");
            }
        }
        selectedProject = e.target.innerText.slice(0, -1);
        projectName.innerText = selectedProject;
        selectedProject = projectName;
        e.target.classList.toggle("selected");
        selectedProjectExists();
        onProjectSelect();
    }
    else if (e.target.tagName === "SPAN") {
        if (prevSelected.innerText.slice(0, -1).trim() === e.target.parentElement.innerText.slice(0, -1).trim()) {
            selectedProject = null;
            projectName.innerText = "";
        }
        e.target.parentElement.remove();
        delete projects[e.target.parentElement.innerText.slice(0, -1).trim()];
        selectedProjectExists();
        saveData();
    }
}, false);

// Changing task for selected project
function onProjectSelect() {

    listContainer.innerHTML = "";
    showTask();
}


//saving data 
function saveData() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

// Loading Project
function showProject() {
    const savedProjects = JSON.parse(localStorage.getItem("projects"));
    if (savedProjects) {
        projects = savedProjects;
        Object.keys(projects).forEach(projectName => {
            projectListContainer.appendChild(createProjectListItem(projectName));
        });
    }
}

// Loading tasks from selected project
function showTask() {
    if (selectedProject.innerText.trim() && projects[selectedProject.innerText.trim()]) {
        projects[selectedProject.innerText.trim()].forEach(task => {
            listContainer.appendChild(createListItem(task));
        });
        console.log("Projects:", projects);
    }
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
showProject();
selectedProjectExists();