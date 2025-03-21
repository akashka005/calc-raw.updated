const display = document.getElementById("display");
const themes = ["dark", "neon", "retro", "minimal"];
let currentThemeIndex = 0;

function appendCharacter(char) {
    const lastChar = display.value.slice(-1);
    
    if (["+", "-", "*", "/", "."].includes(lastChar) && ["+", "-", "*", "/", "."].includes(char)) {
        return;
    }
    if (char.includes("Math.")) {
        display.value += char + ")";
    } else {
        display.value += char;
    }
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        display.value = new Function("return " + display.value)();
    } catch {
        display.value = "Error";
    }
}

function switchTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    document.body.className = themes[currentThemeIndex];
}

function changeTheme() {
    let theme = document.getElementById("themeSelect").value;
    document.body.className = theme;
}

document.addEventListener("keydown", function (event) {
    if (/[0-9+\-*/().]/.test(event.key)) {
        appendCharacter(event.key);
    } else if (event.key === "Enter") {
        calculateResult();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
