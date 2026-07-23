const WORK_TIME = 30 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK =  30* 60;

let COUNTER = 0;
let interval = null;
let runing = false;
let time = WORK_TIME;
let isworkTime = true;
let isbreakTime = false;

let timer = document.getElementById("timer");
let btn = document.getElementById("startBtn");
let reset = document.getElementById("reset");
let skip = document.getElementById("skip");


let worktime = () => {
    clearInterval(interval);
    isworkTime = true;
    isbreakTime = false;
    time = WORK_TIME;
    updateTimer();
}
let shortBreak = () => {
    clearInterval(interval);
    isworkTime = false;
    isbreakTime = true;
    time = SHORT_BREAK;
    updateTimer();
};
let longBreak = () => {
    COUNTER = 0;
    isworkTime = false;
    isbreakTime = true;
    time = LONG_BREAK;
    updateTimer();
}
function updateTimer() {
    let minutes = Math.floor(time / 60);
    let second = time % 60;

    minutes = String(minutes).padStart(2, '0'); // this function print the string of 2 lenght 
    second = String(second).padStart(2, '0');
    // console.log(`${minutes}:${second}`);
    timer.innerText = `${minutes}:${second}`;
}
updateTimer();

function switchMode() {
    if (isworkTime) {
        COUNTER++;
        if (COUNTER >= 5) {
            longBreak();
        } else {
            shortBreak();
        }
    }else{
        worktime();
    }
};

function start() {
    runing = true;
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            btn.innerText = "pause";
            updateTimer();
        }
        else {
            clearInterval(interval);
            btn.innerText = "start";
            runing = false;
            switchMode();
        }
    }, 1000)
};

let pause = () => {

    clearInterval(interval);
    btn.innerText = "start";
    runing = false;
};

btn.addEventListener("click", () => {
    if (runing == false) {
        start();

    } else {
        pause();
    }
});

reset.addEventListener("click", () => {
    pause();
    COUNTER = 0;
    runing = false;
    time = WORK_TIME;
    updateTimer();
})

skip.addEventListener("click", () => {
    pause();
    COUNTER++;
    if (isworkTime == true) {
        switchMode();
    }
    else {
        worktime();
    }
    updateTimer();
});

