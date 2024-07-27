let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime;
let laps = [];

document.getElementById('startStopBtn').addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        this.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        isRunning = true;
        this.textContent = 'Pause';
    }
});

document.getElementById('resetBtn').addEventListener('click', function() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startStopBtn').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
    laps = [];
});

document.getElementById('lapBtn').addEventListener('click', function() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        document.getElementById('laps').appendChild(lapItem);
    }
});

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
