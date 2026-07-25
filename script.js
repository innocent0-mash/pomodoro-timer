let WORK_TIME = 30 * 60;
let SHORT_BREAK = 5 * 60;
let LONG_BREAK = 25 * 60;
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
let mode = document.getElementById("sessionLabel");
let study = document.getElementById("study");
let gym = document.getElementById("gym");
let focus = document.getElementById("focus");

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

let stud = () => {
    WORK_TIME = 50 * 60;
    SHORT_BREAK = 10 * 60;
    LONG_BREAK = 25 * 60;
    time = WORK_TIME;
    updateTimer();
}
let gy = () => {
    WORK_TIME = 30 * 60;
    SHORT_BREAK = 5 * 60;
    LONG_BREAK = 20 * 60;
    time = WORK_TIME;

    updateTimer();

}
let fcus = () => {
    WORK_TIME = 60 * 60;
    SHORT_BREAK = 10 * 60;
    LONG_BREAK = 30 * 60;
    time = WORK_TIME;
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
            // mode.innerText = "Relax Time";
        } else {
            shortBreak();
            // mode.innerText = "Break Time";
        }
    } else {
        worktime();
        // mode.innerText = "Foucs Time"
    }
};

function start() {
    runing = true;
    interval = setInterval(() => {
        if (time > 0) {
            time--;
            btn.innerHTML = '<i class="fa-solid fa-stop" style="color: #ffffff;"></i>';
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
    btn.innerHTML = '<i class="fa-solid fa-play" style="color: #ffffff;"></i>';
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

study.addEventListener("click", stud);
gym.addEventListener("click", gy);
focus.addEventListener("click", fcus);