
let isRunning = false;
let startTime;
let lapCounter = 1;

function startPause() {
    const startPauseButton = document.getElementById("startPause");
    const lapResetButton = document.getElementById("lapReset");

    if (!isRunning) {
        // Start the stopwatch
        isRunning = true;
        startPauseButton.textContent = "Pause";
        lapResetButton.textContent = "Lap";
        startTime = new Date().getTime();
        updateDisplay();
        updateButtons();
    } else {
        // Pause the stopwatch
        isRunning = false;
        startPauseButton.textContent = "Resume";
        lapResetButton.textContent = "Reset";
        updateButtons();
    }
}

function lapReset() {
    const startPauseButton = document.getElementById("startPause");
    const lapResetButton = document.getElementById("lapReset");
    const display = document.getElementById("display");
    const lapsList = document.getElementById("laps");

    if (!isRunning) {
        // Reset the stopwatch
        isRunning = false;
        startPauseButton.textContent = "Start";
        lapResetButton.textContent = "Lap";
        display.textContent = "00:00:00";
        lapCounter = 1;
        lapsList.innerHTML = "";
        updateButtons();
    } else {
        // Record lap time
        const lapTime = calculateLapTime();
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

function calculateLapTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    startTime = currentTime; // Update start time for the next lap
    return formattedTime;
}

function updateDisplay() {
    const display = document.getElementById("display");
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
    if (isRunning) {
        requestAnimationFrame(updateDisplay);
    }
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return (
        padWithZero(hours) + ":" + padWithZero(minutes) + ":" + padWithZero(seconds)
    );
}

function padWithZero(number) {
    return number < 10 ? "0" + number : number;
}

function updateButtons() {
    const lapResetButton = document.getElementById("lapReset");
    lapResetButton.disabled = !isRunning && lapCounter === 1;
}

