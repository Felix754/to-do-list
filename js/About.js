// nav
const themeButton = document.getElementById("icon-theme");


// change light/dark theme
themeButton.addEventListener('click', function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
        themeButton.setAttribute('src', '../images/darkmodOFF.svg');

    } else {
        setTheme('theme-dark');
        themeButton.setAttribute('src', '../images/darkmodON.svg');
    }
});

// main func to set theme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}



// to set the theme on load
function loadTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        themeButton.setAttribute('src', '../images/darkmodON.svg');
    } else {
        setTheme('theme-light');
        themeButton.setAttribute('src', '../images/darkmodOFF.svg');
    }
};

loadTheme();