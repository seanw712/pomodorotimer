let timeLeft;
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const breakButton = document.getElementById('break');
const modeText = document.getElementById('mode-text');
const timerDisplay = document.querySelector('.timer');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Get To Work Bitch!' : 'Breaky Bitch';
    timerDisplay.classList.toggle('break-mode', !isWorkTime);
    updateDisplay();
}

function toggleTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                timerDisplay.classList.add('shake');
                setTimeout(() => {
                    timerDisplay.classList.remove('shake');
                }, 500);
                
                clearInterval(timerId);
                timerId = null;
                switchMode();
                toggleTimer();
            }
        }, 1000);
        startButton.textContent = 'Pause';
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Play';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    breakButton.textContent = 'Break Timer';
    startButton.textContent = 'Play';
    timerDisplay.classList.remove('break-mode');
    updateDisplay();
}

function switchToBreak() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Get at it bastard!' : 'Zennn!';
    breakButton.textContent = isWorkTime ? 'Break Timer' : 'Work Timer';
    timerDisplay.classList.toggle('break-mode', !isWorkTime);
    updateDisplay();
}

startButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
breakButton.addEventListener('click', switchToBreak);


// Initialize the display
resetTimer(); 