let timer;
let isRunning = false;
let timeLeft = 25 * 60;

const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const eventList = document.getElementById('eventList');
const newEventName = document.getElementById('newEventName');
const addEventBtn = document.getElementById('addEvent');
const toggleDarkModeBtn = document.getElementById('toggleDarkMode');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesSpan.textContent = String(minutes).padStart(2, '0');
    secondsSpan.textContent = String(seconds).padStart(2, '0');
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = "Démarrer";
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
            }
        }, 1000);
        startPauseBtn.textContent = "Pause";
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    updateTimerDisplay();
    isRunning = false;
    startPauseBtn.textContent = "Démarrer";
}

function addEvent() {
    const eventName = newEventName.value.trim();
    if (eventName === '') return;

    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = "text";
    input.value = eventName;
    li.appendChild(input);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
    li.appendChild(deleteBtn);

    eventList.appendChild(li);
    newEventName.value = '';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    toggleDarkModeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Mode clair' : 'Mode sombre';
}

startPauseBtn.addEventListener('click', startPauseTimer);
resetBtn.addEventListener('click', resetTimer);
addEventBtn.addEventListener('click', addEvent);
toggleDarkModeBtn.addEventListener('click', toggleDarkMode);

updateTimerDisplay();

